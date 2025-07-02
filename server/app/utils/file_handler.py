"""
File handling utilities for the hostel room allotment system
"""

import os
import shutil
from pathlib import Path
from fastapi import UploadFile
from datetime import datetime
from typing import List, Dict, Any

# Create uploads directory
UPLOADS_DIR = Path("uploads")
UPLOADS_DIR.mkdir(exist_ok=True)


async def save_uploaded_file(file: UploadFile, directory: Path = UPLOADS_DIR) -> Path:
    """Save an uploaded file to the specified directory"""
    file_path = directory / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return file_path


async def save_multiple_files(files: List[UploadFile], directory: Path = UPLOADS_DIR) -> List[Dict[str, Any]]:
    """Save multiple uploaded files and return file information"""
    uploaded_files = []
    
    for file in files:
        # Validate file type (basic image validation)
        if not file.content_type.startswith('image/'):
            continue
        
        try:
            file_path = await save_uploaded_file(file, directory)
            uploaded_files.append({
                "filename": file.filename,
                "size": file.size,
                "content_type": file.content_type,
                "path": str(file_path)
            })
        except Exception as e:
            continue
    
    return uploaded_files


def list_uploaded_files(directory: Path = UPLOADS_DIR) -> List[Dict[str, Any]]:
    """List all files in the uploads directory"""
    files = []
    
    if directory.exists():
        for file_path in directory.iterdir():
            if file_path.is_file():
                stat = file_path.stat()
                files.append({
                    "filename": file_path.name,
                    "size": stat.st_size,
                    "created": datetime.fromtimestamp(stat.st_ctime).strftime('%Y-%m-%d %H:%M:%S')
                })
    
    return files


def validate_excel_file(filename: str) -> bool:
    """Validate if the uploaded file is an Excel file"""
    return filename.endswith(('.xlsx', '.xls'))
