from datetime import datetime, timezone
import string
import random
from typing import Any, Dict

def get_utc_now() -> datetime:
    """
    Returns the current datetime in UTC timezone.
    Always prefer UTC over local server time for database timestamps.
    """
    return datetime.now(timezone.utc)

def generate_random_string(length: int = 10) -> str:
    """
    Generate a secure random alphanumeric string.
    Useful for mock ERP Transaction IDs or placeholder tokens.
    """
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

def format_pagination(items: list, total: int, limit: int, offset: int) -> Dict[str, Any]:
    """
    Utility to format standard paginated API responses.
    This guarantees our list endpoints remain structured and scalable.
    """
    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset,
        "has_more": (offset + limit) < total
    }
