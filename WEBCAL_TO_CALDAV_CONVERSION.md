# Converting Webcal Link to CalDAV URL

## Your Webcal Link
```
webcal://p141-caldav.icloud.com/published/2/MTIwNDUxODI3ODkxMjA0NaA5O1nEylJwV617YTI-snWXzKWecEDXC0Ci5UW5nPTSakmjCYXJjk9sJ8d2dn9Li25CDXM1FPSxt2-HiN6Xxx8
```

## The Problem
- **Webcal links** are for **read-only** access
- **CalDAV URLs** are for **two-way synchronization**
- Your Family Calendar app needs CalDAV for full functionality

## ✅ **Solution: Get the CalDAV URL**

### Step 1: Access iCloud Calendar Settings

1. **Go to iCloud.com**
   - Visit [iCloud.com](https://icloud.com)
   - Sign in with your Apple ID (`Ben_Johnston@outlook.com.au`)

2. **Open Calendar**
   - Click on "Calendar" app
   - Look for your "Personal" calendar in the left sidebar

3. **Get Calendar Info**
   - Right-click on "Personal" calendar
   - Select "Calendar Info" or "Settings"
   - Look for **"CalDAV URL"** (not webcal)

### Step 2: Find the CalDAV URL

The CalDAV URL should look like this:
```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Personal
```

**Note**: The webcal link you provided is a **published/shared** calendar link, which is different from the CalDAV URL needed for direct access.

### Step 3: Use in Family Calendar App

When you find the CalDAV URL, use these settings:

- **Calendar Name**: "Personal"
- **CalDAV URL**: [The CalDAV URL from Step 2]
- **Username**: `Ben_Johnston@outlook.com.au`
- **Password**: [Your App-Specific Password]

## 🔍 **Alternative: If You Can't Find CalDAV URL**

### Option 1: Try Common CalDAV URLs
Based on your Apple ID, try these URLs:

```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Personal
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Home
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Default
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Calendar
```

### Option 2: Use Principal URL
Try this URL to let the app discover available calendars:

```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/
```

### Option 3: Check Calendar App (Mac)
If you have a Mac:
1. Open Calendar app
2. Right-click on "Personal" calendar
3. Select "Get Info"
4. Look for "CalDAV URL" in the info panel

## 🚨 **Important Notes**

- **Webcal links** (like yours) are for **read-only** access
- **CalDAV URLs** are for **full two-way sync**
- The Family Calendar app needs CalDAV for proper functionality
- Your App-Specific Password is still required

## 🧪 **Quick Test**

1. **Get the CalDAV URL** from iCloud.com (Step 1-2)
2. **Use it in Family Calendar app** with your App-Specific Password
3. **Test the connection**

The CalDAV URL should resolve the "Forbidden" error and allow full calendar synchronization! 🎉 