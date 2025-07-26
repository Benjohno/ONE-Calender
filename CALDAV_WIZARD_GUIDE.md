# 🧙‍♂️ CalDAV Wizard Guide

## What is the CalDAV Wizard?

The CalDAV Wizard is a user-friendly tool that guides you through connecting your calendars to the Family Calendar app. Instead of manually figuring out CalDAV URLs and settings, the wizard handles the technical details for you!

## 🚀 How to Access the Wizard

1. **Open Calendar Manager**
   - Click "📅 Manage Calendars" in the date navigation section
   - Or go to Settings → Calendar Management

2. **Click the Wizard Button**
   - Look for the "🧙‍♂️ CalDAV Wizard" button in the Calendar Manager
   - Click it to start the guided setup process

## 📋 Step-by-Step Process

### Step 1: Choose Your Calendar Service

The wizard offers 4 options:

#### 🍎 **Apple iCloud Calendar**
- **Best for**: iPhone/iPad users with iCloud
- **What you need**: Apple ID and password (or App-Specific Password if you have 2FA)
- **What it does**: Automatically constructs the correct iCloud CalDAV URL
- **Example**: `your.email@icloud.com` → `https://caldav.icloud.com/your.email@icloud.com/`

#### 📧 **Microsoft Outlook**
- **Best for**: Outlook.com users
- **What you need**: Outlook.com email and password
- **What it does**: Connects to your Outlook.com calendar
- **Example**: `your.email@outlook.com` → `https://outlook.office365.com/owa/your.email@outlook.com/calendar/`

#### 🔄 **Fruux (Google Calendar Sync)**
- **Best for**: Google Calendar users (since Google doesn't support CalDAV directly)
- **What you need**: Fruux account (free at fruux.com)
- **What it does**: Syncs your Google Calendar through Fruux's CalDAV service
- **Setup**: Sign up at fruux.com, connect your Google Calendar, then use your Fruux credentials

#### ⚙️ **Custom CalDAV Server**
- **Best for**: Advanced users with their own CalDAV servers
- **What you need**: CalDAV server URL, username, and password
- **What it does**: Connects to any CalDAV-compatible server

### Step 2: Configure Your Calendar

Fill in the required information:

- **Calendar Name**: A friendly name for your calendar (e.g., "Work Calendar", "Personal Events")
- **Username/Email**: Your account credentials for the selected service
- **Password**: Your account password (use App-Specific Password for iCloud with 2FA)
- **Assign to Person**: (Optional) Choose which person this calendar belongs to

### Step 3: Connect and Test

- **Review**: Check the connection summary
- **Connect**: Click "Connect Calendar" to test the connection
- **Success**: If successful, your calendar will appear in the Calendar Manager

## 🎯 **Recommended Setup for Your iCloud Calendar**

Since you're having issues with the manual iCloud connection, try this:

1. **Choose "Apple iCloud Calendar"**
2. **Calendar Name**: "Personal Calendar"
3. **Apple ID**: `Ben_Johnston@outlook.com.au`
4. **Password**: Your App-Specific Password (not your regular Apple ID password)
5. **Assign to Person**: Choose one of your family members

## 🔧 **Troubleshooting Common Issues**

### ❌ "Unauthorized" Error (iCloud)
- **Solution**: Use an App-Specific Password instead of your regular password
- **How to get one**: Go to appleid.apple.com → Security → App-Specific Passwords

### ❌ "Forbidden" Error (iCloud)
- **Solution**: The wizard will try the principal URL approach automatically
- **Alternative**: Try different calendar names (Home, Default, Calendar)

### ❌ "Connection Failed" (Any Service)
- **Check**: Verify your username and password
- **Try**: Test the connection in a different app first
- **Contact**: Check if the service is working properly

## 🆚 **Wizard vs Manual Setup**

| Feature | Wizard | Manual |
|---------|--------|--------|
| **Ease of Use** | ✅ Guided steps | ❌ Technical knowledge required |
| **URL Generation** | ✅ Automatic | ❌ Manual entry |
| **Error Handling** | ✅ Built-in help | ❌ Trial and error |
| **Service Support** | ✅ Pre-configured | ✅ Any CalDAV server |
| **Setup Speed** | ✅ 2-3 minutes | ❌ 10-30 minutes |

## 🎉 **Benefits of Using the Wizard**

1. **No Technical Knowledge Required**: Just follow the guided steps
2. **Automatic URL Construction**: No need to figure out CalDAV URLs
3. **Built-in Help**: Contextual tips for each service
4. **Error Prevention**: Validates inputs before connecting
5. **Service-Specific Guidance**: Tailored instructions for each calendar service

## 🚀 **Quick Start**

1. **Open Calendar Manager**
2. **Click "🧙‍♂️ CalDAV Wizard"**
3. **Choose "Apple iCloud Calendar"**
4. **Enter your Apple ID and App-Specific Password**
5. **Click "Connect Calendar"**

That's it! Your calendar should now be connected and syncing with the Family Calendar app. 🎯

## 📞 **Need Help?**

If the wizard doesn't work for your specific setup:
1. **Try the manual "Add Calendar" option**
2. **Check the troubleshooting guides** for your specific service
3. **Use a different calendar service** (Fruux works well for Google Calendar users)

The CalDAV Wizard makes calendar setup as easy as possible - no more guessing URLs or dealing with technical CalDAV details! 🧙‍♂️✨ 