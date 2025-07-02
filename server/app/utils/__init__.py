"""
Utility functions package
"""

from .auth import authenticate_admin, ADMIN_USERNAME, ADMIN_PASSWORD
from .file_handler import (
    save_uploaded_file, 
    save_multiple_files, 
    list_uploaded_files, 
    validate_excel_file,
    UPLOADS_DIR
)
from .room_allocation import (
    group_students_and_allot_rooms,
    get_room_status,
    get_allotment_data,
    reset_allotment,
    parse_date
)

__all__ = [
    "authenticate_admin",
    "ADMIN_USERNAME", 
    "ADMIN_PASSWORD",
    "save_uploaded_file",
    "save_multiple_files",
    "list_uploaded_files",
    "validate_excel_file",
    "UPLOADS_DIR",
    "group_students_and_allot_rooms",
    "get_room_status",
    "get_allotment_data",
    "reset_allotment",
    "parse_date"
]
