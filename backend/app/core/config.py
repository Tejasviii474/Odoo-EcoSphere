from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Application configuration settings using Pydantic.
    Reads from environment variables or a .env file.
    """
    PROJECT_NAME: str = "EcoSphere API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]  # Allow all for hackathon dev. Restrict in production.
    
    # JWT Authentication
    SECRET_KEY: str = "supersecretkey_change_in_production_for_hackathon"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days for easy hackathon testing
    
    # Database URL (Defaulting to a local postgres instance)
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/ecosphere"
    
    # Gemini AI integration
    GEMINI_API_KEY: str = ""

    # Load variables from a .env file if it exists
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8", 
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
