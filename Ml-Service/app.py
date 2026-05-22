from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load image captioning model
captioner = pipeline("image-text-to-text", model="Salesforce/blip-image-captioning-base")

@app.post("/describe")
async def describe_image(image: UploadFile = File(...)):

    contents = await image.read()

    img = Image.open(io.BytesIO(contents)).convert("RGB")

    result = captioner(img)

    return {
        "description": result[0]["generated_text"]
    }