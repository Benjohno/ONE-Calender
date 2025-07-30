import React, { useEffect, useState, useRef, useCallback } from 'react';

const API_URL = 'http://localhost:5001/api';

// Add Calendar Component - Extracted outside to prevent re-renders
interface AddCalendarProps {
  newCalendar: {
    name: string;
    url: string;
    username: string;
    password: string;
    assigned_person: string;
  };
  setNewCalendar: (calendar: any) => void;
  people: string[];
  loading: boolean;
  addCalendar: () => void;
  setShowAddCalendar: (show: boolean) => void;
}

const AddCalendarComponent: React.FC<AddCalendarProps> = React.memo(({
  newCalendar,
  setNewCalendar,
  people,
  loading,
  addCalendar,
  setShowAddCalendar
}) => {
  const handleInputChange = useCallback((field: string, value: string) => {
    setNewCalendar(prev => ({ ...prev, [field]: value }));
  }, [setNewCalendar]);

  const handleCancel = useCallback(() => {
    setNewCalendar({ name: '', url: '', username: '', password: '', assigned_person: '' });
    setShowAddCalendar(false);
  }, [setNewCalendar, setShowAddCalendar]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('name', e.target.value);
  }, [handleInputChange]);

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('url', e.target.value);
  }, [handleInputChange]);

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('username', e.target.value);
  }, [handleInputChange]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('password', e.target.value);
  }, [handleInputChange]);

  const handlePersonChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    handleInputChange('assigned_person', e.target.value);
  }, [handleInputChange]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add CalDAV Calendar</h2>
          <button 
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calendar Name *</label>
            <input
              type="text"
              value={newCalendar.name}
              onChange={handleNameChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="My Calendar"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CalDAV URL *</label>
            <input
              type="url"
              value={newCalendar.url}
              onChange={handleUrlChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://calendar.example.com/caldav"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
            <input
              type="text"
              value={newCalendar.username}
              onChange={handleUsernameChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your-username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input
              type="password"
              value={newCalendar.password}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your-password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Person (Optional)</label>
            <select
              value={newCalendar.assigned_person}
              onChange={handlePersonChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Not assigned</option>
              {people.map(person => (
                <option key={person} value={person}>{person}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            onClick={addCalendar}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Add Calendar'}
          </button>
        </div>
      </div>
    </div>
  );
});

AddCalendarComponent.displayName = 'AddCalendarComponent';

// Add Person Popup Component - Extracted outside to prevent re-renders


// Add Person with Calendar Form Component
const AddPersonWithCalendarForm: React.FC<{
  newPersonName: string;
  setNewPersonName: (name: string) => void;
  addPersonWithCalendar: (personName: string, calendarData: any) => void;
  setShowAddPerson: (show: boolean) => void;
}> = React.memo(({
  newPersonName,
  setNewPersonName,
  addPersonWithCalendar,
  setShowAddPerson
}) => {
  const [calendarName, setCalendarName] = useState('');
  const [calendarUrl, setCalendarUrl] = useState('');
  const [calendarType, setCalendarType] = useState('ical');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = useCallback(() => {
    setShowAddPerson(false);
    setNewPersonName('');
    setCalendarName('');
    setCalendarUrl('');
    setCalendarType('ical');
    setError('');
  }, [setShowAddPerson, setNewPersonName]);

  const handleSubmit = useCallback(async () => {
    if (!newPersonName.trim()) {
      setError('Please enter a person name');
      return;
    }
    if (!calendarName.trim()) {
      setError('Please enter a calendar name');
      return;
    }
    if (!calendarUrl.trim()) {
      setError('Please enter a calendar URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const calendarData = {
        name: calendarName,
        url: calendarUrl,
        username: calendarType === 'ical' ? 'ical-user' : '',
        password: '',
        assigned_person: newPersonName,
        type: calendarType
      };

      await addPersonWithCalendar(newPersonName, calendarData);
      handleCancel();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add person and calendar');
    } finally {
      setLoading(false);
    }
  }, [newPersonName, calendarName, calendarUrl, calendarType, addPersonWithCalendar, handleCancel]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-800">Add Family Member with Calendar</h3>
        <button 
          onClick={handleCancel}
          className="text-blue-600 hover:text-blue-800 text-xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Person Name *</label>
          <input
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter person name"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calendar Type *</label>
          <select
            value={calendarType}
            onChange={(e) => setCalendarType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ical">ICAL Calendar (Public URL)</option>
            <option value="caldav">CalDAV Calendar (Private)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Calendar Name *</label>
          <input
            type="text"
            value={calendarName}
            onChange={(e) => setCalendarName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Work Calendar, Personal Calendar"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {calendarType === 'ical' ? 'ICAL URL *' : 'CalDAV URL *'}
          </label>
          <input
            type="text"
            value={calendarUrl}
            onChange={(e) => setCalendarUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={calendarType === 'ical' ? 'https://calendar.google.com/.../basic.ics' : 'https://caldav.icloud.com/...'}
            onKeyPress={handleKeyPress}
          />
          <p className="text-xs text-gray-500 mt-1">
            {calendarType === 'ical' 
              ? 'Public ICAL/ICS calendar URL (ends with .ics)'
              : 'CalDAV server URL with username/password'
            }
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button 
          onClick={handleCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          disabled={loading}
        >
          Cancel
        </button>
        <button 
          onClick={handleSubmit}
          disabled={loading || !newPersonName.trim() || !calendarName.trim() || !calendarUrl.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Person & Calendar'}
        </button>
      </div>
    </div>
  );
});

AddPersonWithCalendarForm.displayName = 'AddPersonWithCalendarForm';

interface Event {
  id: number | string;
  title: string;
  start: string;
  end: string;
  person: string;
  calendar_id?: string;
}

interface Calendar {
  id: string;
  name: string;
  url: string;
  username: string;
  enabled: boolean;
  assigned_person: string;
  type?: string;
}

// CalDAV Wizard Component
interface CalDAVWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCalendar: (calendar: any) => void;
  people: string[];
}

const CalDAVWizardComponent = React.memo(({ isOpen, onClose, onAddCalendar, people }: CalDAVWizardProps) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [calendarName, setCalendarName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customUsername, setCustomUsername] = useState('');
  const [assignedPerson, setAssignedPerson] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Debug: Log people when component receives them
  useEffect(() => {
    console.log('CalDAV Wizard received people:', people);
  }, [people]);

  const services = [
    {
      id: 'ical',
      name: 'ICAL Calendar Link',
      icon: '📅',
      description: 'Connect using a public ICAL/ICS calendar URL',
      url: '',
      helpText: 'Use a public calendar URL (ends with .ics or webcal://)'
    },
    {
      id: 'icloud',
      name: 'Apple iCloud Calendar',
      icon: '🍎',
      description: 'Connect to your Apple iCloud calendar',
      url: 'https://caldav.icloud.com/',
      helpText: 'Use your Apple ID and App-Specific Password (if you have 2FA enabled)'
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      icon: '📧',
      description: 'Connect to your Outlook.com calendar',
      url: 'https://outlook.office365.com/owa/',
      helpText: 'Use your Outlook.com email and password'
    },
    {
      id: 'fruux',
      name: 'Fruux (Google Calendar Sync)',
      icon: '🔄',
      description: 'Sync with Google Calendar via Fruux',
      url: 'https://dav.fruux.com/',
      helpText: 'Sign up at fruux.com and connect your Google Calendar'
    },
    {
      id: 'custom',
      name: 'Custom CalDAV Server',
      icon: '⚙️',
      description: 'Connect to any CalDAV server',
      url: '',
      helpText: 'Enter your own CalDAV server URL'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset form when opening
      setStep(1);
      setSelectedService('');
      setCalendarName('');
      setUsername('');
      setPassword('');
      setCustomUrl('');
      setCustomUsername('');
      setAssignedPerson('');
      setError('');
      console.log('CalDAV Wizard opened with people:', people);
    }
  }, [isOpen, people]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setStep(2);
    setError('');
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const handleNext = () => {
    if (step === 2) {
      console.log('Validation check:', {
        calendarName: calendarName.trim(),
        username: username.trim(),
        password: password.trim(),
        customUrl: customUrl.trim(),
        customUsername: customUsername.trim(),
        selectedService
      });
      
      // Different validation for different services
      if (!calendarName.trim()) {
        setError('Please enter a calendar name');
        return;
      }
      
      if (selectedService === 'ical') {
        // For ICAL, only need the URL
        if (!username.trim()) {
          setError('Please enter the ICAL calendar URL');
          return;
        }
      } else if (selectedService === 'custom') {
        // For custom, check custom URL and username
        if (!customUrl.trim()) {
          setError('Please enter the CalDAV URL');
          return;
        }
        if (!customUsername.trim()) {
          setError('Please enter the username');
          return;
        }
        if (!password.trim()) {
          setError('Please enter the password');
          return;
        }
      } else {
        // For other services, username field contains username/email
        if (!username.trim()) {
          setError('Please enter your username/email');
          return;
        }
        if (!password.trim()) {
          setError('Please enter your password');
          return;
        }
      }
      
      setStep(3);
      setError('');
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    setError('');

    try {
      let caldavUrl = '';
      let calendarUsername = username;

      if (selectedService === 'ical') {
        // For ICAL, use the URL directly and set a placeholder username
        caldavUrl = username;
        calendarUsername = 'ical-user';
      } else if (selectedService === 'custom') {
        // For custom, use the custom URL and username
        caldavUrl = customUrl;
        calendarUsername = customUsername;
      } else if (selectedService === 'icloud') {
        // For iCloud, construct the URL with the Apple ID
        caldavUrl = `https://caldav.icloud.com/${username}/`;
        calendarUsername = username;
      } else if (selectedService === 'outlook') {
        // For Outlook, construct the URL with the email
        caldavUrl = `https://outlook.office365.com/owa/${username}/calendar/`;
        calendarUsername = username;
      } else if (selectedService === 'fruux') {
        // For Fruux, use their standard URL
        caldavUrl = 'https://dav.fruux.com/';
        calendarUsername = username;
      }

      console.log('Calendar data being sent:', {
        name: calendarName,
        url: caldavUrl,
        username: calendarUsername,
        password: selectedService === 'ical' ? '' : '***',
        assigned_person: assignedPerson,
        type: selectedService
      });

      const calendarData = {
        name: calendarName,
        url: caldavUrl,
        username: calendarUsername,
        password: selectedService === 'ical' ? '' : password,
        assigned_person: assignedPerson,
        type: selectedService
      };

      console.log('About to call onAddCalendar with:', calendarData);
      await onAddCalendar(calendarData);
      console.log('onAddCalendar completed successfully');
      handleClose();
    } catch (error) {
      console.error('Error in handleConnect:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect calendar');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedService('');
    setCalendarName('');
    setUsername('');
    setPassword('');
    setCustomUrl('');
    setCustomUsername('');
    setAssignedPerson('');
    setError('');
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📅 CalDAV Connection Wizard</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Your Calendar Service</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Configure Your Calendar</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calendar Name *
                </label>
                <input
                  type="text"
                  value={calendarName}
                  onChange={(e) => setCalendarName(e.target.value)}
                  placeholder="e.g., Personal Calendar"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {selectedService === 'ical' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ICAL Calendar URL *
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="https://calendar.google.com/calendar/ical/.../basic.ics"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a public calendar URL that ends with .ics or starts with webcal://
                  </p>
                </div>
              )}

              {selectedService === 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CalDAV URL *
                    </label>
                    <input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="https://your-caldav-server.com/"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      value={customUsername}
                      onChange={(e) => setCustomUsername(e.target.value)}
                      placeholder="your-username"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {selectedService !== 'ical' && selectedService !== 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedService === 'icloud' ? 'Apple ID' : 
                     selectedService === 'outlook' ? 'Outlook Email' :
                     selectedService === 'fruux' ? 'Fruux Username' : 'Username'} *
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={selectedService === 'icloud' ? 'your.email@icloud.com' :
                                selectedService === 'outlook' ? 'your.email@outlook.com' :
                                selectedService === 'fruux' ? 'your-fruux-username' : 'username'}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {selectedService !== 'ical' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedService === 'icloud' && 'Use App-Specific Password if you have 2FA enabled'}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Person (Optional)
                </label>
                <select
                  value={assignedPerson}
                  onChange={(e) => setAssignedPerson(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No assignment</option>
                  {people && people.length > 0 ? (
                    people.map((person) => (
                      <option key={person} value={person}>{person}</option>
                    ))
                  ) : (
                    <>
                      <option value="Ben">Ben</option>
                      <option value="PERSON 2">PERSON 2</option>
                      <option value="PERSON 3">PERSON 3</option>
                    </>
                  )}
                </select>
                {people && people.length === 0 && (
                  <p className="text-xs text-blue-500 mt-1">
                    Using default people. Add more people in Settings.
                  </p>
                )}
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> {services.find(s => s.id === selectedService)?.helpText}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Connect */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect Your Calendar</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Connection Summary:</h4>
              <div className="text-sm space-y-1">
                <div><strong>Service:</strong> {services.find(s => s.id === selectedService)?.name}</div>
                <div><strong>Calendar:</strong> {calendarName}</div>
                <div><strong>Username:</strong> 
                {username}
                </div>
                {assignedPerson && <div><strong>Assigned to:</strong> {assignedPerson}</div>}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Click "Connect" to test the connection and add your calendar to the Family Calendar app.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">❌ {error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connecting...' : 'Connect Calendar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentView, setCurrentView] = useState<'DAY' | 'WEEK' | 'MONTH'>('DAY');
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [showCalendarManager, setShowCalendarManager] = useState(false);
  const [showAddCalendar, setShowAddCalendar] = useState(false);
  const [newCalendar, setNewCalendar] = useState({
    name: '',
    url: '',
    username: '',
    password: '',
    assigned_person: ''
  });
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<string[]>([]);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
  const [editingPerson, setEditingPerson] = useState<string | null>(null);
  const [editPersonName, setEditPersonName] = useState('');
  const calendarRef = useRef<HTMLDivElement>(null);
  const [personColors, setPersonColors] = useState<{[key: string]: string}>({});
  const [showCalDAVWizard, setShowCalDAVWizard] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true); // default ON
  const REFRESH_INTERVAL = 30000; // 30 seconds

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - go to next day
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(nextDate);
    }
    
    if (isRightSwipe) {
      // Swipe right - go to previous day
      const prevDate = new Date(currentDate);
      prevDate.setDate(currentDate.getDate() - 1);
      setCurrentDate(prevDate);
    }
  };

  const navigateToDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const selectDate = (date: Date) => {
    setCurrentDate(date);
    setShowDatePicker(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const generateCalendarDays = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  // Fetch events for the current date
  const fetchEvents = async (date: Date) => {
    try {
      const dateStr = date.toISOString().split('T')[0];
      console.log('Fetching events for date:', dateStr);
      const response = await fetch(`${API_URL}/events?date=${dateStr}`);
      const data = await response.json();
      console.log('Events received:', data);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch connected calendars
  const fetchCalendars = async () => {
    try {
      const response = await fetch(`${API_URL}/calendars`);
      const data = await response.json();
      setCalendars(data);
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  // Fetch available people
  const fetchPeople = async () => {
    try {
      console.log('Fetching people from:', `${API_URL}/people`);
      const response = await fetch(`${API_URL}/people`);
      console.log('People response status:', response.status);
      const data = await response.json();
      console.log('People data:', data);
      // Handle both array format and object format
      const peopleArray = Array.isArray(data) ? data : (data.people || []);
      setPeople(peopleArray);
      console.log('People set to:', peopleArray);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  // Add new calendar from wizard
  const addCalendarFromWizard = async (calendarData: any) => {
    console.log('addCalendarFromWizard called with:', calendarData);
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/calendars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calendarData),
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const calendar = await response.json();
        console.log('Calendar added successfully:', calendar);
        setCalendars(prev => [...prev, calendar]);
        // Refresh events after adding calendar
        await fetchEvents(currentDate);
        await fetchCalendars(); // Refresh calendar list
        return calendar;
      } else {
        const error = await response.json();
        console.error('Failed to add calendar:', error);
        throw new Error(error.error || 'Failed to add calendar');
      }
    } catch (error) {
      console.error('Error adding calendar:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add new calendar (for manual form)
  const addCalendar = async () => {
    if (!newCalendar.name || !newCalendar.url || !newCalendar.username || !newCalendar.password) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/calendars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCalendar),
      });

      if (response.ok) {
        const calendar = await response.json();
        setCalendars(prev => [...prev, calendar]);
        setNewCalendar({ name: '', url: '', username: '', password: '', assigned_person: '' });
        setShowAddCalendar(false);
        // Refresh events after adding calendar
        await fetchEvents(currentDate);
        await fetchCalendars(); // Refresh calendar list
      } else {
        const error = await response.json();
        alert(`Failed to add calendar: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding calendar:', error);
      alert('Error adding calendar');
    } finally {
      setLoading(false);
    }
  };

  // Remove calendar
  const removeCalendar = async (calendarId: string) => {
    try {
      const response = await fetch(`${API_URL}/calendars/${calendarId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCalendars(prev => prev.filter(cal => cal.id !== calendarId));
        // Refresh events after removing calendar
        await fetchEvents(currentDate);
      }
    } catch (error) {
      console.error('Error removing calendar:', error);
      alert('Error removing calendar');
    }
  };

  // Toggle calendar
  const toggleCalendar = async (calendarId: string) => {
    try {
      const response = await fetch(`${API_URL}/calendars/${calendarId}/toggle`, {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        setCalendars(prev => prev.map(cal => 
          cal.id === calendarId ? { ...cal, enabled: result.enabled } : cal
        ));
        // Refresh events after toggling calendar
        await fetchEvents(currentDate);
      }
    } catch (error) {
      console.error('Error toggling calendar:', error);
      alert('Error toggling calendar');
    }
  };

  // Assign calendar to person
  const assignCalendarToPerson = async (calendarId: string, person: string) => {
    try {
      const response = await fetch(`${API_URL}/calendars/${calendarId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ person }),
      });

      if (response.ok) {
        const result = await response.json();
        setCalendars(prev => prev.map(cal => 
          cal.id === calendarId ? { ...cal, assigned_person: result.assigned_person } : cal
        ));
        // Refresh events after assigning calendar
        await fetchEvents(currentDate);
      }
    } catch (error) {
      console.error('Error assigning calendar to person:', error);
      alert('Error assigning calendar to person');
    }
  };

  // Add person with calendar
  const addPersonWithCalendar = async (personName: string, calendarData: any) => {
    try {
      // First add the person
      console.log('Adding person:', personName);
      const personResponse = await fetch(`${API_URL}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: personName }),
      });

      if (!personResponse.ok) {
        const errorData = await personResponse.json();
        throw new Error(errorData.error || 'Failed to add person');
      }

      const personData = await personResponse.json();
      console.log('Person added successfully:', personData);

      // Then add the calendar
      console.log('Adding calendar:', calendarData);
      const calendarResponse = await fetch(`${API_URL}/calendars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calendarData),
      });

      if (!calendarResponse.ok) {
        const errorData = await calendarResponse.json();
        throw new Error(errorData.error || 'Failed to add calendar');
      }

      const calendarDataResponse = await calendarResponse.json();
      console.log('Calendar added successfully:', calendarDataResponse);

      // Update state
      setPeople(prev => [...prev, personData.name]);
      setCalendars(prev => [...prev, calendarDataResponse]);
      
      // Set a default color for the new person
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
      const colorIndex = people.length % colors.length;
      setPersonColors(prev => ({
        ...prev,
        [personData.name]: colors[colorIndex]
      }));

      // Refresh data
      await fetchEvents(currentDate);
      await fetchCalendars();
      
      console.log('Person and calendar added successfully');
    } catch (error) {
      console.error('Error adding person and calendar:', error);
      throw error;
    }
  };

  // Remove person
  const removePerson = async (personName: string) => {
    if (!window.confirm(`Are you sure you want to remove ${personName}? This will unassign any calendars assigned to them.`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/people/${encodeURIComponent(personName)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPeople(prev => prev.filter(p => p !== personName));
        // Refresh calendars to update person assignments
        await fetchCalendars();
        // Refresh events
        await fetchEvents(currentDate);
      }
    } catch (error) {
      console.error('Error removing person:', error);
      alert('Error removing person');
    }
  };

  // Update person name
  const updatePerson = async (oldName: string, newName: string) => {
    if (!newName.trim()) {
      alert('Please enter a person name');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/people/${encodeURIComponent(oldName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName.trim() }),
      });

      if (response.ok) {
        const result = await response.json();
        setPeople(prev => prev.map(p => p === oldName ? result.new_name : p));
        setEditingPerson(null);
        setEditPersonName('');
        // Refresh calendars to update person assignments
        await fetchCalendars();
        // Refresh events
        await fetchEvents(currentDate);
      } else {
        const error = await response.json();
        alert(`Failed to update person: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating person:', error);
      alert('Error updating person');
    }
  };

  // Start editing person
  const startEditPerson = (personName: string) => {
    setEditingPerson(personName);
    setEditPersonName(personName);
  };

  // Cancel editing person
  const cancelEditPerson = () => {
    setEditingPerson(null);
    setEditPersonName('');
  };

  useEffect(() => {
    fetchEvents(currentDate);
    fetchCalendars();
    fetchPeople();
  }, [currentDate]);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchEvents(currentDate);
      fetchCalendars();
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [autoRefresh, currentDate]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventPosition = (event: Event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const startHour = start.getHours() + start.getMinutes() / 60;
    const endHour = end.getHours() + end.getMinutes() / 60;
    const duration = endHour - startHour;
    
    // Calculate position based on full calendar height minus header and footer
    const calendarHeight = 1920 - 120 - 80; // Total height minus header (120px) and footer (80px)
    const hourHeight = calendarHeight / 24;
    
    return {
      top: `${startHour * hourHeight}px`,
      height: `${duration * hourHeight}px`,
    };
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log('Error attempting to enable fullscreen:', err);
      });
    } else {
      // Exit fullscreen
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.log('Error attempting to exit fullscreen:', err);
      });
    }
  };

  // Auto-enter fullscreen on component mount (for touch screen displays)
  useEffect(() => {
    const enterFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.log('Auto-fullscreen failed:', err);
        });
      }
    };

    // Try to enter fullscreen after a short delay
    const timer = setTimeout(enterFullscreen, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const updatePersonColor = (person: string, color: string) => {
    setPersonColors(prev => ({
      ...prev,
      [person]: color
    }));
  };



  // Calendar Manager Component
  const CalendarManager = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[900px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Calendar Manager</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowCalDAVWizard(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              🧙‍♂️ CalDAV Wizard
            </button>
            <button 
              onClick={async () => {
                await fetchEvents(currentDate);
                await fetchCalendars();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              🔄 Refresh Data
            </button>
            <button 
              onClick={() => setShowCalendarManager(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Connected Calendars */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Connected Calendars</h3>
          {calendars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">No calendars connected yet.</p>
              <p className="text-sm">Use the CalDAV Wizard to easily connect your calendars!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {calendars.map(calendar => (
                <div key={calendar.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${calendar.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <div>
                      <div className="font-medium">{calendar.name}</div>
                      <div className="text-sm text-gray-600">{calendar.url}</div>
                      <div className="text-sm text-gray-500">
                        Type: {calendar.type || 'caldav'} • Assigned to: {calendar.assigned_person || 'Not assigned'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={calendar.assigned_person || ''}
                      onChange={(e) => assignCalendarToPerson(calendar.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Not assigned</option>
                      {people.map(person => (
                        <option key={person} value={person}>{person}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => toggleCalendar(calendar.id)}
                      className={`px-3 py-1 rounded text-sm ${calendar.enabled ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                      {calendar.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button 
                      onClick={() => removeCalendar(calendar.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Calendar Button */}
        <div className="flex justify-end">
          <button 
            onClick={() => setShowAddCalendar(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            + Add Calendar (Manual)
          </button>
        </div>
      </div>
    </div>
  );



  // Date Picker Component
  const DatePicker = () => {
    const [pickerDate, setPickerDate] = useState(currentDate);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Select Date</h2>
            <button 
              onClick={() => setShowDatePicker(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => {
                  const newDate = new Date(pickerDate);
                  newDate.setMonth(pickerDate.getMonth() - 1);
                  setPickerDate(newDate);
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <h3 className="text-lg font-semibold">
                {pickerDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button 
                onClick={() => {
                  const newDate = new Date(pickerDate);
                  newDate.setMonth(pickerDate.getMonth() + 1);
                  setPickerDate(newDate);
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays(pickerDate).map((date, index) => {
              const isCurrentMonth = date.getMonth() === pickerDate.getMonth();
              const isSelected = date.toDateString() === currentDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={index}
                  onClick={() => selectDate(date)}
                  className={`
                    p-2 text-sm rounded transition-colors
                    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                    ${isToday && !isSelected ? 'bg-blue-100 text-blue-600' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button 
              onClick={() => setShowDatePicker(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setCurrentDate(new Date());
                setShowDatePicker(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Today
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Settings Page Component
  const SettingsPage = () => (
    <div className="w-[1080px] h-[1920px] bg-white font-sans overflow-hidden mx-auto">
      {/* Settings Header */}
      <header className="p-6 bg-gray-50 border-b border-gray-200 h-[120px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setShowSettings(false)}
              className="text-2xl font-medium px-6 py-3 rounded-lg transition-colors text-gray-600 hover:text-gray-800 hover:bg-white"
            >
              ← Back to Calendar
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
        </div>
      </header>

      {/* Settings Content */}
      <div className="p-8 h-[1800px] overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Family Members Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Family Members</h2>
              {!showAddPerson && (
                <button 
                  onClick={() => setShowAddPerson(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Add Person & Calendar
                </button>
              )}
            </div>
            
            {/* Add Person with Calendar Form (inline) */}
            {showAddPerson && (
              <AddPersonWithCalendarForm
                newPersonName={newPersonName}
                setNewPersonName={setNewPersonName}
                addPersonWithCalendar={addPersonWithCalendar}
                setShowAddPerson={setShowAddPerson}
              />
            )}
            
            <div className="space-y-4">
              {people.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No family members added yet. Click "Add Person" to get started.</p>
              ) : (
                people.map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: personColors[person] || '#6b7280' }}
                      ></div>
                      {editingPerson === person ? (
                        <input
                          type="text"
                          value={editPersonName}
                          onChange={(e) => setEditPersonName(e.target.value)}
                          className="text-lg text-gray-700 border border-gray-300 rounded px-2 py-1"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              updatePerson(person, editPersonName);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              cancelEditPerson();
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <span className="text-lg text-gray-700">{person}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="color"
                        value={personColors[person] || '#6b7280'}
                        onChange={(e) => updatePersonColor(person, e.target.value)}
                        className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                        title={`Choose color for ${person}`}
                      />
                      <div className="flex space-x-2">
                        {editingPerson === person ? (
                          <>
                            <button 
                              onClick={() => updatePerson(person, editPersonName)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Save
                            </button>
                            <button 
                              onClick={cancelEditPerson}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => startEditPerson(person)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => removePerson(person)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* Display Settings Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Display Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700">Show 24-hour format</span>
                <button className="w-16 h-8 bg-gray-300 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700">Show event details on hover</span>
                <button className="w-16 h-8 bg-blue-600 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700">Auto-refresh calendar</span>
                <button
                  className={`w-16 h-8 rounded-full relative transition-colors ${autoRefresh ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => setAutoRefresh(v => !v)}
                  title="Toggle auto-refresh"
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${autoRefresh ? 'right-1' : 'left-1'}`}
                    style={{ left: autoRefresh ? 'calc(100% - 1.75rem)' : '0.25rem' }}
                  ></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700">Auto-enter fullscreen</span>
                <button className="w-16 h-8 bg-blue-600 rounded-full relative">
                  <div className="w-6 h-6 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Settings Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Calendar Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg text-gray-700 mb-2">Default view</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg text-lg">
                  <option>Day</option>
                  <option>Week</option>
                  <option>Month</option>
                </select>
              </div>
              <div>
                <label className="block text-lg text-gray-700 mb-2">Working hours</label>
                <div className="flex space-x-4">
                  <select className="flex-1 p-3 border border-gray-300 rounded-lg text-lg">
                    <option>6:00 AM</option>
                    <option>7:00 AM</option>
                    <option>8:00 AM</option>
                    <option>9:00 AM</option>
                  </select>
                  <span className="flex items-center text-lg text-gray-600">to</span>
                  <select className="flex-1 p-3 border border-gray-300 rounded-lg text-lg">
                    <option>5:00 PM</option>
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <button 
              onClick={() => setShowSettings(false)}
              className="px-8 py-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-lg"
            >
              Cancel
            </button>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // If settings page is shown, render it instead of calendar
  if (showSettings) {
    return <SettingsPage />;
  }

  return (
    <div className="w-[1080px] h-[1920px] bg-white font-sans overflow-hidden mx-auto">
      {/* Header with view selector */}
      <header className="p-6 bg-grey-10 h-[120px]">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <button 
              onClick={() => setCurrentView('DAY')}
              className={`text-2xl font-medium px-6 py-3 rounded-lg transition-colors ${currentView === 'DAY' ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              DAY
            </button>
            <button 
              onClick={() => setCurrentView('WEEK')}
              className={`text-2xl font-medium px-6 py-3 rounded-lg transition-colors ${currentView === 'WEEK' ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              WEEK
            </button>
            <button 
              onClick={() => setCurrentView('MONTH')}
              className={`text-2xl font-medium px-6 py-3 rounded-lg transition-colors ${currentView === 'MONTH' ? 'text-gray-800 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              MONTH
            </button>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800">Family Calendar</h1>
        </div>
      </header>

      {/* Date Navigation Section */}
      <div className="p-6 bg-gray-50 border-b border-gray-200 h-[100px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateToDate('prev')}
              className="text-2xl text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-white transition-colors"
            >
              ←
            </button>
            <button 
              onClick={() => setShowDatePicker(true)}
              className="text-2xl font-bold text-gray-800 px-6 py-3 rounded-lg hover:bg-white transition-colors cursor-pointer"
            >
              {formatDate(currentDate)}
            </button>
            <button 
              onClick={() => navigateToDate('next')}
              className="text-2xl text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-white transition-colors"
            >
              →
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowCalendarManager(true)}
              className="text-lg font-medium px-4 py-2 rounded-lg transition-colors text-gray-600 hover:text-gray-800 hover:bg-white"
            >
              📅 Manage Calendars
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="text-lg font-medium px-4 py-2 rounded-lg transition-colors text-gray-600 hover:text-gray-800 hover:bg-white"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid with swipe functionality */}
      <div 
        ref={calendarRef}
        className="flex h-[1500px] overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Time column */}
        <div className="w-32 bg-gray-10 border-r border-gray-100 flex-shrink-0">
          <div className="h-[100px]"></div> {/* Header spacer */}
          {hours.map(hour => {
            const hourHeight = 1500 / 24; // Adjusted calendar height
            return (
              <div 
                key={hour} 
                className="border-b border-gray-100 flex items-center justify-center text-lg text-gray-600"
                style={{ height: `${hourHeight}px` }}
              >
                {hour === 0 ? '12:00' : hour === 12 ? '12:00' : hour > 12 ? `${hour - 12}:00` : `${hour}:00`}
              </div>
            );
          })}
        </div>

        {/* Person columns */}
        {people.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to ONE Calendar!</h2>
              <p className="text-gray-600 mb-6">Get started by adding your first family member with their calendar.</p>
              <button 
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                ⚙️ Go to Settings
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex">
            {people.map((person, personIndex) => (
            <div key={person} className="flex-1  last:border-r-0 relative">
              {/* Person header */}
              <div className="h-[100px] bg-gray-10 flex items-center justify-center text-xl text-gray-500 font-medium relative">
                <div 
                  className="absolute left-4 w-4 h-4 rounded-full"
                  style={{ backgroundColor: personColors[person] }}
                ></div>
                {person}
                {/* Show connected calendar info */}
                {calendars.filter(cal => cal.assigned_person === person && cal.enabled).length > 0 && (
                  <div className="absolute right-4 text-xs text-gray-400">
                    📅 Connected
                  </div>
                )}
              </div>
              
              {/* Hour rows */}
              <div className="relative">
                {hours.map(hour => {
                  const hourHeight = 1500 / 24;
                  return (
                    <div 
                      key={hour} 
                      className="border-b border-gray-100"
                      style={{ height: `${hourHeight}px` }}
                    ></div>
                  );
                })}
                
                {/* Events */}
                {events
                  .filter(event => event.person === person)
                  .map(event => {
                    const position = getEventPosition(event);
                    const personColor = personColors[person];
                    const lighterColor = personColor + '20'; // Add transparency for lighter background
                    
                    return (
                      <div
                        key={event.id}
                        className="absolute left-3 right-3 rounded-lg px-4 py-3 text-base cursor-pointer transition-colors border"
                        style={{
                          top: position.top,
                          height: position.height,
                          minHeight: '32px',
                          backgroundColor: lighterColor,
                          borderColor: personColor,
                          color: personColor
                        }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm opacity-80">
                          {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="h-[100px] bg-gray-50 border-t border-gray-200 flex items-center justify-center">
        <div className="text-lg text-gray-600">
          Connected Calendars: {calendars.filter(cal => cal.enabled).length} • {new Date().toLocaleDateString()}
        </div>
      </footer>

      {/* New Event Button */}
      <div className="absolute bottom-20 right-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full flex items-center space-x-4 transition-colors shadow-lg text-xl">
          <span className="font-medium">NEW EVENT</span>
          <span className="text-3xl">+</span>
        </button>
      </div>

      {/* Date Picker Popup */}
      {showDatePicker && <DatePicker />}
      
      {/* Calendar Manager Popup */}
      {showCalendarManager && <CalendarManager />}
      
      {/* Add Calendar Popup */}
      {showAddCalendar && (
        <AddCalendarComponent
          newCalendar={newCalendar}
          setNewCalendar={setNewCalendar}
          people={people}
          loading={loading}
          addCalendar={addCalendar}
          setShowAddCalendar={setShowAddCalendar}
        />
      )}
      


      {/* CalDAV Wizard Popup */}
      <CalDAVWizardComponent
        isOpen={showCalDAVWizard}
        onClose={() => setShowCalDAVWizard(false)}
        onAddCalendar={addCalendarFromWizard}
        people={people}
      />
    </div>
  );
}

export default App;
