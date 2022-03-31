from pydantic import BaseModel
from typing import List

class UpdateCoinStock(BaseModel):
    coins: List[dict] = []
