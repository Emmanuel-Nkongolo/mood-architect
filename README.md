# 🌿 Mood Architect

A full-stack AI web app that generates personalized therapeutic affirmations based on your name and how you're feeling.

## Live URLs
- **Frontend:** https://mood-architect.vercel.app
- **Backend:** https://mood-architect-backend.onrender.com

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Python + FastAPI
- **AI:** OpenAI API (gpt-4o-mini)
- **Frontend Deployment:** Vercel
- **Backend Deployment:** Render

## How to Run Locally

### Backend
```bash
cd backend
python -m venv mood-architect
mood-architect\Scripts\activate
pip install -r requirements.txt
```
Create a `.env` file in the backend folder:
```
OPENAI_API_KEY=your-openai-api-key-here
```
Then run:
```bash
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173`

## How to Deploy

### Backend (Render)
1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **New** → **Web Service** → connect your repo
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `pip install -r requirements.txt`
5. Set **Start Command** to `uvicorn main:app --host 0.0.0.0 --port 10000`
6. Add environment variable `OPENAI_API_KEY` with your key
7. Click **Deploy**

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New** → **Project** → import your repo
3. Set **Root Directory** to `frontend`
4. Click **Deploy**

## Environment Variables
| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key from platform.openai.com |

## What I Would Improve With More Time
- Add a history of past affirmations saved locally
- Add more feeling presets and emoji support
- Add animation when the affirmation appears
- Add rate limiting to protect the API
- Write unit tests for the backend endpoint
