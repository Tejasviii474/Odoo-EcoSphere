from typing import Optional, List
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.dependencies import get_db, get_current_user
from app.db.models import User, DepartmentScore
from app.schemas.schemas import CustomReportResponse, DepartmentScore as DepartmentScoreSchema
from app.services.report_service import generate_custom_report

router = APIRouter()

@router.get("/department-scores", response_model=List[DepartmentScoreSchema])
def get_department_scores(db: Session = Depends(get_db)):
    """
    Retrieve the aggregated ESG performance per department.
    This feeds directly into the Executive Dashboard visualizations.
    """
    return db.query(DepartmentScore).all()

@router.get("/summary")
def get_esg_summary_report(db: Session = Depends(get_db)):
    """
    Generates a high-level ESG Summary Report for the organization.
    Aggregates the weighted averages of all department scores based on the
    default configuration (Env 40%, Soc 30%, Gov 30%).
    """
    avg_scores = db.query(
        func.avg(DepartmentScore.environmental_score).label("avg_env"),
        func.avg(DepartmentScore.social_score).label("avg_soc"),
        func.avg(DepartmentScore.governance_score).label("avg_gov"),
        func.avg(DepartmentScore.total_score).label("avg_total")
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

@router.get("/custom", response_model=List[CustomReportResponse])
def get_custom_report(
    department_id: Optional[str] = Query(None, description="Filter by Department UUID"),
    start_date: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    end_date: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    module: Optional[str] = Query(None, description="Filter by module: env, social, gov, or all"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Compile Custom ESG reports based on multi-dimensional filters.
    Requires an authenticated user with Manager or Admin privileges.
    """
    # 1. Enforce Role-Based Access Control (RBAC)
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Managers and Admins can generate custom reports."
        )
    
    # 2. Delegate query construction and data compilation to the Report Service
    report_data = generate_custom_report(
        db=db,
        department_id=department_id,
        start_date=start_date,
        end_date=end_date,
        module=module
    )
    
    return report_data
