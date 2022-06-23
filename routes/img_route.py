from ast import Bytes
import base64
from fastapi import APIRouter, Depends, Form, File, Request, UploadFile,  HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from utils.render_imgs import render_image, render_image_full
from io import BytesIO
from models.img_models import ImageModel
from PIL import Image

WORD_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

route = APIRouter(prefix="/img")

# @route.post('/')
# async def img(img : UploadFile = File(...)):
#     resized_img = await render_image_full(img)
#     resized_img.seek(0)
#     return StreamingResponse(resized_img, media_type='image/jpeg')

@route.post('/')
async def img(img : UploadFile = File()):
    resized_img = await render_image_full(img)
    resized_img.seek(0)
    return StreamingResponse(resized_img, media_type='image/png')

@route.put('/')
async def img(img : ImageModel = Depends()):
    im = Image.open(BytesIO(await img.img.read()))
    im.save(i := BytesIO(), format='WEBP')
    img_str = base64.b64encode(i.getvalue())
    
    # resized_img = await render_image_full(img)
    return bytes("data:image/jpeg;base64,", encoding='utf-8') + img_str

@route.put('/base64')
async def img_base64(img_base64 : str = Form(...)):
    base64string = 'data:image/jpeg;base64,'
    if (not img_base64.startswith(base64string)):
        raise HTTPException(422, {"message" : "the base64 string header is not correct"})
    try:
        img_base64 = img_base64[len(base64string) :]
        img = Image.open(BytesIO(base64.b64decode(img_base64)))
    except:
        raise HTTPException(422, {"message" : "cannot convert to img"})
    img.save(i := BytesIO(), format='webp')
    i.seek(0)
    return StreamingResponse(i, media_type='image/png')
