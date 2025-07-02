"""
Main FastAPI application for the Hostel Room Allotment System
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import admin_router, public_router

# Create FastAPI app
app = FastAPI(
    title="Hostel Room Allotment System",
    description="API for managing hostel room allotments with admin authentication and Excel processing",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin_router)
app.include_router(public_router)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Hostel Room Allotment System API",
        "status": "running",
        "version": "1.0.0",
        "admin_login": "Use Basic Auth with username=admin, password=hostel123",
        "documentation": {
            "swagger_ui": "/docs",
            "redoc": "/redoc"
        },
        "endpoints": {
            "admin": "/admin/*",
            "public": "/global/*"
        }
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "hostel-room-allotment",
        "version": "1.0.0"
    }
