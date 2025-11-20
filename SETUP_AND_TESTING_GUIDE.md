# Setup and Testing Guide - SunPath AI

**Complete guide for setting up and testing the newly configured features**

---

## 📋 Table of Contents
1. [Backend Setup](#backend-setup)
2. [Mobile App Setup](#mobile-app-setup)
3. [Testing New Features](#testing-new-features)
4. [Live Host Configuration](#live-host-configuration)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Backend Setup

### Prerequisites
- Python 3.13+ installed
- PostgreSQL running on port 5433
- Redis installed (optional, for caching)

### Step 1: Install Backend Dependencies

```bash
cd mindmap-app/backend

# Create/activate virtual environment (if not already)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn firebase-admin sqlalchemy psycopg2-binary alembic python-dotenv pydantic pydantic-settings httpx redis

# Or if there's a requirements.txt:
pip install -r requirements.txt
```

### Step 2: Database Setup

```bash
# Ensure PostgreSQL is running on port 5433
# Check connection
python test_connection.py

# Run migrations
cd src
alembic upgrade head
```

### Step 3: Start Backend Server

```bash
# From backend directory
python src/main.py

# Or using uvicorn directly
uvicorn src.main:app --host 0.0.0.0 --port 5000 --reload
```

### Step 4: Verify Backend is Running

```bash
# Test health endpoint
curl http://localhost:5000/health

# Should return something like:
# {"status": "healthy", "timestamp": "..."}
```

---

## 📱 Mobile App Setup

### Step 1: Install Dependencies

```bash
cd mindmap-app/mobile-app

# Install npm dependencies
npm install

# Or if using Expo CLI
npx expo install
```

### Step 2: Verify Environment Configuration

Check that `mobile-app/.env` exists and contains:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=mindmap-mental-health-1d8f7.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=mindmap-mental-health-1d8f7
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=mindmap-mental-health-1d8f7.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=793337509337
EXPO_PUBLIC_FIREBASE_APP_ID=1:793337509337:web:46ffb3bb243cb1f9f615c8
EXPO_PUBLIC_API_URL=http://localhost:5000/api/v1
NODE_ENV=development
```

### Step 3: Start Mobile App

```bash
# Start Expo development server
npm start

# Or
npx expo start

# Then:
# - Press 'a' for Android emulator
# - Press 'i' for iOS simulator
# - Scan QR code with Expo Go app on physical device
```

---

## 🧪 Testing New Features

### Test 1: API Connectivity

**Mobile App → Backend Communication**

1. **Start backend** (see Backend Setup above)
2. **Start mobile app**
3. **Open HomeScreen**
4. **Check console logs** for:
   ```
   Using default wellness metrics - API not available
   ```
   OR successful API connection

### Test 2: Wellness Metrics Integration

**What to test**:
- HomeScreen should display 4 wellness metrics
- Values should load from backend API (if running)
- Should fall back to default values if backend offline

**How to test**:

```bash
# With backend running, test the endpoint directly
curl http://localhost:5000/api/v1/analytics/wellness-metrics?period=30d

# Expected response:
{
  "metrics": [
    {
      "label": "Heart Harmony",
      "value": 8.2,
      "trend": "up",
      "context": "Overall emotional balance"
    },
    ...
  ]
}
```

**In Mobile App**:
1. Navigate to HomeScreen
2. Scroll to "Your Wellness Journey" section
3. Verify 4 metric cards display correctly
4. Check values update from API (if backend running)

### Test 3: AI Conversation Screen Navigation

**What to test**:
- AI Conversation button should be clickable
- Should navigate to AIChat screen

**How to test**:
1. Open HomeScreen
2. Find "AI Conversation" card
3. Tap the card
4. Should navigate to AIChat screen (or show error if screen doesn't exist yet)

**Expected behavior**:
- Button is **enabled** (not grayed out)
- Tapping triggers navigation
- If AIChat screen doesn't exist, you'll see a navigation error

### Test 4: All Quick Action Buttons

**Test each button**:
- ✅ Morning Sun Check-In → Should navigate
- ✅ Mood Tracker → Should navigate
- ✅ AI Conversation → **NEW: Should navigate** (was disabled before)
- ✅ Resource Map → Should navigate
- ✅ Analytics → Should navigate
- ✅ Profile → Should navigate

---

## 🌐 Live Host Configuration

### For Production/Staging Deployment

#### Option 1: Update Environment Variables

**Mobile App** (`mobile-app/.env`):
```env
# Change from:
EXPO_PUBLIC_API_URL=http://localhost:5000/api/v1

# To your live host:
EXPO_PUBLIC_API_URL=https://api.sunpath-ai.com/api/v1
# Or:
EXPO_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
```

#### Option 2: Environment-Specific Configs

**Create separate env files**:

`mobile-app/.env.development`:
```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api/v1
NODE_ENV=development
```

`mobile-app/.env.production`:
```env
EXPO_PUBLIC_API_URL=https://api.sunpath-ai.com/api/v1
NODE_ENV=production
```

**Update package.json**:
```json
{
  "scripts": {
    "start": "expo start",
    "start:prod": "NODE_ENV=production expo start"
  }
}
```

#### Option 3: Using Ngrok for Testing (Temporary Live URL)

If you want to test with a live URL without deploying:

```bash
# Install ngrok
npm install -g ngrok

# Start your backend
cd mindmap-app/backend
python src/main.py

# In another terminal, expose backend
ngrok http 5000

# Ngrok will provide a URL like:
# https://abc123.ngrok-free.app

# Update mobile-app/.env:
EXPO_PUBLIC_API_URL=https://abc123.ngrok-free.app/api/v1
```

### Backend CORS Configuration

**Update `backend/src/core/config.py`**:

```python
ALLOWED_ORIGINS: List[str] = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8081",
    "exp://localhost:8081",  # For Expo
    "https://your-production-domain.com",  # Add your production domain
    "https://api.sunpath-ai.com",  # Add your API domain
]
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"

**Symptoms**: Mobile app shows "Using default wellness metrics"

**Solutions**:
1. **Check backend is running**:
   ```bash
   curl http://localhost:5000/health
   ```

2. **Check mobile app can reach backend**:
   - If using physical device, backend must be on same network
   - Use computer's local IP instead of `localhost`:
     ```env
     EXPO_PUBLIC_API_URL=http://192.168.1.100:5000/api/v1
     ```

3. **Check CORS settings** in backend

### Issue: "ModuleNotFoundError" when starting backend

**Solution**: Install missing Python packages:
```bash
cd mindmap-app/backend
pip install firebase-admin fastapi uvicorn sqlalchemy psycopg2-binary
```

### Issue: "Database connection failed"

**Solutions**:
1. **Check PostgreSQL is running** on port 5433
2. **Verify credentials** in `.env`:
   ```env
   DATABASE_URL=postgresql://postgres:Roblox@127.0.0.1:5433/mindmap
   ```
3. **Test connection**:
   ```bash
   cd mindmap-app/backend
   python test_connection.py
   ```

### Issue: "Firebase authentication failed"

**Solutions**:
1. **Verify Firebase credentials** in `.env` and `mobile-app/.env`
2. **Check Firebase console** for app status
3. **Ensure API key is valid** and not restricted

### Issue: AI Conversation button does nothing

**This is expected** if the AIChat screen hasn't been created yet.

**Create the screen** or update the HomeScreen to navigate to an existing screen:

```javascript
// In HomeScreen.js, change:
screen: "AIChat"

// To an existing screen like:
screen: "ChatScreen"  // or whatever your chat screen is called
```

---

## ✅ Testing Checklist

### Backend Tests
- [ ] Backend starts without errors
- [ ] Health endpoint responds: `curl http://localhost:5000/health`
- [ ] Database connection works
- [ ] API endpoints are accessible

### Mobile App Tests
- [ ] App starts and loads HomeScreen
- [ ] Firebase authentication works (if implemented)
- [ ] All 6 quick action buttons are clickable
- [ ] AI Conversation button navigates (not grayed out)
- [ ] Wellness metrics display (4 cards)
- [ ] Time-based greeting updates correctly

### API Integration Tests
- [ ] Wellness metrics fetch from backend (when running)
- [ ] Graceful fallback to defaults (when backend offline)
- [ ] No console errors related to API calls
- [ ] Loading states work correctly

### Production Readiness
- [ ] Environment variables configured for production
- [ ] CORS settings updated for production domain
- [ ] API keys secured (not in git)
- [ ] SSL/HTTPS configured for production API

---

## 📊 Expected API Endpoint

### Backend Implementation Needed

The mobile app expects this endpoint to exist:

**Endpoint**: `GET /api/v1/analytics/wellness-metrics`

**Query Parameters**:
- `period` (optional): Time period for metrics (e.g., "30d", "7d", "90d")

**Response Format**:
```json
{
  "metrics": [
    {
      "label": "Heart Harmony",
      "value": 8.2,
      "trend": "up",  // "up", "down", or "stable"
      "context": "Overall emotional balance"
    },
    {
      "label": "Community Connection",
      "value": 7.5,
      "trend": "stable",
      "context": "Social and family bonds"
    },
    {
      "label": "Inner Peace",
      "value": 6.8,
      "trend": "up",
      "context": "Spiritual alignment"
    },
    {
      "label": "Cultural Pride",
      "value": 9.1,
      "trend": "up",
      "context": "Heritage appreciation"
    }
  ],
  "period": "30d",
  "updated_at": "2025-10-18T02:00:00Z"
}
```

**Implementation Location**: Create in `backend/src/api/routers/analytics.py` (or similar)

---

## 🎯 Success Criteria

Your setup is successful when:

✅ Backend starts without errors and responds to health checks
✅ Mobile app connects to backend (or gracefully falls back)
✅ HomeScreen displays wellness metrics
✅ All 6 quick action buttons work
✅ AI Conversation button is functional
✅ No critical errors in console

---

## 📞 Need Help?

### Common Commands Reference

```bash
# Backend
cd mindmap-app/backend
python src/main.py                    # Start backend
python test_connection.py             # Test database
curl http://localhost:5000/health     # Test health endpoint

# Mobile App
cd mindmap-app/mobile-app
npm install                           # Install dependencies
npm start                             # Start Expo
npx expo start --clear                # Start with cache cleared

# Check Environment
cat mobile-app/.env                   # View mobile env vars
cat .env | grep API                   # View API keys
```

---

**Ready to test?** Start with the Backend Setup section above!
