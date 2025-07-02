"""
Room allocation logic for the hostel room allotment system
"""

import pandas as pd
from datetime import datetime
from typing import List, Dict, Any, Optional

# In-memory storage
allotment_data = []
allocated_rooms = set()


def parse_date(date_str) -> Optional[datetime]:
    """Parse date from various formats"""
    if pd.isna(date_str):
        return None
    
    if isinstance(date_str, datetime):
        return date_str
    
    # Try different date formats
    date_formats = [
        "%Y-%m-%d", "%d-%m-%Y", "%m/%d/%Y", "%d/%m/%Y", 
        "%Y/%m/%d", "%d-%b-%Y", "%d %b %Y"
    ]
    
    for fmt in date_formats:
        try:
            return datetime.strptime(str(date_str), fmt)
        except ValueError:
            continue
    
    try:
        return pd.to_datetime(date_str)
    except:
        return None


def group_students_and_allot_rooms(df: pd.DataFrame) -> List[Dict[str, Any]]:
    """Group students in sets of 3 and allot rooms based on earliest fee paid date"""
    global allotment_data, allocated_rooms
    
    # Reset previous data
    allotment_data.clear()
    allocated_rooms.clear()
    
    # Group students in sets of 3
    groups = []
    for i in range(0, len(df), 3):
        group_members = df.iloc[i:i+3].copy()
        group_id = f"Group{len(groups) + 1}"
        
        # Parse fee paid dates
        fee_dates = []
        for _, student in group_members.iterrows():
            date = parse_date(student.get('Fee Paid Date'))
            if date:
                fee_dates.append(date)
        
        # Find earliest date for the group
        earliest_date = min(fee_dates) if fee_dates else datetime.now()
        
        groups.append({
            'group_id': group_id,
            'members': group_members,
            'earliest_fee_date': earliest_date,
            'fee_dates': fee_dates
        })
    
    # Sort groups by earliest fee paid date
    groups.sort(key=lambda x: x['earliest_fee_date'])
    
    # Allot rooms to groups
    for group in groups:
        group_data = {
            'group_id': group['group_id'],
            'student_names': [],
            'allocated_room': None,
            'fee_paid_dates': [],
            'receipt_file_names': []
        }
        
        # Collect group member data
        preferences = []
        for _, student in group['members'].iterrows():
            group_data['student_names'].append(student.get('Student Name', 'N/A'))
            
            fee_date = parse_date(student.get('Fee Paid Date'))
            group_data['fee_paid_dates'].append(
                fee_date.strftime('%Y-%m-%d') if fee_date else 'N/A'
            )
            
            group_data['receipt_file_names'].append(
                student.get('Fees Photo', 'N/A')
            )
            
            # Collect preferences for room allotment
            for pref_col in ['Preference 1', 'Preference 2', 'Preference 3']:
                pref = student.get(pref_col)
                if pd.notna(pref) and pref not in preferences:
                    try:
                        room_num = int(pref)
                        if 1 <= room_num <= 60:
                            preferences.append(room_num)
                    except (ValueError, TypeError):
                        pass
        
        # Allot room based on preferences
        allocated_room = None
        for room_num in preferences:
            if room_num not in allocated_rooms:
                allocated_room = room_num
                allocated_rooms.add(room_num)
                break
        
        group_data['allocated_room'] = allocated_room
        allotment_data.append(group_data)
    
    return allotment_data


def get_room_status() -> Dict[str, Any]:
    """Get status of all rooms (1-60)"""
    all_rooms = list(range(1, 61))
    available_rooms = [room for room in all_rooms if room not in allocated_rooms]
    
    return {
        "total_rooms": 60,
        "allocated_rooms": sorted(list(allocated_rooms)),
        "available_rooms": sorted(available_rooms),
        "allocation_summary": {
            "allocated": len(allocated_rooms),
            "available": len(available_rooms)
        }
    }


def get_allotment_data() -> Dict[str, Any]:
    """Get current room allotment data"""
    return {
        "total_groups": len(allotment_data),
        "allocated_rooms_count": len(allocated_rooms),
        "allotment_data": allotment_data
    }


def reset_allotment() -> Dict[str, str]:
    """Reset all allotment data"""
    global allotment_data, allocated_rooms
    
    allotment_data.clear()
    allocated_rooms.clear()
    
    return {"message": "Room allotment data has been reset"}
