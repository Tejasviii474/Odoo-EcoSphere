from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .session import Base

# --- Enums ---
class ChallengeStatus(str, enum.Enum):
    DRAFT = "Draft"
    ACTIVE = "Active"
    UNDER_REVIEW = "Under Review"
    COMPLETED = "Completed"
    ARCHIVED = "Archived"

class ParticipationStatus(str, enum.Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"

class ComplianceStatus(str, enum.Enum):
    OPEN = "Open"
    CLOSED = "Closed"

class CategoryType(str, enum.Enum):
    CSR_ACTIVITY = "CSR Activity"
    CHALLENGE = "Challenge"
    ESG_CATEGORY = "ESG Category"

# --- Master Data ---

class User(Base):
    """Implied user/employee model for references."""
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="employee")
    status = Column(String, default="active")
    department_id = Column(Integer, ForeignKey("departments.id"))
    total_xp = Column(Integer, default=0)
    
    department = relationship("Department", back_populates="employees")
    participations = relationship("EmployeeParticipation", back_populates="employee")
    challenge_participations = relationship("ChallengeParticipation", back_populates="employee")
    compliance_issues = relationship("ComplianceIssue", back_populates="owner")
    policy_acknowledgements = relationship("PolicyAcknowledgement", back_populates="employee")

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    code = Column(String, unique=True, index=True)
    head_id = Column(Integer, ForeignKey("users.id", use_alter=True, name="fk_dept_head"), nullable=True)
    parent_department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    employee_count = Column(Integer, default=0)
    status = Column(Boolean, default=True)

    employees = relationship("User", back_populates="department", foreign_keys=[User.department_id])
    scores = relationship("DepartmentScore", back_populates="department")

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(Enum(CategoryType))
    status = Column(Boolean, default=True)

class EmissionFactor(Base):
    __tablename__ = "emission_factors"
    id = Column(Integer, primary_key=True, index=True)
    activity_name = Column(String, index=True)
    factor_value = Column(Float)
    unit = Column(String)

class ProductESGProfile(Base):
    __tablename__ = "product_esg_profiles"
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String)
    esg_info = Column(String)

class EnvironmentalGoal(Base):
    __tablename__ = "environmental_goals"
    id = Column(Integer, primary_key=True, index=True)
    target_metric = Column(String)
    target_value = Column(Float)
    deadline = Column(DateTime)

class ESGPolicy(Base):
    __tablename__ = "esg_policies"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    version = Column(String)

class Badge(Base):
    __tablename__ = "badges"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    unlock_rule = Column(String)
    icon = Column(String)

class Reward(Base):
    __tablename__ = "rewards"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    points_required = Column(Integer)
    stock = Column(Integer)
    status = Column(Boolean, default=True)

# --- Transactional Data ---

class CarbonTransaction(Base):
    __tablename__ = "carbon_transactions"
    id = Column(Integer, primary_key=True, index=True)
    source_operation = Column(String) # Purchase, Manufacturing, Expense, Fleet
    emission_factor_id = Column(Integer, ForeignKey("emission_factors.id"))
    calculated_emission = Column(Float)
    transaction_date = Column(DateTime, default=datetime.utcnow)

    emission_factor = relationship("EmissionFactor")

class CSRActivity(Base):
    __tablename__ = "csr_activities"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    description = Column(String)
    date = Column(DateTime)

    category = relationship("Category")

class EmployeeParticipation(Base):
    __tablename__ = "employee_participations"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id"))
    activity_id = Column(Integer, ForeignKey("csr_activities.id"))
    proof_url = Column(String, nullable=True)
    approval_status = Column(Enum(ParticipationStatus), default=ParticipationStatus.PENDING)
    points_earned = Column(Integer, default=0)
    completion_date = Column(DateTime, default=datetime.utcnow)

    employee = relationship("User", back_populates="participations")
    activity = relationship("CSRActivity")

class Challenge(Base):
    __tablename__ = "challenges"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    category_id = Column(Integer, ForeignKey("categories.id"))
    description = Column(String)
    xp = Column(Integer)
    difficulty = Column(String)
    evidence_required = Column(Boolean, default=False)
    deadline = Column(DateTime)
    status = Column(Enum(ChallengeStatus), default=ChallengeStatus.DRAFT)

    category = relationship("Category")

class ChallengeParticipation(Base):
    __tablename__ = "challenge_participations"
    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    employee_id = Column(Integer, ForeignKey("users.id"))
    progress = Column(String)
    proof_url = Column(String, nullable=True)
    approval_status = Column(Enum(ParticipationStatus), default=ParticipationStatus.PENDING)
    xp_awarded = Column(Integer, default=0)
    
    challenge = relationship("Challenge")
    employee = relationship("User", back_populates="challenge_participations")

class PolicyAcknowledgement(Base):
    __tablename__ = "policy_acknowledgements"
    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("esg_policies.id"))
    employee_id = Column(Integer, ForeignKey("users.id"))
    acknowledged_date = Column(DateTime, default=datetime.utcnow)

    policy = relationship("ESGPolicy")
    employee = relationship("User", back_populates="policy_acknowledgements")

class Audit(Base):
    __tablename__ = "audits"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    audit_date = Column(DateTime, default=datetime.utcnow)
    details = Column(String)

class ComplianceIssue(Base):
    __tablename__ = "compliance_issues"
    id = Column(Integer, primary_key=True, index=True)
    audit_id = Column(Integer, ForeignKey("audits.id"), nullable=True)
    severity = Column(String)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    due_date = Column(DateTime)
    status = Column(Enum(ComplianceStatus), default=ComplianceStatus.OPEN)

    audit = relationship("Audit")
    owner = relationship("User", back_populates="compliance_issues")

class DepartmentScore(Base):
    __tablename__ = "department_scores"
    id = Column(Integer, primary_key=True, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"))
    environmental_score = Column(Float, default=0.0)
    social_score = Column(Float, default=0.0)
    governance_score = Column(Float, default=0.0)
    total_score = Column(Float, default=0.0)
    calculation_date = Column(DateTime, default=datetime.utcnow)

    department = relationship("Department", back_populates="scores")
