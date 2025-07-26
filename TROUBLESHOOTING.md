# Troubleshooting Guide: Adding People

If you're getting an error when adding people, follow these steps to debug the issue:

## 🔍 **Step 1: Check Backend Status**

Make sure the backend server is running:

```bash
# In the backend directory
cd backend
source ../backend-venv/bin/activate
python app.py
```

You should see: `* Running on http://127.0.0.1:5001`

## 🔍 **Step 2: Check Frontend Status**

Make sure the frontend server is running:

```bash
# In the frontend directory
cd frontend
npm start
```

You should see: `Local: http://localhost:3000`

## 🔍 **Step 3: Test the API Directly**

Run the debug script to test the API:

```bash
# In the project root
python debug_people_api.py
```

This will test all the people API endpoints and show you if they're working.

## 🔍 **Step 4: Check Browser Console**

1. Open your browser to `http://localhost:3000`
2. Open Developer Tools (F12 or right-click → Inspect)
3. Go to the Console tab
4. Try to add a person
5. Look for any error messages in the console

## 🔍 **Step 5: Common Issues & Solutions**

### Issue: "Connection refused" or "Failed to fetch"
**Solution**: Backend server isn't running
- Start the backend server (Step 1)

### Issue: "CORS error"
**Solution**: Backend CORS isn't configured properly
- Make sure the backend has `CORS(app)` enabled

### Issue: "Maximum of 6 people allowed"
**Solution**: You've reached the limit
- Remove some people first, then add new ones

### Issue: "Person already exists"
**Solution**: Try a different name
- The name you're trying to add already exists

### Issue: "Person name cannot be empty"
**Solution**: Enter a valid name
- Make sure you're not entering just spaces

## 🔍 **Step 6: Manual API Test**

You can also test the API manually using curl:

```bash
# Get current people
curl http://localhost:5001/api/people

# Add a person
curl -X POST http://localhost:5001/api/people \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Person"}'

# Update a person
curl -X PUT http://localhost:5001/api/people/Test%20Person \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Person"}'

# Delete a person
curl -X DELETE http://localhost:5001/api/people/Updated%20Person
```

## 🔍 **Step 7: Check Network Tab**

1. Open Developer Tools → Network tab
2. Try to add a person
3. Look for the request to `/api/people`
4. Check the request and response details

## 🔍 **Step 8: Reset Everything**

If nothing else works:

1. Stop both servers (Ctrl+C)
2. Clear browser cache
3. Restart backend server
4. Restart frontend server
5. Try again

## 📞 **Still Having Issues?**

If you're still getting errors:

1. **Check the exact error message** in the browser console
2. **Note the step where it fails** (adding, editing, or removing)
3. **Check if the backend shows any errors** in its terminal
4. **Try the debug script** to isolate the issue

The debug script will help identify if the problem is with:
- Backend API (server not running, API errors)
- Frontend (JavaScript errors, network issues)
- Data validation (invalid names, duplicates)

## 🎯 **Quick Fix Checklist**

- [ ] Backend server running on port 5001
- [ ] Frontend server running on port 3000
- [ ] No CORS errors in browser console
- [ ] API endpoints responding correctly
- [ ] Valid person name (not empty, not duplicate)
- [ ] Under 6 people limit 