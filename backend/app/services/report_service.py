from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session

# We assume Member 3 has defined these models matching our blueprint schema
from app.models.database_models import CarbonTransaction, CsrActivity, ComplianceIssue

def generate_custom_report(
    db: Session,
    department_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    module: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Generates a consolidated custom ESG report based on dynamic filters.
    
    This service queries data across Environmental (Carbon), Social (CSR), 
    and Governance (Compliance) modules to construct a unified report dataset.
    """
    results = []
    
    # Note: In a production scenario, date strings should be explicitly converted 
    # to datetime objects. SQLAlchemy can usually handle ISO format string comparisons.
    
    # --- 1. Environmental Data Collection ---
    if module in [None, "env", "all"]:
        query = db.query(CarbonTransaction)
        if department_id:
            query = query.filter(CarbonTransaction.department_id == department_id)
        if start_date:
            query = query.filter(CarbonTransaction.transaction_date >= start_date)
        if end_date:
            query = query.filter(CarbonTransaction.transaction_date <= end_date)
            
        for tx in query.all():
            results.append({
                "module": "environmental",
                "department_id": str(tx.department_id),
                "metric": tx.source_type,
                "value": float(tx.calculated_emissions),
                "date": tx.transaction_date.isoformat() if tx.transaction_date else None,
                "description": f"Carbon emission from {tx.source_type} ({tx.source_id})"
            })
            
    # --- 2. Social Data Collection ---
    if module in [None, "social", "all"]:
        query = db.query(CsrActivity)
        if start_date:
            query = query.filter(CsrActivity.start_date >= start_date)
        if end_date:
            query = query.filter(CsrActivity.end_date <= end_date)
            
        for act in query.all():
            results.append({
                "module": "social",
                "department_id": "Global",  # CSR activities are often company-wide
                "metric": "points_reward",
                "value": act.points_reward,
                "date": act.start_date.isoformat() if act.start_date else None,
                "description": act.title
            })
            
    # --- 3. Governance Data Collection ---
    if module in [None, "gov", "all"]:
        query = db.query(ComplianceIssue)
        if start_date:
            query = query.filter(ComplianceIssue.due_date >= start_date)
        if end_date:
            query = query.filter(ComplianceIssue.due_date <= end_date)
            
        for issue in query.all():
            results.append({
                "module": "governance",
                "department_id": str(issue.owner_id) if issue.owner_id else "Unassigned",
                "metric": "severity",
                "value": issue.severity,
                "date": issue.due_date.isoformat() if issue.due_date else None,
                "description": issue.description
            })
            
    return results
