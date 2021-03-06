from PIL import Image, features
from io import BytesIO
from fastapi import UploadFile
from models.img_models import ImageModel

async def render_image(img : ImageModel):
    file = Image.open(BytesIO(await img.img.read()))
    width, height = file.size
    v, h = 0, 0
    resta = width - height

    if resta != 0:
        if width > height: h = resta / 2
        else: v = - resta / 2

    r = file.resize((img.size, img.size), box=(h, v, width - h, height - v))
    r.convert('RGB')
    r.save(i := BytesIO(), 'webp')
    return i

async def render_image_full(img : ImageModel):
    file = Image.open(BytesIO(await img.img.read()))
    file.thumbnail((img.size, img.size), Image.ANTIALIAS)

    if img.top:
        file = file.crop((img.left, img.top, img.right, img.bottom))
    file.save(i := BytesIO(), 'webp')
    return i

# print(features.pilinfo())
# r = resized_img.transpose(Image.FLIP_TOP_BOTTOM)
# r = resized_img.rotate(45, expand=True)
# r = resized_img.convert('L')
# r = r.filter(ImageFilter.FIND_EDGES)