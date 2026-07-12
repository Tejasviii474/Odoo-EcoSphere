from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List

from ..db.session import get_db, SessionLocal
from ..db import models
from ..schemas import schemas
from ..services.ai_service import AIService

# Assume authentication dependency is provided by the Team Leader in core.security
from ..core.security import get_current_user

router = APIRouter(
    prefix="/social",
    tags=["Social & CSR"]
)

def process_ai_verification(participation_id: int, activity_title: str, image_url: str):
    """
    Background task to run Gemini AI verification without blocking the user response.
    Requires its own database session since the request session might be closed.
    """
    db = SessionLocal()
    try:
        ai_result = AIService.verify_csr_proof(
            activity_title=activity_title,
            image_url=image_url
        )
        
        if ai_result.verified and ai_result.confidence > 75.0:
            participation = db.query(models.EmployeeParticipation).filter(
                models.EmployeeParticipation.id == participation_id
            ).first()
            
            if participation:
                participation.approval_status = models.ParticipationStatus.APPROVED
                points_to_award = 50
                participation.points_earned = points_to_award
                
                # Auto-increment the employee's total XP
                user = db.query(models.User).filter(models.User.id == participation.employee_id).first()
                if user:
                    user.total_xp += points_to_award
                
                db.commit()
    finally:
        db.close()

@router.get("/activities", response_model=List[schemas.CSRActivity])
def get_csr_activities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all available CSR Activities.
    """
    activities = db.query(models.CSRActivity).offset(skip).limit(limit).all()
    return activities

@router.post("/activities", response_model=schemas.CSRActivity)
def create_csr_activity(
    activity: schemas.CSRActivityCreate, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Create a new CSR Activity.
    """
    db_activity = models.CSRActivity(**activity.model_dump())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@router.post("/participate", response_model=schemas.EmployeeParticipation)
def participate_in_csr(
    participation: schemas.EmployeeParticipationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Submit proof of participation in a CSR activity.
    Integrates with the AI Service via a background task to auto-verify image proof!
    """
    # Fetch the activity to get its title for AI context
    activity = db.query(models.CSRActivity).filter(models.CSRActivity.id == participation.activity_id).first()
    if not activity:
        raise HTTPException(status_code=404, detail="CSR Activity not found")
        
    db_participation = models.EmployeeParticipation(
        employee_id=participation.employee_id,
        activity_id=participation.activity_id,
        proof_url=participation.proof_url,
        approval_status=models.ParticipationStatus.PENDING
    )
    
    db.add(db_participation)
    db.commit()
    db.refresh(db_participation)

    # Magic Hackathon Moment: Auto-verify using Gemini AI in the BACKGROUND!
    if participation.proof_url:
        background_tasks.add_task(
            process_ai_verification,
            participation_id=db_participation.id,
            activity_title=activity.title,
            image_url=participation.proof_url
        )

    return db_participation

@router.get("/participations", response_model=List[schemas.EmployeeParticipation])
def list_participations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    List all CSR participations for review.
    """
    return db.query(models.EmployeeParticipation).offset(skip).limit(limit).all()
