from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from ..db.session import get_db
from ..db import models
from ..schemas import schemas
from ..core.dependencies import get_current_user

router = APIRouter(
    prefix="/gamification",
    tags=["Gamification"]
)

@router.get("/leaderboard", response_model=schemas.PaginatedResponse[schemas.User])
def get_leaderboard(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Get the top employees ordered by Total XP with pagination metadata.
    """
    total = db.query(models.User).count()
    data = db.query(models.User).order_by(desc(models.User.total_xp)).offset(skip).limit(limit).all()
    
    return {
        "data": data,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.get("/challenges", response_model=schemas.PaginatedResponse[schemas.Challenge])
def get_challenges(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all sustainability challenges with pagination metadata.
    """
    total = db.query(models.Challenge).count()
    data = db.query(models.Challenge).offset(skip).limit(limit).all()
    
    return {
        "data": data,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.post("/challenges/participate", response_model=schemas.ChallengeParticipation)
def participate_in_challenge(
    participation: schemas.ChallengeParticipationCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Submit progress or proof for a sustainability challenge.
    """
    challenge = db.query(models.Challenge).filter(models.Challenge.id == participation.challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
        
    db_participation = models.ChallengeParticipation(
        challenge_id=participation.challenge_id,
        employee_id=participation.employee_id,
        progress=participation.progress,
        proof_url=participation.proof_url,
        approval_status=models.ParticipationStatus.PENDING
    )
    
    db.add(db_participation)
    db.commit()
    db.refresh(db_participation)
    return db_participation

@router.post("/rewards/{reward_id}/redeem")
def redeem_reward(
    reward_id: int, 
    employee_id: int, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Business Rule Enforcement: Reward Redemption.
    Employees can redeem earned Points/XP for a Reward from the catalog, 
    subject to stock availability. Redeeming a Reward deducts the 
    corresponding Points from the employee's balance.
    """
    reward = db.query(models.Reward).filter(models.Reward.id == reward_id).first()
    if not reward:
        raise HTTPException(status_code=404, detail="Reward not found")
        
    if reward.stock <= 0:
        raise HTTPException(status_code=400, detail="Reward is out of stock")
        
    user = db.query(models.User).filter(models.User.id == employee_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if user.total_xp < reward.points_required:
        raise HTTPException(
            status_code=400, 
            detail=f"Not enough XP to redeem. Required: {reward.points_required}, Available: {user.total_xp}"
        )
        
    # Process the redemption securely
    user.total_xp -= reward.points_required
    reward.stock -= 1
    
    db.commit()
    
    return {
        "status": "success",
        "message": f"Successfully redeemed {reward.name}!", 
        "remaining_xp": user.total_xp
    }
