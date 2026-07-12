from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

from ..services.ai_service import AIService
from ..schemas.schemas import AIVerificationResponse

router = APIRouter(
    prefix="/ai",
    tags=["AI Features"]
)

class VerifyCSRRequest(BaseModel):
    activity_title: str
    image_url: str

class SuggestEmissionRequest(BaseModel):
    description: str

@router.post("/verify-csr", response_model=AIVerificationResponse)
def verify_csr_proof(request: VerifyCSRRequest):
    """
    Verify if the provided image URL matches the CSR activity using Gemini Vision AI.
    """
    try:
        result = AIService.verify_csr_proof(
            activity_title=request.activity_title, 
            image_url=request.image_url
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/suggest-emission-factor")
def suggest_emission_factor(request: SuggestEmissionRequest) -> Dict[str, Any]:
    """
    Suggest an emission factor category based on a raw transaction description.
    """
    try:
        result = AIService.suggest_emission_factor(request.description)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
