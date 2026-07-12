from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """
    Core application settings and environment variables configuration.
    Uses Pydantic's BaseSettings to automatically read from environment variables or a .env file.
    """
    PROJECT_NAME: str = "EcoSphere ESG Platform"
    API_V1_STR: str = "/api"
    
    # Database Configuration
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/ecosphere"
    
    # Security / JWT Configuration
    # IMPORTANT: Override SECRET_KEY in production via environment variables
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_FOR_HACKATHON_DEV" 
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days expiration for hackathon convenience

    # External APIs (AI Integration)
    GEMINI_API_KEY: Optional[str] = None

    # model_config tells Pydantic to look for a .env file
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True, extra="ignore")

# Instantiate the settings object to be imported across the application
settings = Settings()
