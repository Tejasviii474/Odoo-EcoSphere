from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..db.session import get_db
from ..db import models
from ..schemas import schemas
from ..core.security import get_current_user

router = APIRouter(
    prefix="/governance",
    tags=["Governance & Compliance"]
)

@router.get("/compliance-issues", response_model=List[schemas.ComplianceIssue])
def get_compliance_issues(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all compliance issues.
    """
    return db.query(models.ComplianceIssue).offset(skip).limit(limit).all()

@router.post("/compliance-issues", response_model=schemas.ComplianceIssue)
def log_compliance_issue(
    issue: schemas.ComplianceIssueCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Log a new governance compliance issue.
    Enforces business rule: Must have an owner and a due date.
    """
    if not issue.owner_id or not issue.due_date:
        raise HTTPException(
            status_code=400, 
            detail="Business Rule Violation: Compliance Issues must have an assigned Owner and a Due Date."
        )

    db_issue = models.ComplianceIssue(**issue.model_dump())
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    
    # NOTE: Trigger the Notification System here to email the owner
    
    return db_issue

@router.patch("/compliance-issues/{issue_id}", response_model=schemas.ComplianceIssue)
def update_issue_status(
    issue_id: int, 
    status: models.ComplianceStatus, 
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Update the status of an existing compliance issue (e.g., mark as Closed).
    """
    db_issue = db.query(models.ComplianceIssue).filter(models.ComplianceIssue.id == issue_id).first()
    if not db_issue:
        raise HTTPException(status_code=404, detail="Compliance Issue not found")
        
    db_issue.status = status
    db.commit()
    db.refresh(db_issue)
    return db_issue

@router.get("/compliance-issues/flagged", response_model=List[schemas.ComplianceIssue])
def get_flagged_issues(db: Session = Depends(get_db)):
    """
    Business Rule Enforcement: Return all OPEN issues that have passed their Due Date.
    These can be polled by the Notification System.
    """
    now = datetime.utcnow()
    flagged = db.query(models.ComplianceIssue).filter(
        models.ComplianceIssue.status == models.ComplianceStatus.OPEN,
        models.ComplianceIssue.due_date < now
    ).all()
    
    return flagged
