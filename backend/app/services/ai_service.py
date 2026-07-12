import os
import json
from google import genai
from ..schemas.schemas import AIVerificationResponse

# The Team Leader should set this in the environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_gemini_client():
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY environment variable is not set")
    return genai.Client(api_key=GEMINI_API_KEY)

class AIService:
    """
    AI Service handles interactions with Google Gemini API to power the 
    smart features of the EcoSphere platform.
    """

    @staticmethod
    def verify_csr_proof(activity_title: str, image_url: str) -> AIVerificationResponse:
        """
        Uses Gemini Vision to verify if the uploaded proof matches the CSR activity.
        Returns a structured AIVerificationResponse.
        """
        try:
            client = get_gemini_client()
            
            prompt = (
                f"Analyze the evidence provided at this URL: {image_url}. "
                f"Does it contain clear evidence of the activity: '{activity_title}'? "
                "Reply strictly with a JSON object containing three keys: "
                "'verified' (boolean), 'confidence' (float between 0 and 100), "
                "and 'reason' (string explaining your decision)."
            )
            
            # Use gemini-2.5-flash for fast and cost-effective multi-modal tasks
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                }
            )
            
            result = json.loads(response.text)
            return AIVerificationResponse(
                verified=result.get("verified", False),
                confidence=result.get("confidence", 0.0),
                reason=result.get("reason", "Parsed successfully")
            )
            
        except Exception as e:
            # Safe fallback if AI fails or key is missing
            return AIVerificationResponse(
                verified=False,
                confidence=0.0,
                reason=f"AI Verification failed: {str(e)}"
            )

    @staticmethod
    def suggest_emission_factor(description: str) -> dict:
        """
        Uses Gemini to suggest the correct emission factor category based on a raw description 
        (e.g. from an ERP invoice or purchase record).
        """
        try:
            client = get_gemini_client()
            prompt = (
                f"Based on the following expense/activity description: '{description}', "
                "suggest the most appropriate carbon emission factor category. "
                "Reply strictly with a JSON object containing 'category' (string) "
                "and 'confidence' (float between 0 and 100)."
            )
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={
                    "response_mime_type": "application/json",
                }
            )
            return json.loads(response.text)
        except Exception as e:
            return {"category": "Unknown", "confidence": 0.0, "error": str(e)}
