from typing import Optional, List
from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.models.database_models import User
# The Leader also owns the report_service where the heavy query logic lives
from app.services.report_service import generate_custom_report
# Assuming Member 3 provides a unified response schema for the report rows
from app.schemas.pydantic_schemas import CustomReportResponse

router = APIRouter()

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
