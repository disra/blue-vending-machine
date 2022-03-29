from pydantic import BaseModel
from typing import Optional

class UpdateCoinStock(BaseModel):
    types: Optional[str]
    value: Optional[int]
    amount: Optional[int]
