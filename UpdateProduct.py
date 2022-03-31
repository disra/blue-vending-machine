from pydantic import BaseModel
from typing import Optional

class UpdateProduct(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    quantity: Optional[int] = None