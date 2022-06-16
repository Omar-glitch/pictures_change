from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from routes import img_route
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.include_router(img_route.route)
app.mount('/static', StaticFiles(directory='static'), name="static")

templates = Jinja2Templates(directory='templates')

@app.get('/', response_class=HTMLResponse)
async def home(request : Request):
    return templates.TemplateResponse("home.html", {"request" : request})

@app.post('/a')
async def posting(request: Request):
    print(await request.form())
    return JSONResponse({"abc": "a"})

@app.get('/img')
async def img_home(request : Request):
    return templates.TemplateResponse('images.html', {'request' : request})

@app.get('/doc')
async def doc(request: Request):
    return templates.TemplateResponse('docs.html', {'request' : request})

@app.get('/converter')
async def converter(request: Request):
    return templates.TemplateResponse('converter.html', {'request' : request})

@app.get('/about')
async def about(request: Request):
    return templates.TemplateResponse('about.html', {'request' : request})