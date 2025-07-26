from flask import Flask, jsonify, request
from flask_cors import CORS
import caldav
import requests
from datetime import datetime, timedelta
import json
import os
import icalendar
from urllib.parse import urlparse

app = Flask(__name__)
CORS(app)

# Store calendar configurations with person mapping (in production, use a proper database)
calendar_configs = {}

# Store people list (in production, use a proper database)
people_list = ["PERSON 1", "PERSON 2", "PERSON 3", "PERSON 4"]

@app.route('/api/events', methods=['GET'])
def get_events():
    date_param = request.args.get('date')
    print(f"Events request - date_param: {date_param}")
    
    if date_param:
        try:
            target_date = datetime.fromisoformat(date_param.replace('Z', '+00:00'))
        except:
            target_date = datetime.now()
    else:
        target_date = datetime.now()
    
    print(f"Target date: {target_date}")
    print(f"Connected calendars: {len(calendar_configs)}")
    
    # Get events from all connected calendars
    all_events = []
    
    for calendar_id, config in calendar_configs.items():
        print(f"Processing calendar {calendar_id}: {config.get('name')} (type: {config.get('type')})")
        try:
            if config.get('type') == 'ical':
                print(f"Fetching ICAL events for {config.get('name')}")
                events = fetch_ical_events(config, target_date)
                print(f"Found {len(events)} ICAL events")
            else:
                print(f"Fetching CalDAV events for {config.get('name')}")
                events = fetch_caldav_events(config, target_date)
                print(f"Found {len(events)} CalDAV events")
            all_events.extend(events)
        except Exception as e:
            print(f"Error fetching events from calendar {calendar_id}: {e}")
    
    print(f"Total events found: {len(all_events)}")
    
    # If no calendars are connected, return sample data
    if not all_events:
        print("No events found, returning sample data")
        all_events = [
            {"id": 1, "title": "Sample Event 1", "start": "2024-07-25T09:00:00", "end": "2024-07-25T10:00:00", "person": "PERSON 1", "calendar_id": "sample"},
            {"id": 2, "title": "Team Meeting", "start": "2024-07-25T14:00:00", "end": "2024-07-25T15:00:00", "person": "PERSON 2", "calendar_id": "sample"},
            {"id": 3, "title": "Lunch Break", "start": "2024-07-25T12:00:00", "end": "2024-07-25T13:00:00", "person": "PERSON 3", "calendar_id": "sample"}
        ]
    
    return jsonify(all_events)

@app.route('/api/calendars', methods=['GET'])
def get_calendars():
    """Get list of connected calendars"""
    calendars = []
    for calendar_id, config in calendar_configs.items():
        calendars.append({
            "id": calendar_id,
            "name": config.get('name', 'Unknown Calendar'),
            "url": config.get('url', ''),
            "username": config.get('username', ''),
            "enabled": config.get('enabled', True),
            "assigned_person": config.get('assigned_person', '')
        })
    return jsonify(calendars)

@app.route('/api/calendars', methods=['POST'])
def add_calendar():
    """Add a new calendar (CalDAV or ICAL)"""
    data = request.get_json()
    print("Received calendar data:", data)
    
    if not data or not data.get('url'):
        print("Missing URL in request")
        return jsonify({"error": "Missing required fields: url"}), 400
    
    calendar_type = data.get('type', 'caldav')
    print("Calendar type:", calendar_type)
    
    # For ICAL calendars, only URL is required
    if calendar_type == 'ical':
        if not data.get('url'):
            print("Missing URL for ICAL calendar")
            return jsonify({"error": "Missing required fields: url"}), 400
        print("ICAL calendar validation passed")
    else:
        # For CalDAV calendars, username and password are required
        if not data.get('username') or not data.get('password'):
            print("Missing username or password for CalDAV calendar")
            return jsonify({"error": "Missing required fields: username, password"}), 400
        print("CalDAV calendar validation passed")
    
    calendar_id = f"cal_{len(calendar_configs) + 1}"
    
    # Test the connection
    try:
        if calendar_type == 'ical':
            test_ical_connection(data['url'])
        else:
            test_connection(data['url'], data['username'], data['password'])
        
        calendar_configs[calendar_id] = {
            "url": data['url'],
            "username": data.get('username', ''),
            "password": data.get('password', ''),
            "name": data.get('name', f'Calendar {len(calendar_configs) + 1}'),
            "enabled": True,
            "assigned_person": data.get('assigned_person', ''),
            "type": calendar_type
        }
        
        return jsonify({
            "id": calendar_id,
            "name": calendar_configs[calendar_id]['name'],
            "url": data['url'],
            "username": data.get('username', ''),
            "enabled": True,
            "assigned_person": calendar_configs[calendar_id]['assigned_person'],
            "type": calendar_type
        })
        
    except Exception as e:
        return jsonify({"error": f"Failed to connect to calendar: {str(e)}"}), 400

@app.route('/api/calendars/<calendar_id>', methods=['DELETE'])
def remove_calendar(calendar_id):
    """Remove a calendar"""
    if calendar_id in calendar_configs:
        del calendar_configs[calendar_id]
        return jsonify({"message": "Calendar removed successfully"})
    return jsonify({"error": "Calendar not found"}), 404

@app.route('/api/calendars/<calendar_id>/toggle', methods=['POST'])
def toggle_calendar(calendar_id):
    """Enable/disable a calendar"""
    if calendar_id in calendar_configs:
        calendar_configs[calendar_id]['enabled'] = not calendar_configs[calendar_id].get('enabled', True)
        return jsonify({
            "id": calendar_id,
            "enabled": calendar_configs[calendar_id]['enabled']
        })
    return jsonify({"error": "Calendar not found"}), 404

@app.route('/api/calendars/<calendar_id>/assign', methods=['POST'])
def assign_calendar_to_person(calendar_id):
    """Assign a calendar to a specific person"""
    data = request.get_json()
    if not data or not data.get('person'):
        return jsonify({"error": "Missing person field"}), 400
    
    if calendar_id in calendar_configs:
        calendar_configs[calendar_id]['assigned_person'] = data['person']
        return jsonify({
            "id": calendar_id,
            "assigned_person": data['person']
        })
    return jsonify({"error": "Calendar not found"}), 404

@app.route('/api/people', methods=['GET'])
def get_people():
    """Get list of available people"""
    return jsonify(people_list)

@app.route('/api/people', methods=['POST'])
def add_person():
    """Add a new person"""
    print("Received add_person request")
    data = request.get_json()
    print("Request data:", data)
    
    if not data or not data.get('name'):
        print("Missing name field")
        return jsonify({"error": "Missing name field"}), 400
    
    if len(people_list) >= 6:
        print("Maximum people reached")
        return jsonify({"error": "Maximum of 6 people allowed"}), 400
    
    new_person = data['name'].strip()
    print("New person name:", new_person)
    
    if not new_person:
        print("Empty person name")
        return jsonify({"error": "Person name cannot be empty"}), 400
    
    if new_person in people_list:
        print("Person already exists")
        return jsonify({"error": "Person already exists"}), 400
    
    people_list.append(new_person)
    print("Person added successfully. Current people:", people_list)
    return jsonify({
        "name": new_person,
        "message": "Person added successfully"
    })

@app.route('/api/people/<person_name>', methods=['DELETE'])
def remove_person(person_name):
    """Remove a person"""
    # Decode URL-encoded person name
    from urllib.parse import unquote
    decoded_name = unquote(person_name)
    
    if decoded_name in people_list:
        # Remove person from list
        people_list.remove(decoded_name)
        
        # Unassign any calendars that were assigned to this person
        for calendar_id, config in calendar_configs.items():
            if config.get('assigned_person') == decoded_name:
                config['assigned_person'] = ''
        
        return jsonify({"message": "Person removed successfully"})
    return jsonify({"error": "Person not found"}), 404

@app.route('/api/people/<person_name>', methods=['PUT'])
def update_person(person_name):
    """Update a person's name"""
    # Decode URL-encoded person name
    from urllib.parse import unquote
    decoded_name = unquote(person_name)
    
    data = request.get_json()
    if not data or not data.get('name'):
        return jsonify({"error": "Missing name field"}), 400
    
    new_name = data['name'].strip()
    if not new_name:
        return jsonify({"error": "Person name cannot be empty"}), 400
    
    if new_name in people_list and new_name != decoded_name:
        return jsonify({"error": "Person name already exists"}), 400
    
    if decoded_name in people_list:
        # Update person name in list
        index = people_list.index(decoded_name)
        people_list[index] = new_name
        
        # Update any calendars assigned to this person
        for calendar_id, config in calendar_configs.items():
            if config.get('assigned_person') == decoded_name:
                config['assigned_person'] = new_name
        
        return jsonify({
            "old_name": decoded_name,
            "new_name": new_name,
            "message": "Person updated successfully"
        })
    return jsonify({"error": "Person not found"}), 404

def test_connection(url, username, password):
    """Test CalDAV connection"""
    try:
        client = caldav.DAVClient(url=url, username=username, password=password)
        principal = client.principal()
        calendars = principal.calendars()
        if not calendars:
            raise Exception("No calendars found")
        return True
    except Exception as e:
        raise Exception(f"Connection failed: {str(e)}")

def fetch_caldav_events(config, target_date):
    """Fetch events from CalDAV calendar for a specific date"""
    if not config.get('enabled', True):
        return []
    
    try:
        client = caldav.DAVClient(
            url=config['url'], 
            username=config['username'], 
            password=config['password']
        )
        
        principal = client.principal()
        calendars = principal.calendars()
        
        if not calendars:
            return []
        
        # Use the first calendar (you might want to make this configurable)
        calendar = calendars[0]
        
        # Set date range for the target date
        start_date = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_date = start_date + timedelta(days=1)
        
        events = calendar.date_search(
            start=start_date,
            end=end_date,
            expand=True
        )
        
        formatted_events = []
        for event in events:
            # Extract event data
            event_data = event.instance.vevent
            summary = str(event_data.get('summary', 'Untitled Event'))
            start_time = event_data.get('dtstart').dt
            end_time = event_data.get('dtend').dt
            
            # Convert to ISO format
            start_iso = start_time.isoformat() if hasattr(start_time, 'isoformat') else str(start_time)
            end_iso = end_time.isoformat() if hasattr(end_time, 'isoformat') else str(end_time)
            
            # Use the assigned person or calendar name as fallback
            assigned_person = config.get('assigned_person', config.get('name', 'Unknown'))
            
            formatted_events.append({
                "id": f"{config.get('name', 'unknown')}_{len(formatted_events)}",
                "title": summary,
                "start": start_iso,
                "end": end_iso,
                "person": assigned_person,
                "calendar_id": config.get('name', 'unknown')
            })
        
        return formatted_events
        
    except Exception as e:
        print(f"Error fetching CalDAV events: {e}")
        return []

def test_ical_connection(url):
    """Test ICAL connection by fetching the calendar file"""
    try:
        # Convert webcal:// URLs to https://
        if url.startswith('webcal://'):
            url = url.replace('webcal://', 'https://')
        
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Try to parse the ICAL content
        cal = icalendar.Calendar.from_ical(response.content)
        if not cal:
            raise Exception("Invalid ICAL format")
        
        return True
    except Exception as e:
        raise Exception(f"Failed to fetch ICAL calendar: {str(e)}")

def fetch_ical_events(config, target_date):
    """Fetch events from ICAL calendar for a specific date"""
    print(f"fetch_ical_events called for {config.get('name')} on {target_date}")
    
    if not config.get('enabled', True):
        print(f"Calendar {config.get('name')} is disabled")
        return []
    
    try:
        url = config['url']
        print(f"Original URL: {url}")
        
        # Convert webcal:// URLs to https://
        if url.startswith('webcal://'):
            url = url.replace('webcal://', 'https://')
            print(f"Converted URL: {url}")
        
        print(f"Fetching ICAL from: {url}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        print(f"ICAL response status: {response.status_code}")
        print(f"ICAL response size: {len(response.content)} bytes")
        
        cal = icalendar.Calendar.from_ical(response.content)
        print(f"ICAL calendar parsed successfully")
        
        # Set date range for the target date
        start_date = target_date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_date = start_date + timedelta(days=1)
        print(f"Looking for events between {start_date} and {end_date}")
        
        formatted_events = []
        event_count = 0
        total_events = 0
        
        for component in cal.walk():
            if component.name == "VEVENT":
                total_events += 1
                # Get event start and end times
                start_time = component.get('dtstart')
                end_time = component.get('dtend')
                
                if not start_time:
                    print(f"Event {total_events} has no start time, skipping")
                    continue
                
                # Convert to datetime if it's a date
                start_dt = start_time.dt
                if not hasattr(start_dt, 'hour'):  # It's a date, not datetime
                    start_dt = datetime.combine(start_dt, datetime.min.time())
                
                end_dt = end_time.dt if end_time else start_dt
                if not hasattr(end_dt, 'hour'):  # It's a date, not datetime
                    end_dt = datetime.combine(end_dt, datetime.max.time())
                
                summary = str(component.get('summary', 'Untitled Event'))
                print(f"Event {total_events}: {summary} ({start_dt} to {end_dt})")
                
                # Check if event is on the target date
                if start_dt.date() == target_date.date() or (start_dt < end_date and end_dt > start_date):
                    print(f"Event {summary} matches target date!")
                    
                    # Use the assigned person or calendar name as fallback
                    assigned_person = config.get('assigned_person', config.get('name', 'Unknown'))
                    
                    formatted_events.append({
                        "id": f"{config.get('name', 'unknown')}_{event_count}",
                        "title": summary,
                        "start": start_dt.isoformat(),
                        "end": end_dt.isoformat(),
                        "person": assigned_person,
                        "calendar_id": config.get('name', 'unknown')
                    })
                    event_count += 1
                else:
                    print(f"Event {summary} does not match target date")
        
        print(f"Total events in ICAL: {total_events}, matching events: {len(formatted_events)}")
        return formatted_events
        
    except Exception as e:
        print(f"Error fetching ICAL events: {e}")
        import traceback
        traceback.print_exc()
        return []

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
