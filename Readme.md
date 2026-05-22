# VisionSense

VisionSense is an image captioning web application that generates natural language descriptions for uploaded images using deep learning and NLP techniques.

The project combines a Python-based machine learning pipeline with a backend API to process images and return generated captions in real time.

## Features

* Upload images through a simple web interface
* Generate captions automatically using an image captioning model
* REST API integration using FastAPI
* Supports real-time inference
* Modular backend structure for future improvements

## Tech Stack

### Backend

* FastAPI
* Python

### Machine Learning
- BLIP image captioning model
- Vision-Language Transformer architecture
- Image-to-text generation pipeline
- Hugging Face Transformers

### Other Tools

* NumPy
* OpenCV / PIL
* Git

## Project Structure

```bash
VisionSense/
│
├── uploads/            # Uploaded images
├── model/              # Trained model files
├── static/             # Static assets
├── templates/          # HTML templates
├── app.py              # Main application
├── requirements.txt
└── ...
```

## How It Works

1. User uploads an image
2. The image is processed and converted into feature vectors
3. The model generates a caption based on extracted visual features
4. The generated description is returned to the user

## Running Locally

Clone the repository:

```bash
git clone https://github.com/sanskriti231/VisionSense.git
cd VisionSense
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application - run backend and ML servers in two terminals:

```bash
cd backend
npm run dev
uvicorn app:app --reload
```

The backend server should start locally on:

```bash
http://127.0.0.1:5000
```

## Current Limitations

* Uploaded images are currently stored locally in the `uploads/` folder
* The project is designed as a prototype and is not optimized for large-scale deployment
* Model accuracy can vary depending on image quality and dataset diversity

## Future Improvements

* Cloud storage integration (AWS S3 / Cloudinary)
* User authentication
* Better caption generation models
* Deployment support
* Multi-language caption generation

## Author

Sanskriti Gupta
@sanskriti231
