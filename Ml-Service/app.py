from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

# Allow backend to talk to this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/describe")
async def describe_image(image: UploadFile = File(...)):
    contents = await image.read()
    img = Image.open(io.BytesIO(contents))
    return {"description": "This is a dummy image description from Python service."}