from pydantic import BaseModel
from typing import List


class CoinInsert(BaseModel):
    productPrice: int
    coinInsert: List[dict] = []
