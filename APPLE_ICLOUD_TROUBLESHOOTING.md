# Apple iCloud Calendar Authorization Troubleshooting

## Error: "AuthorizationError" or "Unauthorized"

If you're getting this error when trying to connect Apple iCloud Calendar:

```
Failed to add calendar: Failed to connect to calendar: Connection failed: AuthorizationError at 'https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Personal', reason Unauthorized
```

## What This Error Means

The **AuthorizationError** means Apple iCloud is rejecting your login credentials. This is almost always due to **Two-Factor Authentication (2FA)** requiring an **App-Specific Password**.

## Why This Happens

- Apple requires **App-Specific Passwords** for CalDAV connections when 2FA is enabled
- Your regular Apple ID password won't work for CalDAV
- This is a security feature to protect your account

## ✅ **Solution: Use App-Specific Password**

### Step 1: Generate App-Specific Password

1. **Go to Apple ID Settings**
   - Visit [appleid.apple.com](https://appleid.apple.com)
   - Sign in with your Apple ID (`Ben_Johnston@outlook.com.au`)

2. **Navigate to Security**
   - Click on "Security" in the left sidebar
   - Find "App-Specific Passwords" section

3. **Generate New Password**
   - Click "Generate Password" or "Create Password"
   - Enter a label like "Family Calendar App"
   - Click "Create"

4. **Copy the Password**
   - Apple will generate a 12-character password
   - **Copy this password immediately** (you won't see it again)
   - It will look like: `abcd-efgh-ijkl`

### Step 2: Use App-Specific Password

1. **In Family Calendar App**
   - Go to Calendar Manager
   - Click "Add Calendar"
   - **Username**: `Ben_Johnston@outlook.com.au`
   - **Password**: Use the App-Specific Password (not your regular password)
   - **CalDAV URL**: `https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Personal`

2. **Test Connection**
   - Click "Add Calendar"
   - Should now connect successfully

## 🚨 **NEW: "Forbidden" Error**

If you're getting this error after using an App-Specific Password:

```
Failed to add calendar: Failed to connect to calendar: Connection failed: AuthorizationError at 'https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Personal', reason Forbidden
```

### What "Forbidden" Means

The **"Forbidden"** error means:
- ✅ Your credentials are correct (password is working)
- ❌ The calendar URL or permissions are wrong
- ❌ The calendar doesn't exist or isn't accessible

### 🔧 **Solutions for "Forbidden" Error**

#### **Solution 1: Get the Correct Calendar URL**

1. **Go to iCloud.com**
   - Visit [iCloud.com](https://icloud.com)
   - Sign in with your Apple ID

2. **Open Calendar**
   - Click on "Calendar" app
   - Look at the left sidebar for your calendar names

3. **Get Calendar Info**
   - Right-click on your calendar name
   - Select "Calendar Info" or "Settings"
   - Look for "Calendar URL" or "CalDAV URL"
   - **Copy the exact URL provided by Apple**

#### **Solution 2: Try Different Calendar Names**

The calendar name "Personal" might not exist. Try these common names:

```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Home
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Default
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Calendar
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Work
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Family
```

#### **Solution 3: Check Calendar Permissions**

1. **In iCloud Calendar**
   - Make sure the calendar is not private
   - Check that it's shared or accessible
   - Ensure you have read/write permissions

#### **Solution 4: Use Principal URL**

Try using the principal URL instead:

```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/
```

Then let the app discover available calendars automatically.

## 🔍 **Alternative Solutions**

### If App-Specific Password Doesn't Work:

#### Option 1: Check Calendar Name
- Make sure the calendar name in the URL is exactly correct
- Try different calendar names:
  - `Personal`
  - `Home`
  - `Default`
  - `Calendar`

#### Option 2: Use Different URL Format
Try these URL variations:
```
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Personal
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Home
https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Default
```

#### Option 3: Get URL from iCloud.com
1. Go to [iCloud.com](https://icloud.com)
2. Sign in with your Apple ID
3. Open Calendar
4. Right-click on your calendar name
5. Select "Calendar Info" or "Settings"
6. Look for "Calendar URL" or "CalDAV URL"
7. Copy the exact URL provided

## 🚨 **Common Issues**

### Issue: "App-Specific Passwords" not showing
**Solution**: You may not have 2FA enabled. Try using your regular Apple ID password.

### Issue: Password still not working
**Solution**: 
1. Make sure you're using the App-Specific Password (12 characters with hyphens)
2. Check that your Apple ID email is correct
3. Ensure the calendar name in the URL matches exactly

### Issue: Calendar not found
**Solution**:
1. Make sure the calendar exists in your iCloud account
2. Try different calendar names
3. Check that the calendar is not private or restricted

## 🧪 **Quick Test**

To verify your setup:
1. **Generate App-Specific Password** (see Step 1 above)
2. **Use exact credentials**:
   - Username: `Ben_Johnston@outlook.com.au`
   - Password: [Your App-Specific Password]
   - URL: `https://caldav.icloud.com/Ben_Johnston@outlook.com.au/calendars/Personal`
3. **Test connection** in Family Calendar app

## 📞 **Still Having Issues?**

If you're still getting authorization errors after using an App-Specific Password:

1. **Check Apple ID Status**: Make sure your Apple ID is active and not locked
2. **Try Different Calendar**: Test with a different calendar name
3. **Contact Apple Support**: If the issue persists, it might be an Apple account issue

## 🔗 **Related Documentation**

- [CALDAV_SETUP.md](CALDAV_SETUP.md) - General CalDAV setup
- [CALENDAR_INTEGRATION_GUIDE.md](CALENDAR_INTEGRATION_GUIDE.md) - Complete integration guide 