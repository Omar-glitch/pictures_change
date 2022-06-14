from PIL import Image, features
from io import BytesIO
from fastapi import UploadFile

async def render_image(img : UploadFile):
    file = Image.open(BytesIO(await img.read()))
    width, height = file.size
    v, h = 0, 0
    resta = width - height

    if resta != 0:
        if width > height: h = resta / 2
        else: v = - resta / 2

    r = file.resize((200, 200), box=(h, v, width - h, height - v))
    r.save(i := BytesIO(), 'webp')
    return i

async def render_image_full(img : UploadFile):
    file = Image.open(BytesIO(await img.read()))
    file.thumbnail((400, 200), Image.ANTIALIAS)
    print(features.pilinfo())
    file.save(i := BytesIO(), 'webp')
    return i

# r = resized_img.transpose(Image.FLIP_TOP_BOTTOM)
# r = resized_img.rotate(45, expand=True)
# r = resized_img.convert('L')
# r = r.filter(ImageFilter.FIND_EDGES)