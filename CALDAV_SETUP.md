# CalDAV Calendar Setup Guide

This guide will help you connect your CalDAV calendars to the Family Calendar application.

## What is CalDAV?

CalDAV is a protocol that allows calendar applications to sync with calendar servers. Many popular calendar services support CalDAV, including:

- **Google Calendar** (with specific setup)
- **Apple iCloud Calendar**
- **Microsoft Outlook/Office 365**
- **Nextcloud**
- **OwnCloud**
- **Zimbra**
- **Yahoo Calendar**

## How to Connect Your Calendar

### 1. Access Calendar Manager
- Click the "📅 Manage Calendars" button in the date navigation section
- This opens the Calendar Manager popup

### 2. Add a New Calendar
- Click the "+ Add Calendar" button
- Fill in the required information:
  - **Calendar Name**: A friendly name for your calendar (e.g., "Work Calendar", "Personal Calendar")
  - **CalDAV URL**: The CalDAV server URL (see examples below)
  - **Username**: Your calendar account username
  - **Password**: Your calendar account password
  - **Assign to Person** (Optional): Choose which family member this calendar belongs to

### 3. Common CalDAV URLs

#### Google Calendar
**⚠️ Important**: Google Calendar does not support CalDAV protocol directly. The iCal feed is read-only and cannot be used for two-way synchronization.

**Alternative**: Use a service like **Fruux** (fruux.com) that provides CalDAV access to Google Calendar.

#### Apple iCloud
```
https://caldav.icloud.com/YOUR_APPLE_ID/calendars/YOUR_CALENDAR_NAME
```

#### Microsoft Outlook/Office 365
```
https://outlook.office365.com/owa/YOUR_EMAIL/calendar/YOUR_CALENDAR_NAME
```

#### Nextcloud
```
https://your-nextcloud-server.com/remote.php/dav/calendars/YOUR_USERNAME/YOUR_CALENDAR_NAME
```

### 4. Managing Connected Calendars

Once connected, you can:
- **Enable/Disable**: Toggle calendars on/off without removing them
- **Remove**: Permanently remove a calendar connection
- **View Status**: See which calendars are currently active
- **Assign to Person**: Change which family member a calendar belongs to
- **View Assignments**: See which person each calendar is assigned to

## Troubleshooting

### Connection Issues
- **Check URL**: Ensure the CalDAV URL is correct and accessible
- **Verify Credentials**: Double-check username and password
- **Network Access**: Make sure your server allows CalDAV connections
- **SSL/TLS**: Some servers require HTTPS connections

### Common Error Messages
- **"Connection failed"**: Check your URL and credentials
- **"No calendars found"**: The account may not have any calendars or the URL is incorrect
- **"Authentication failed"**: Username or password is incorrect

### Getting Your CalDAV URL

#### Google Calendar
**⚠️ Google Calendar does not support CalDAV protocol directly.**

**Alternative solutions:**
1. **Use Fruux** (fruux.com) - Provides CalDAV access to Google Calendar
2. **Use Apple iCloud Calendar** - Fully supports CalDAV
3. **Use Microsoft Outlook** - Supports CalDAV
4. **Consider Google Calendar API** - Requires backend implementation

#### Apple iCloud
1. Go to iCloud.com and sign in
2. Open Calendar
3. Right-click on a calendar and select "Calendar Info"
4. Look for the CalDAV URL in the calendar details

#### Microsoft Outlook
1. Open Outlook calendar
2. Go to Settings > View all Outlook settings
3. Navigate to Calendar > Shared calendars
4. Find the CalDAV URL in the calendar sharing options

## Security Notes

- Your calendar credentials are stored securely on the backend
- Passwords are not displayed in the interface
- Calendar data is only fetched when needed
- You can remove calendar connections at any time

## Support

If you're having trouble connecting your calendar:
1. Check the troubleshooting section above
2. Verify your CalDAV URL with your calendar provider
3. Ensure your calendar service supports CalDAV
4. Try connecting with a different calendar client first to verify your credentials

## Features

Once connected, your calendars will:
- Sync events automatically when you change dates
- Display events in the family calendar view under the assigned person's column
- Update in real-time when you navigate between days
- Show calendar source in the event details
- Allow individual calendar management (enable/disable/remove)
- Support person assignment for family organization
- Show connection status in person headers

## Person Assignment

Each calendar can be assigned to a specific family member. You can manage up to 6 family members:

### Managing Family Members
- **Add People**: Go to Settings → Family Members → "Add Person"
- **Edit Names**: Click "Edit" next to any person to change their name
- **Remove People**: Click "Remove" to delete a person (this will unassign their calendars)
- **Maximum**: Up to 6 family members can be added

### Dynamic Columns
- New columns are automatically created when you add people
- Each person gets their own color-coded column
- Calendars can be assigned to any person
- Events appear in the assigned person's column

When a calendar is assigned to a person, all events from that calendar will appear in that person's column. This makes it easy to see each family member's schedule at a glance. 