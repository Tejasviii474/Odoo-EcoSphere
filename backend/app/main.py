from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

def get_application() -> FastAPI:
    """
    Initialize and configure the FastAPI application.
    """
    application = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        description="Core API for the EcoSphere ESG Management Platform.",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # Configure CORS Middleware
    # WARNING: allow_origins=["*"] is used for hackathon development speed. 
    # For production, this should be restricted to the specific frontend domains.
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application

app = get_application()

@app.get("/", tags=["Health Check"])
def health_check():
    """
    Root endpoint to verify the API is running.
    """
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "message": "EcoSphere API is up and running!"
    }

# ==========================================
# ROUTER INCLUSIONS
# ==========================================
# As we build the individual modules (auth, environmental, social, etc.), 
# we will import their routers and include them here.
# Example:
# from app.api.auth import router as auth_router
# app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])
