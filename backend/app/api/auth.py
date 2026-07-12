from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
# We assume Member 3 provides the User model and these Pydantic schemas 
# based on our finalized Execution Blueprint.
from app.models.database_models import User
from app.schemas.pydantic_schemas import UserCreate, UserLogin, TokenResponse

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user account.
    """
    # 1. Check if the email is already in use
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )
    
    # 2. Securely hash the plain password
    hashed_password = get_password_hash(user_in.password)
    
    # 3. Construct the database user record
    new_user = User(
        email=user_in.email,
        hashed_password=hashed_password,
        full_name=user_in.full_name,
        role=user_in.role,
        department_id=user_in.department_id,
        status="active"
    )
    
    # 4. Save to database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"status": "success", "message": "User registered successfully."}


@router.post("/login", response_model=TokenResponse)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    """
    Login endpoint expecting a JSON body with email and password.
    Returns a JWT Bearer token and user details on success.
    """
    # 1. Look up the user by email
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 2. Verify the hashed password
    if not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 3. Check for active account status
    if user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user account."
        )
    
    # 4. Create the JWT Access Token (encoding the user ID)
    access_token = create_access_token(subject=str(user.id))
    
    # 5. Return the payload conforming to the TokenResponse schema
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "role": user.role,
            "full_name": user.full_name
        }
    }
