import requests
import json
from requests.auth import HTTPBasicAuth

# API base URL
BASE_URL = "http://localhost:8000"

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "hostel123"

def test_api():
    """Test the FastAPI endpoints"""
    
    print("=" * 50)
    print("Testing Hostel Room Allotment API")
    print("=" * 50)
    
    # Test 1: Root endpoint (public)
    print("\n1. Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 2: Global endpoint (public)
    print("\n2. Testing global endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/global/")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 3: Admin endpoint without auth (should fail)
    print("\n3. Testing admin endpoint without authentication...")
    try:
        response = requests.get(f"{BASE_URL}/admin/room-status")
        print(f"Status: {response.status_code}")
        if response.status_code == 401:
            print("✓ Authentication required (as expected)")
        else:
            print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 4: Admin endpoint with auth
    print("\n4. Testing admin endpoint with authentication...")
    try:
        auth = HTTPBasicAuth(ADMIN_USERNAME, ADMIN_PASSWORD)
        response = requests.get(f"{BASE_URL}/admin/room-status", auth=auth)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 5: Get allotment data
    print("\n5. Testing allotment data endpoint...")
    try:
        auth = HTTPBasicAuth(ADMIN_USERNAME, ADMIN_PASSWORD)
        response = requests.get(f"{BASE_URL}/admin/allotment-data", auth=auth)
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 6: Upload Excel file (if sample file exists)
    print("\n6. Testing Excel file upload...")
    try:
        auth = HTTPBasicAuth(ADMIN_USERNAME, ADMIN_PASSWORD)
        
        # Check if sample file exists
        import os
        sample_file = '../data/sample_students_grouped.xlsx'
        if os.path.exists(sample_file):
            with open(sample_file, 'rb') as f:
                files = {'file': ('sample_students_grouped.xlsx', f, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}
                response = requests.post(f"{BASE_URL}/admin/upload-excel", files=files, auth=auth)
                print(f"Status: {response.status_code}")
                print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print("Sample Excel file not found. Run 'python scripts/create_sample_excel.py' first.")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 7: Get room status after upload
    print("\n7. Testing room status after upload...")
    try:
        auth = HTTPBasicAuth(ADMIN_USERNAME, ADMIN_PASSWORD)
        response = requests.get(f"{BASE_URL}/admin/room-status", auth=auth)
        print(f"Status: {response.status_code}")
        data = response.json()
        print(f"Total rooms: {data['total_rooms']}")
        print(f"Allocated rooms: {data['allocation_summary']['allocated']}")
        print(f"Available rooms: {data['allocation_summary']['available']}")
        print(f"Allocated room numbers: {data['allocated_rooms']}")
    except Exception as e:
        print(f"Error: {e}")
    
    print("\n" + "=" * 50)
    print("API Testing Complete!")
    print("=" * 50)


if __name__ == "__main__":
    print("Make sure the FastAPI server is running on http://localhost:8000")
    print("Run 'python scripts/create_sample_excel.py' first to create test data")
    input("Press Enter to continue with testing...")
    test_api()
