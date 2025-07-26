# iCloud CalDAV Connection Alternatives

## 🚨 **Current Issue: "Forbidden" Error**
- Credentials are correct (App-Specific Password working)
- CalDAV URL format is correct
- Still getting "Forbidden" = Permission/URL issue

## 🔍 **Alternative Solutions**

### **Option 1: Try Different Calendar Names**

The calendar might have a different name than "Personal". Try these URLs:

```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Home
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Default
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Calendar
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Work
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Family
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Events
```

### **Option 2: Use Principal URL (Auto-Discovery)**

Try this URL to let the app discover all available calendars:

```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/
```

**Settings:**
- Calendar Name: "Auto-Discover"
- CalDAV URL: `https://caldav.icloud.com/Ben_Johnston@outlook.com.au/`
- Username: `Ben_Johnston@outlook.com.au`
- Password: [Your App-Specific Password]

### **Option 3: Check Calendar Sharing Settings**

1. **Go to iCloud.com → Calendar**
2. **Right-click your calendar → "Share Calendar"**
3. **Make sure it's set to "Private" or "Public" (not "None")**
4. **Try the connection again**

### **Option 4: Use a Different Calendar Service**

If iCloud continues to give issues, try these alternatives:

#### **A. Fruux (Free CalDAV Service)**
1. Sign up at [fruux.com](https://fruux.com)
2. Get CalDAV URL: `https://dav.fruux.com/`
3. Use your Fruux username/password

#### **B. Google Calendar (via Fruux)**
1. Use Fruux to sync with Google Calendar
2. Then use Fruux's CalDAV URL

#### **C. Microsoft Outlook**
1. Use Outlook.com calendar
2. CalDAV URL: `https://outlook.office365.com/owa/Ben_Johnston@outlook.com.au/calendar/`

### **Option 5: Manual Calendar Discovery**

#### **Step 1: Use Principal URL**
```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/
```

#### **Step 2: Check Backend Logs**
Look at your backend console for any calendar discovery information.

#### **Step 3: Try Calendar ID from Webcal**
From your webcal link, extract the calendar ID:
```
MTIwNDUxODI3ODkxMjA0NaA5O1nEylJwV617YTI-snWXzKWecEDXC0Ci5UW5nPTSakmjCYXJjk9sJ8d2dn9Li25CDXM1FPSxt2-HiN6Xxx8
```

Try this URL:
```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/MTIwNDUxODI3ODkxMjA0NaA5O1nEylJwV617YTI-snWXzKWecEDXC0Ci5UW5nPTSakmjCYXJjk9sJ8d2dn9Li25CDXM1FPSxt2-HiN6Xxx8
```

### **Option 6: Check iCloud Calendar Settings**

1. **On iPhone/iPad:**
   - Settings → Apple ID → iCloud → Calendar → ON
   - Settings → Calendar → Default Calendar → [Your Calendar]

2. **On Mac:**
   - System Preferences → Apple ID → iCloud → Calendar ✓
   - Calendar app → Preferences → Accounts → iCloud

3. **On iCloud.com:**
   - Make sure Calendar is enabled
   - Check if calendar is visible and not hidden

### **Option 7: Create a New Test Calendar**

1. **Go to iCloud.com → Calendar**
2. **Click "+" → "New Calendar"**
3. **Name it "Test"**
4. **Try connecting to:**
   ```
   https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Test
   ```

## 🧪 **Testing Order**

1. **Try Option 2 (Principal URL)** - Most likely to work
2. **Try Option 1 (Different names)** - Home, Default, Calendar
3. **Try Option 5 (Calendar ID)** - Using the ID from your webcal link
4. **Try Option 7 (New test calendar)** - Fresh calendar
5. **Try Option 4 (Fruux)** - Alternative service

## 🚨 **If Nothing Works**

The issue might be:
- **iCloud Calendar permissions** (try enabling/disabling calendar sync)
- **Apple ID security settings** (check for any restrictions)
- **Network/firewall issues** (try from different network)
- **Temporary iCloud service issue** (try again later)

## 📞 **Next Steps**

1. **Try the Principal URL first** - it's the most reliable method
2. **Check backend logs** for any error details
3. **Let me know which option you try and the results**

The Principal URL approach (Option 2) should work and automatically discover your available calendars! 🎯 