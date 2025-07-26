# ONE Calendar - Family Calendar Management System

A modern, full-featured family calendar application that supports both CalDAV and ICAL calendar integration, built with React.js frontend and Flask backend.

## 🌟 Features

### 📅 **Calendar Management**
- **Multi-calendar support** - Connect unlimited calendars
- **CalDAV Integration** - Full CalDAV protocol support for Apple iCloud, Outlook, and custom servers
- **ICAL Integration** - Read-only support for public ICAL/ICS calendar feeds
- **Calendar Wizard** - Easy setup wizard for popular calendar services
- **Calendar Assignment** - Assign calendars to specific family members

### 👨‍👩‍👧‍👦 **Family Management**
- **Up to 6 family members** - Add, edit, and remove family members
- **Color coding** - Each family member gets a unique color
- **Person assignment** - Assign events to specific family members

### 📱 **User Interface**
- **Modern React UI** - Built with TypeScript and Tailwind CSS
- **Touch-friendly** - Optimized for touch screen displays
- **Fullscreen mode** - Auto-enters fullscreen for kiosk displays
- **Date navigation** - Swipe left/right or click to navigate dates
- **Date picker** - Popup calendar for quick date selection

### 🔄 **Data Synchronization**
- **Real-time updates** - Automatic calendar data refresh
- **Manual refresh** - Force refresh button in calendar manager
- **Error handling** - Comprehensive error reporting and debugging
- **Connection testing** - Validates calendar connections before adding

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ONE-Calendar.git
   cd ONE-Calendar
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv backend-venv
   source backend-venv/bin/activate  # On Windows: backend-venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📖 Detailed Guides

### Calendar Integration
- **[Calendar Integration Guide](CALENDAR_INTEGRATION_GUIDE.md)** - Complete setup instructions
- **[CalDAV Wizard Guide](CALDAV_WIZARD_GUIDE.md)** - Using the calendar setup wizard
- **[ICAL Guide](ICAL_GUIDE.md)** - Setting up ICAL calendar feeds

### Troubleshooting
- **[Troubleshooting Guide](TROUBLESHOOTING.md)** - Common issues and solutions
- **[Apple iCloud Setup](APPLE_ICLOUD_TROUBLESHOOTING.md)** - iCloud calendar integration
- **[Google Calendar Setup](GOOGLE_CALENDAR_TROUBLESHOOTING.md)** - Google calendar alternatives
- **[iCloud CalDAV Alternatives](ICLOUD_CALDAV_ALTERNATIVES.md)** - Alternative iCloud setup methods

### Technical Documentation
- **[Launch Guide](LAUNCH_GUIDE.md)** - Production deployment instructions
- **[CalDAV Setup](CALDAV_SETUP.md)** - Technical CalDAV configuration
- **[Webcal to CalDAV Conversion](WEBCAL_TO_CALDAV_CONVERSION.md)** - Understanding calendar protocols

## 🏗️ Architecture

### Frontend (React.js + TypeScript)
- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Touch event handling** for swipe navigation
- **Fullscreen API** integration

### Backend (Flask + Python)
- **Flask** REST API server
- **CalDAV client** using `caldav` library
- **ICAL parser** using `icalendar` library
- **CORS support** for cross-origin requests
- **Error handling** and logging

### Key Components
- **Calendar Manager** - Manage connected calendars
- **CalDAV Wizard** - Guided calendar setup
- **Date Picker** - Date selection interface
- **Event Display** - Calendar event visualization
- **Person Management** - Family member management

## 🔧 Configuration

### Environment Variables
```bash
# Backend configuration
FLASK_ENV=development
FLASK_DEBUG=1
```

### API Endpoints
- `GET /api/events?date=YYYY-MM-DD` - Get events for a specific date
- `GET /api/calendars` - Get list of connected calendars
- `POST /api/calendars` - Add a new calendar
- `DELETE /api/calendars/<id>` - Remove a calendar
- `GET /api/people` - Get list of family members
- `POST /api/people` - Add a new family member

## 🎯 Use Cases

### Family Calendar Management
- **Shared family calendar** - All family events in one place
- **Individual calendars** - Each family member's personal events
- **Color-coded events** - Easy visual identification
- **Touch-screen friendly** - Perfect for wall-mounted displays

### Business/Office Use
- **Team calendar** - Multiple team member calendars
- **Resource scheduling** - Room and equipment booking
- **Kiosk mode** - Public display of schedules
- **Multi-location support** - Different calendars for different locations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CalDAV Protocol** - For calendar synchronization standards
- **ICAL Format** - For calendar data exchange
- **React Community** - For the amazing frontend framework
- **Flask Community** - For the lightweight backend framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Review the relevant setup guides
3. Open an issue on GitHub
4. Check the console logs for debugging information

---

**Made with ❤️ for families and teams who need better calendar management** 