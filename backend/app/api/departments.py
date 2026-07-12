from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.db.models import User, Department, DepartmentScore
from app.schemas.schemas import DepartmentResponse, DepartmentScoreResponse

router = APIRouter()

@router.get("", response_model=List[DepartmentResponse])
def get_departments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve all active departments. 
    Requires a valid JWT Bearer token.
    """
    departments = db.query(Department).filter(Department.status == True).all()
    # Map to schema response
    return [
        {
            "id": str(dept.id),
            "name": dept.name,
            "code": dept.code,
            "employee_count": dept.employee_count,
            "status": dept.status
        }
        for dept in departments
    ]

@router.get("/scores", response_model=List[DepartmentScoreResponse])
def get_department_scores(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve aggregated ESG scores for all departments.
    Requires a valid JWT Bearer token.
    
    Returns the department name alongside the E, S, G, and Total scores 
    as defined in the API contract.
    """
    # Perform a join to fetch the department name alongside its score record
    results = db.query(DepartmentScore, Department.name).join(
        Department, DepartmentScore.department_id == Department.id
    ).all()
    
    # Map the SQLAlchemy Row tuples into dicts matching the Pydantic schema
    response_data = []
    for score_obj, dept_name in results:
        response_data.append({
            "department_id": str(score_obj.department_id),
            "name": dept_name,
            "environmental_score": float(score_obj.environmental_score),
            "social_score": float(score_obj.social_score),
            "governance_score": float(score_obj.governance_score),
            "total_score": float(score_obj.total_score)
        })
        
    return response_data
