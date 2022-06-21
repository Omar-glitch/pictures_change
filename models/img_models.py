from fastapi import File, Form, UploadFile
from pydantic import BaseModel

class Box(BaseModel):
    top: int
    left: int
    right: int
    bottom: int

class ImageModel:
    def __init__(
        self, 
        img : list[UploadFile], 
        top : int = Form(...), 
        left: int = Form(...),
        right: int = Form(...),
        bottom: int = Form(...),
        type : str = Form(...)
    ):
        self.img = img
        self.top = top
        self.left = left
        self.right = right
        self.bottom = bottom
        self.type = type