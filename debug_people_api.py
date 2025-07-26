#!/usr/bin/env python3
"""
Debug script to test the people API endpoints
"""

import requests
import json

BASE_URL = "http://localhost:5001/api"

def test_get_people():
    """Test getting the list of people"""
    print("Testing GET /api/people...")
    try:
        response = requests.get(f"{BASE_URL}/people")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_add_person(name):
    """Test adding a person"""
    print(f"\nTesting POST /api/people with name: '{name}'...")
    try:
        data = {"name": name}
        response = requests.post(f"{BASE_URL}/people", json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_update_person(old_name, new_name):
    """Test updating a person's name"""
    print(f"\nTesting PUT /api/people/{old_name} with new name: '{new_name}'...")
    try:
        data = {"name": new_name}
        response = requests.put(f"{BASE_URL}/people/{old_name}", json=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_delete_person(name):
    """Test deleting a person"""
    print(f"\nTesting DELETE /api/people/{name}...")
    try:
        response = requests.delete(f"{BASE_URL}/people/{name}")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    print("=== People API Debug Test ===\n")
    
    # Test 1: Get current people
    if not test_get_people():
        print("❌ Failed to get people list")
        return
    
    # Test 2: Add a person
    if test_add_person("Test Person"):
        print("✅ Successfully added person")
        
        # Test 3: Get people again to see the new person
        test_get_people()
        
        # Test 4: Update the person's name
        if test_update_person("Test Person", "Updated Test Person"):
            print("✅ Successfully updated person")
            
            # Test 5: Get people again to see the updated name
            test_get_people()
            
            # Test 6: Delete the person
            if test_delete_person("Updated Test Person"):
                print("✅ Successfully deleted person")
                
                # Test 7: Get people again to confirm deletion
                test_get_people()
            else:
                print("❌ Failed to delete person")
        else:
            print("❌ Failed to update person")
    else:
        print("❌ Failed to add person")

if __name__ == "__main__":
    main() 