import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

class TimingMiddleware(BaseHTTPMiddleware):
    """
    Custom middleware to measure and append the processing time of 
    each API request as a custom HTTP header.
    
    This helps the team monitor the performance of our ESG calculation engines.
    """
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Proceed with the request
        response = await call_next(request)
        
        # Calculate time taken
        process_time = time.time() - start_time
        
        # Append processing time (in milliseconds) to the response headers
        response.headers["X-Process-Time-Ms"] = str(round(process_time * 1000, 2))
        return response
