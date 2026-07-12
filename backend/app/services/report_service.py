from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session

# We assume Member 3 has defined these models matching our blueprint schema
from app.db.models import CarbonTransaction, CSRActivity, ComplianceIssue

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
    
    # --- 1. Environmental Data Collection ---
    if module in [None, "env", "all"]:
        query = db.query(CarbonTransaction)
        if start_date:
            query = query.filter(CarbonTransaction.transaction_date >= start_date)
        if end_date:
            query = query.filter(CarbonTransaction.transaction_date <= end_date)
            
        for tx in query.all():
            results.append({
                "module": "environmental",
                "department_id": "Global",
                "metric": tx.source_operation or "Unknown",
                "value": float(tx.calculated_emission or 0),
                "date": tx.transaction_date.isoformat() if tx.transaction_date else None,
                "description": f"Carbon emission from {tx.source_operation}"
            })
            
    # --- 2. Social Data Collection ---
    if module in [None, "social", "all"]:
        query = db.query(CSRActivity)
        if start_date:
            query = query.filter(CSRActivity.date >= start_date)
        if end_date:
            query = query.filter(CSRActivity.date <= end_date)
            
        for act in query.all():
            results.append({
                "module": "social",
                "department_id": "Global",  # CSR activities are often company-wide
                "metric": "activity",
                "value": 1.0,
                "date": act.date.isoformat() if act.date else None,
                "description": act.title
            })
            
    # --- 3. Governance Data Collection ---
    if module in [None, "gov", "all"]:
        query = db.query(ComplianceIssue)
        if department_id:
            query = query.filter(ComplianceIssue.owner_id == department_id)
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
