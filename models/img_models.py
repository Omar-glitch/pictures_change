from enum import Enum
from fastapi import Depends, File, Form, UploadFile
from pydantic import BaseModel
from typing import Union

class ImgType(str, Enum):
    jpeg = 'image/jpeg'
    png = 'image/png'
    webp = 'image/webp'
    tiff = 'image/tiff'

class ImageModel:
    def __init__(
        self, 
        img : UploadFile, 
        box: bool = Form(False),
        top: float = Form (None),
        left: float = Form (None),
        right: float = Form (None),
        bottom: float = Form (None),
        b64: bool = Form(False),
        type : ImgType = Form(None)
    ):
        self.img = img
        self.box = box
        self.top = top
        self.right = right
        self.bottom = bottom
        self.left = left
        self.b64 = b64
        self.type = type
