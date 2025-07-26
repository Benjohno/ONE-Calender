# Calendar Integration Guide: Apple iCloud & Google Calendar

This guide provides step-by-step instructions for connecting your Apple iCloud and Google calendars to the Family Calendar application.

## 🍎 Apple iCloud Calendar Integration

### Step 1: Get Your iCloud CalDAV URL

1. **Sign in to iCloud.com**
   - Go to [iCloud.com](https://www.icloud.com)
   - Sign in with your Apple ID

2. **Access Calendar Settings**
   - Click on "Calendar" app
   - In the left sidebar, find your calendar name
   - Right-click on your calendar name
   - Select "Calendar Info" or "Settings"

3. **Find CalDAV URL**
   - Look for a section called "Calendar URL" or "CalDAV URL"
   - The URL format will be: `https://caldav.icloud.com/YOUR_APPLE_ID/calendars/YOUR_CALENDAR_NAME`
   - Copy this URL

### Step 2: Add to Family Calendar

1. **Open Calendar Manager**
   - Click "📅 Manage Calendars" in your Family Calendar
   - Click "+ Add Calendar"

2. **Enter Details**
   - **Calendar Name**: "iCloud Calendar" or "Apple Calendar"
   - **CalDAV URL**: Paste the URL from Step 1
   - **Username**: Your Apple ID email address
   - **Password**: Your Apple ID password (or App-Specific Password)
   - **Assign to Person**: Choose which family member this belongs to

3. **Test Connection**
   - Click "Add Calendar"
   - The system will test the connection and add your calendar

### Troubleshooting iCloud

**If connection fails:**
- **App-Specific Password**: If you have 2FA enabled, you may need an App-Specific Password
  - Go to [appleid.apple.com](https://appleid.apple.com)
  - Sign in with your Apple ID
  - Go to "Security" → "App-Specific Passwords"
  - Generate a new password for "Calendar"
  - Use this password instead of your regular Apple ID password

- **Calendar Name**: Make sure the calendar name in the URL matches exactly
- **Permissions**: Ensure the calendar is shared/accessible

---

## 🔵 Google Calendar Integration

**⚠️ Important Note**: Google Calendar does not support CalDAV protocol directly. The iCal feed is read-only and cannot be used for two-way synchronization.

### Alternative Solutions for Google Calendar

#### Option 1: Use Google Calendar API (Recommended)
For full Google Calendar integration, you would need to implement the Google Calendar API, which requires:
- Google Cloud Console setup
- OAuth 2.0 authentication
- API credentials and permissions

This is a more complex integration that would require backend changes.

#### Option 2: Manual Calendar Sync
For now, you can manually sync events by:
1. Exporting events from Google Calendar as .ics files
2. Importing them into a CalDAV-compatible calendar service
3. Then connecting that service to the Family Calendar

#### Option 3: Use a Third-Party Service
Consider using a service that provides CalDAV access to Google Calendar:
- **Fruux** (fruux.com) - Provides CalDAV access to Google Calendar
- **Radicale** - Self-hosted CalDAV server
- **Nextcloud** - Self-hosted solution with CalDAV

### Current Limitation
The current Family Calendar application only supports CalDAV protocol. Google Calendar integration would require:
1. Backend changes to support Google Calendar API
2. OAuth 2.0 authentication flow
3. Different event fetching logic

### Recommended Next Steps
For immediate use, we recommend:
1. **Use Apple iCloud Calendar** (fully supported)
2. **Use a CalDAV-compatible service** like Fruux
3. **Consider implementing Google Calendar API** in a future update

### Troubleshooting Google Calendar

**If you're getting 405 errors:**
- This confirms that Google Calendar doesn't support CalDAV
- The iCal feed is read-only and cannot be used for two-way sync
- You'll need to use one of the alternative solutions above
  - Go to [myaccount.google.com](https://myaccount.google.com)
  - Navigate to "Security" → "2-Step Verification" → "App passwords"
  - Generate a new app password for "Calendar"
  - Use this password instead of your regular Google password

- **Calendar Sharing**: Make sure the calendar is not private
  - In Google Calendar settings, ensure the calendar is shared or public
  - Check that "Make available to public" is enabled if needed

- **URL Format**: Double-check the CalDAV URL conversion
  - Make sure you removed `/basic.ics` from the end
  - Ensure you replaced `webcal://` with `https://`

---

## 🔧 Alternative: Using Calendar Apps

If direct CalDAV connection doesn't work, you can use calendar apps as intermediaries:

### For Apple iCloud:
1. **Use Calendar App (Mac)**
   - Open Calendar app on your Mac
   - Add your iCloud calendar
   - Export calendar data or use CalDAV export

### For Google Calendar:
1. **Use Thunderbird or Evolution**
   - Install Thunderbird with Lightning extension
   - Add your Google calendar
   - Export as CalDAV or iCal format

---

## 📱 Testing Your Connection

After adding your calendar:

1. **Check Calendar Manager**
   - Open "📅 Manage Calendars"
   - Verify your calendar shows as "Connected"
   - Check that it's assigned to the correct person

2. **Test Event Display**
   - Navigate to a date with events
   - Events should appear in the assigned person's column
   - Events should use the person's color scheme

3. **Verify Real-time Updates**
   - Add an event to your original calendar
   - Navigate to that date in Family Calendar
   - The event should appear (may take a few minutes to sync)

---

## 🚨 Common Issues & Solutions

### Connection Timeout
- **Check URL**: Ensure the CalDAV URL is correct
- **Network**: Verify internet connection
- **Firewall**: Check if firewall is blocking the connection

### Authentication Failed
- **Credentials**: Double-check username and password
- **2FA**: Use App-Specific Password if 2FA is enabled
- **Account**: Ensure the account is active and accessible

### No Events Showing
- **Date Range**: Make sure you're looking at the correct date
- **Calendar Assignment**: Verify the calendar is assigned to a person
- **Calendar Enabled**: Check that the calendar is enabled in Calendar Manager
- **Sync Delay**: Wait a few minutes for events to sync

### Events in Wrong Column
- **Person Assignment**: Check the person assignment in Calendar Manager
- **Refresh**: Try refreshing the page or navigating to a different date

---

## 💡 Pro Tips

1. **Use Descriptive Names**: Name your calendars clearly (e.g., "Mom's Work Calendar", "Dad's Personal Calendar")

2. **Test with Sample Events**: Add a test event to your original calendar to verify the connection works

3. **Regular Maintenance**: Periodically check Calendar Manager to ensure all calendars are still connected

4. **Backup Important Events**: Keep a backup of critical events in case of sync issues

5. **Monitor Sync Status**: The "📅 Connected" indicator in person headers shows which calendars are active

---

## 🔒 Security Notes

- **Passwords**: Your calendar credentials are stored securely on the backend
- **Access**: Only you can see and manage your calendar connections
- **Removal**: You can remove calendar connections at any time
- **Updates**: Calendar data is only fetched when needed, not continuously

---

## 📞 Need Help?

If you're still having trouble:
1. Check the troubleshooting sections above
2. Verify your CalDAV URL with your calendar provider
3. Test the connection with a different CalDAV client first
4. Ensure your calendar service supports CalDAV
5. Check that your calendar is not private or restricted 