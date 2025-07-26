# Family Calendar Launch Guide

This guide will help you start and stop your Family Calendar application. You need to run both a backend server (Flask) and a frontend server (React).

## Prerequisites
Make sure you have:
- Python installed
- Node.js installed
- All dependencies installed (see installation instructions below)

## Quick Start Commands

### To Launch Everything (Run these in order):

1. **Start Backend Server:**
   ```bash
   cd backend
   source ../backend-venv/bin/activate
   python app.py
   ```
   *Keep this terminal window open!*

2. **Open a NEW terminal window/tab and start Frontend Server:**
   ```bash
   cd frontend
   npm start
   ```
   *Keep this terminal window open too!*

3. **Open your web browser and go to:**
   ```
   http://localhost:3000
   ```

## Detailed Step-by-Step Instructions

### Step 1: Launch the Backend (Flask Server)

1. Open Terminal (or Command Prompt on Windows)
2. Navigate to your project folder:
   ```bash
   cd /Users/benjohnston/Code\ Files/ONE-Calender
   ```
3. Navigate to the backend folder:
   ```bash
   cd backend
   ```
4. Activate the Python virtual environment:
   ```bash
   source ../backend-venv/bin/activate
   ```
   *You should see `(backend-venv)` appear at the start of your command line*
5. Start the Flask server:
   ```bash
   python app.py
   ```
6. You should see output like:
   ```
   * Running on http://127.0.0.1:5001
   * Debug mode: off
   ```
7. **IMPORTANT:** Keep this terminal window open! Don't close it.

### Step 2: Launch the Frontend (React Server)

1. Open a **NEW** terminal window/tab
2. Navigate to your project folder:
   ```bash
   cd /Users/benjohnston/Code\ Files/ONE-Calender
   ```
3. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
4. Start the React development server:
   ```bash
   npm start
   ```
5. You should see output like:
   ```
   Compiled successfully!
   You can now view frontend in the browser.
   Local:            http://localhost:3000
   ```
6. **IMPORTANT:** Keep this terminal window open too! Don't close it.

### Step 3: View Your Calendar

1. Open your web browser (Chrome, Firefox, Safari, etc.)
2. Go to: `http://localhost:3000`
3. You should see your Family Calendar with the touch-friendly interface!

## How to Stop the Servers

### To Stop Everything:

**Method 1: Using Ctrl+C**
1. Go to the terminal window running the backend server
2. Press `Ctrl + C` (or `Cmd + C` on Mac)
3. Go to the terminal window running the frontend server
4. Press `Ctrl + C` (or `Cmd + C` on Mac)

**Method 2: Kill by Port (if Ctrl+C doesn't work)**

Kill Backend (port 5001):
```bash
lsof -ti:5001 | xargs kill -9
```

Kill Frontend (port 3000):
```bash
lsof -ti:3000 | xargs kill -9
```

## Troubleshooting

### If Backend Won't Start:
1. Make sure you're in the backend folder: `cd backend`
2. Make sure virtual environment is activated: `source ../backend-venv/bin/activate`
3. Check if port 5001 is already in use:
   ```bash
   lsof -i :5001
   ```
4. If something is using port 5001, kill it:
   ```bash
   lsof -ti:5001 | xargs kill -9
   ```

### If Frontend Won't Start:
1. Make sure you're in the frontend folder: `cd frontend`
2. Check if port 3000 is already in use:
   ```bash
   lsof -i :3000
   ```
3. If something is using port 3000, kill it:
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

### If Dependencies Are Missing:

**Backend Dependencies:**
```bash
cd backend
source ../backend-venv/bin/activate
pip install -r requirements.txt
```

**Frontend Dependencies:**
```bash
cd frontend
npm install
```

## Quick Reference Commands

### Launch Commands:
```bash
# Terminal 1 - Backend
cd backend && source ../backend-venv/bin/activate && python app.py

# Terminal 2 - Frontend  
cd frontend && npm start
```

### Kill Commands:
```bash
# Kill both servers
lsof -ti:5001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

## What Each Server Does

- **Backend (Flask)**: Provides the API that serves calendar events data and manages CalDAV calendar connections
- **Frontend (React)**: Provides the user interface you see in the browser

Both need to be running for the calendar to work properly!

## Browser Access

Once both servers are running:
- Calendar Interface: http://localhost:3000
- Backend API: http://localhost:5001/api/events
- Calendar Management: http://localhost:5001/api/calendars

## New Features

### CalDAV Calendar Integration
- Connect your existing calendars (Google, iCloud, Outlook, etc.) via CalDAV
- Click "📅 Manage Calendars" in the date navigation section
- Add, remove, and toggle calendar connections
- Events sync automatically when you change dates

### Enhanced Date Navigation
- Date selector moved to a dedicated section below the header
- Swipe left/right on the calendar to navigate between days
- Click the date to open a full calendar picker
- Arrow buttons for day-by-day navigation

## Notes

- The calendar is designed for a 1080x1920 touch screen
- You can access settings by clicking the ⚙️ button in the header
- The interface is touch-friendly with large buttons and text
- Both servers must be running simultaneously for the app to work
- See `CALDAV_SETUP.md` for detailed instructions on connecting calendars 