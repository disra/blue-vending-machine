from pydantic import BaseModel


class CoinStock(BaseModel):
    types: str
    value: int
    amount: int
