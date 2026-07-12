from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from ..db.session import get_db
from ..db import models
from ..schemas import schemas
from ..core.security import get_current_user

router = APIRouter(
    prefix="/reporting",
    tags=["Reporting & Dashboards"]
)

@router.get("/department-scores", response_model=List[schemas.DepartmentScore])
def get_department_scores(db: Session = Depends(get_db)):
    """
    Retrieve the aggregated ESG performance per department.
    This feeds directly into the Executive Dashboard visualizations.
    """
    # The Team Leader's score_service.py handles the actual calculation.
    # Here we simply serve the calculated results to the frontend.
    return db.query(models.DepartmentScore).all()

@router.get("/summary")
def get_esg_summary_report(db: Session = Depends(get_db)):
    """
    Generates a high-level ESG Summary Report for the organization.
    Aggregates the weighted averages of all department scores based on the
    default configuration (Env 40%, Soc 30%, Gov 30%).
    """
    avg_scores = db.query(
        func.avg(models.DepartmentScore.environmental_score).label("avg_env"),
        func.avg(models.DepartmentScore.social_score).label("avg_soc"),
        func.avg(models.DepartmentScore.governance_score).label("avg_gov"),
        func.avg(models.DepartmentScore.total_score).label("avg_total")
    ).first()

    return {
        "report_type": "ESG Summary",
        "overall_esg_score": round(avg_scores.avg_total or 0, 2),
        "breakdown": {
            "environmental_score": round(avg_scores.avg_env or 0, 2),
            "social_score": round(avg_scores.avg_soc or 0, 2),
            "governance_score": round(avg_scores.avg_gov or 0, 2)
        },
        "health_status": "Excellent" if (avg_scores.avg_total or 0) >= 80 else "Needs Improvement"
    }

@router.get("/custom")
def get_custom_report(
    department_id: int = None,
    module: str = None,
    db: Session = Depends(get_db)
):
    """
    Basic Custom Report Builder backend.
    Allows filtering the reports by Department or Module.
    """
    query = db.query(models.DepartmentScore)
    
    if department_id:
        query = query.filter(models.DepartmentScore.department_id == department_id)
        
    results = query.all()
    
    # In a real app, this would dynamically compile PDFs/Excel.
    # For the hackathon MVP, we return filtered JSON data.
    return {"filtered_results": results, "applied_filters": {"department_id": department_id, "module": module}}
