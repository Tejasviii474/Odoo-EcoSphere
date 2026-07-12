from pydantic import BaseModel, ConfigDict
from typing import Optional, List, TypeVar, Generic
from datetime import datetime
from ..db.models import ChallengeStatus, ParticipationStatus, ComplianceStatus, CategoryType

T = TypeVar('T')

class PaginatedResponse(BaseModel, Generic[T]):
    """Generic schema for paginated API responses. Enables seamless data tables on the frontend."""
    data: List[T]
    total: int
    skip: int
    limit: int

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: str
    department_id: Optional[int] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    total_xp: int

    model_config = ConfigDict(from_attributes=True)

# --- Category Schemas ---
class CategoryBase(BaseModel):
    name: str
    type: CategoryType
    status: bool = True

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# --- CSR Activity Schemas ---
class CSRActivityBase(BaseModel):
    title: str
    category_id: int
    description: str
    date: datetime

class CSRActivityCreate(CSRActivityBase):
    pass

class CSRActivity(CSRActivityBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# --- Challenge Schemas ---
class ChallengeBase(BaseModel):
    title: str
    category_id: int
    description: str
    xp: int
    difficulty: str
    evidence_required: bool = False
    deadline: datetime
    status: ChallengeStatus = ChallengeStatus.DRAFT

class ChallengeCreate(ChallengeBase):
    pass

class Challenge(ChallengeBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# --- Employee Participation (CSR) Schemas ---
class EmployeeParticipationBase(BaseModel):
    employee_id: int
    activity_id: int
    proof_url: Optional[str] = None

class EmployeeParticipationCreate(EmployeeParticipationBase):
    pass

class EmployeeParticipation(EmployeeParticipationBase):
    id: int
    approval_status: ParticipationStatus
    points_earned: int
    completion_date: datetime

    model_config = ConfigDict(from_attributes=True)

# --- Challenge Participation Schemas ---
class ChallengeParticipationBase(BaseModel):
    challenge_id: int
    employee_id: int
    progress: str
    proof_url: Optional[str] = None

class ChallengeParticipationCreate(ChallengeParticipationBase):
    pass

class ChallengeParticipation(ChallengeParticipationBase):
    id: int
    approval_status: ParticipationStatus
    xp_awarded: int

    model_config = ConfigDict(from_attributes=True)

# --- Compliance Issue Schemas ---
class ComplianceIssueBase(BaseModel):
    audit_id: Optional[int] = None
    severity: str
    description: str
    owner_id: int
    due_date: datetime

class ComplianceIssueCreate(ComplianceIssueBase):
    pass

class ComplianceIssue(ComplianceIssueBase):
    id: int
    status: ComplianceStatus

    model_config = ConfigDict(from_attributes=True)

# --- Carbon Transaction Schemas ---
class CarbonTransactionBase(BaseModel):
    source_operation: str
    emission_factor_id: int
    calculated_emission: float
    transaction_date: datetime

class CarbonTransactionCreate(CarbonTransactionBase):
    pass

class CarbonTransaction(CarbonTransactionBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# --- Department Score Schemas ---
class DepartmentScoreBase(BaseModel):
    department_id: int
    environmental_score: float
    social_score: float
    governance_score: float
    total_score: float
    calculation_date: datetime

class DepartmentScoreCreate(DepartmentScoreBase):
    pass

class DepartmentScore(DepartmentScoreBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# --- AI Verification Response Schema ---
class AIVerificationResponse(BaseModel):
    verified: bool
    confidence: float
    reason: str
