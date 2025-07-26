# Google Calendar Integration Troubleshooting

## Error: "405 Method Not Allowed"

If you're getting this error when trying to connect Google Calendar:

```
Failed to add calendar: Failed to connect to calendar: Connection failed: PropfindError at '405 Method Not Allowed
```

## What This Error Means

The **405 Method Not Allowed** error confirms that **Google Calendar does not support CalDAV protocol**. This is not a bug in your setup - it's a limitation of Google Calendar.

## Why This Happens

- Google Calendar uses its own proprietary API, not CalDAV
- The iCal feed (webcal://) is read-only and cannot be used for two-way synchronization
- CalDAV requires PROPFIND method, which Google Calendar servers reject

## Solutions

### ✅ **Recommended: Use Apple iCloud Calendar**
Apple iCloud Calendar fully supports CalDAV and works perfectly with the Family Calendar app.

**Steps:**
1. Go to [iCloud.com](https://icloud.com)
2. Open Calendar
3. Right-click on your calendar → "Calendar Info"
4. Copy the CalDAV URL
5. Use this URL in the Family Calendar app

### ✅ **Alternative: Use Fruux**
Fruux provides CalDAV access to Google Calendar.

**Steps:**
1. Go to [fruux.com](https://fruux.com)
2. Sign up for a free account
3. Connect your Google Calendar to Fruux
4. Use Fruux's CalDAV URL in the Family Calendar app

### ✅ **Alternative: Use Microsoft Outlook**
Microsoft Outlook supports CalDAV and can sync with Google Calendar.

**Steps:**
1. Set up Outlook to sync with your Google Calendar
2. Get the CalDAV URL from Outlook
3. Use this URL in the Family Calendar app

## What Won't Work

❌ **Google Calendar iCal feed** - Read-only only
❌ **Converting webcal:// to https://** - Still read-only
❌ **Direct CalDAV to Google** - Not supported by Google

## Future Solution

To fully integrate Google Calendar, the Family Calendar app would need:
1. Google Calendar API implementation
2. OAuth 2.0 authentication
3. Backend changes to support Google's API

This is a more complex integration that would require significant development work.

## Quick Test

To verify this is the issue, try connecting an **Apple iCloud Calendar** instead. If that works, it confirms the app is working correctly and the issue is specifically with Google Calendar's lack of CalDAV support.

## Need Help?

If you need assistance setting up Apple iCloud Calendar or Fruux, refer to the main documentation:
- [CALDAV_SETUP.md](CALDAV_SETUP.md)
- [CALENDAR_INTEGRATION_GUIDE.md](CALENDAR_INTEGRATION_GUIDE.md) 