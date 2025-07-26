# Changelog

All notable changes to the ONE Calendar project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- **Complete Calendar Management System**
  - Multi-calendar support with unlimited calendar connections
  - CalDAV protocol integration for Apple iCloud, Outlook, and custom servers
  - ICAL/ICS calendar feed support for read-only public calendars
  - Calendar assignment to specific family members
  - Calendar enable/disable functionality

- **CalDAV Wizard System**
  - Guided setup wizard for popular calendar services
  - Support for iCloud, Outlook, Fruux, and custom CalDAV servers
  - ICAL calendar URL integration
  - Automatic URL construction for supported services
  - Connection testing before adding calendars

- **Family Management System**
  - Add, edit, and remove family members (up to 6)
  - Color coding for each family member
  - Person assignment for calendar events
  - Real-time person management

- **Modern User Interface**
  - React.js frontend with TypeScript
  - Tailwind CSS for modern styling
  - Touch-friendly interface optimized for touch screens
  - Fullscreen mode with auto-enter functionality
  - Responsive design for various screen sizes

- **Date Navigation System**
  - Swipe left/right to navigate between dates
  - Date picker popup for quick date selection
  - Current date display and formatting
  - Calendar day generation and display

- **Event Management**
  - Real-time event fetching from connected calendars
  - Event display with time-based positioning
  - Event filtering by date and person
  - Automatic event refresh and manual refresh options

- **Backend API System**
  - Flask REST API with comprehensive endpoints
  - CalDAV client integration using `caldav` library
  - ICAL parser using `icalendar` library
  - CORS support for cross-origin requests
  - Error handling and logging

- **Debugging and Monitoring**
  - Comprehensive console logging for frontend and backend
  - Error tracking and reporting
  - Connection testing and validation
  - Manual refresh functionality for troubleshooting

### Technical Features
- **Frontend Technologies**
  - React 18 with functional components and hooks
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Touch event handling for mobile/tablet support
  - Fullscreen API integration

- **Backend Technologies**
  - Flask web framework
  - Python 3.8+ compatibility
  - CalDAV protocol support
  - ICAL format parsing
  - RESTful API design

- **Development Tools**
  - ESLint for code quality
  - npm build system
  - Virtual environment management
  - Comprehensive documentation

### Documentation
- **Setup Guides**
  - [Calendar Integration Guide](CALENDAR_INTEGRATION_GUIDE.md)
  - [CalDAV Wizard Guide](CALDAV_WIZARD_GUIDE.md)
  - [ICAL Guide](ICAL_GUIDE.md)
  - [Launch Guide](LAUNCH_GUIDE.md)

- **Troubleshooting Guides**
  - [Troubleshooting Guide](TROUBLESHOOTING.md)
  - [Apple iCloud Setup](APPLE_ICLOUD_TROUBLESHOOTING.md)
  - [Google Calendar Setup](GOOGLE_CALENDAR_TROUBLESHOOTING.md)
  - [iCloud CalDAV Alternatives](ICLOUD_CALDAV_ALTERNATIVES.md)

- **Technical Documentation**
  - [CalDAV Setup](CALDAV_SETUP.md)
  - [Webcal to CalDAV Conversion](WEBCAL_TO_CALDAV_CONVERSION.md)

### API Endpoints
- `GET /api/events?date=YYYY-MM-DD` - Get events for a specific date
- `GET /api/calendars` - Get list of connected calendars
- `POST /api/calendars` - Add a new calendar
- `DELETE /api/calendars/<id>` - Remove a calendar
- `POST /api/calendars/<id>/toggle` - Toggle calendar enable/disable
- `POST /api/calendars/<id>/assign` - Assign calendar to person
- `GET /api/people` - Get list of family members
- `POST /api/people` - Add a new family member
- `DELETE /api/people/<name>` - Remove a family member
- `PUT /api/people/<name>` - Update a family member

### Use Cases
- **Family Calendar Management**
  - Shared family calendar with individual member calendars
  - Color-coded events for easy identification
  - Touch-screen friendly for wall-mounted displays

- **Business/Office Use**
  - Team calendar management
  - Resource scheduling
  - Kiosk mode for public displays
  - Multi-location support

### Security Features
- **Calendar Authentication**
  - Secure password handling for CalDAV connections
  - App-specific password support for Apple iCloud
  - Connection validation before adding calendars

- **Data Protection**
  - Local data storage (no external data persistence)
  - Secure API communication
  - Error handling without exposing sensitive information

### Performance Features
- **Optimization**
  - Efficient event fetching and caching
  - Minimal API calls with smart refresh
  - Responsive UI with smooth animations
  - Touch-optimized interactions

### Accessibility
- **User Experience**
  - Touch-friendly interface
  - Clear visual hierarchy
  - Intuitive navigation
  - Comprehensive error messages

---

## [Unreleased]

### Planned Features
- Recurring event support
- Event creation and editing
- Calendar sharing between users
- Mobile app version
- Advanced filtering and search
- Calendar export functionality
- Multi-language support
- Dark mode theme
- Calendar templates
- Advanced scheduling features

### Known Issues
- Google Calendar requires manual CalDAV setup
- Some iCloud accounts may require app-specific passwords
- ICAL calendars are read-only
- Limited to 6 family members maximum

---

**For detailed information about each feature, please refer to the individual documentation files in the project repository.** 