"""
Admin routes for the hostel room allotment system
"""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from typing import List
import pandas as pd

from ..utils import (
    authenticate_admin,
    save_uploaded_file,
    save_multiple_files,
    list_uploaded_files,
    validate_excel_file,
    group_students_and_allot_rooms,
    get_room_status,
    get_allotment_data,
    reset_allotment,
    UPLOADS_DIR
)

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(authenticate_admin)])


@router.post("/upload-excel")
async def upload_excel(
    file: UploadFile = File(...),
    admin: str = Depends(authenticate_admin)
):
    """Upload Excel file with student data and process room allotment"""
    
    # Validate file format
    if not validate_excel_file(file.filename):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an Excel file (.xlsx or .xls)"
        )
    
    try:
        # Save uploaded file
        file_path = await save_uploaded_file(file)
        
        # Read Excel file
        df = pd.read_excel(file_path)
        
        # Validate required columns
        required_columns = ['Student Name', 'Preference 1', 'Preference 2', 'Preference 3', 'Fee Paid Date']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Missing required columns: {missing_columns}"
            )
        
        # Process room allotment
        result = group_students_and_allot_rooms(df)
        
        return {
            "message": "Excel file uploaded and processed successfully",
            "filename": file.filename,
            "total_students": len(df),
            "total_groups": len(result),
            "allotment_data": result
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing file: {str(e)}"
        )


@router.post("/upload-fee-photos")
async def upload_fee_photos(
    files: List[UploadFile] = File(...),
    admin: str = Depends(authenticate_admin)
):
    """Upload fee receipt photos"""
    uploaded_files = await save_multiple_files(files)
    
    return {
        "message": f"Uploaded {len(uploaded_files)} fee receipt photos",
        "uploaded_files": uploaded_files
    }


@router.get("/allotment-data")
async def get_current_allotment_data(admin: str = Depends(authenticate_admin)):
    """Get current room allotment data"""
    return get_allotment_data()


@router.get("/room-status")
async def get_current_room_status(admin: str = Depends(authenticate_admin)):
    """Get status of all rooms (1-60)"""
    return get_room_status()


@router.post("/reset-allotment")
async def reset_current_allotment(admin: str = Depends(authenticate_admin)):
    """Reset all allotment data"""
    return reset_allotment()


@router.get("/uploads")
async def list_all_uploaded_files(admin: str = Depends(authenticate_admin)):
    """List all uploaded files"""
    files = list_uploaded_files()
    
    return {
        "upload_directory": str(UPLOADS_DIR),
        "total_files": len(files),
        "files": files
    }
