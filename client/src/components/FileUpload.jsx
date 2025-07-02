import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { apiService } from '../services/api';

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    try {
      const file = acceptedFiles[0];
      
      // Check if it's an Excel file
      const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
      
      if (isExcel) {
        const response = await apiService.uploadExcel(file);
        toast.success(`Excel file uploaded successfully! ${response.data.total_students} students processed.`);
        setUploadedFiles(prev => [...prev, file.name]);
      } else {
        // Assume it's fee photos
        const response = await apiService.uploadFeePhotos([file]);
        toast.success('Fee photo uploaded successfully!');
        setUploadedFiles(prev => [...prev, file.name]);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Upload className="mr-3 h-6 w-6 text-blue-600" />
          Upload Files
        </h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
            className="space-y-4"
          >
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isDragActive ? 'Drop the file here' : 'Drag & drop files here'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Excel files (.xlsx, .xls) or Fee receipt images
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Select Files'}
            </button>
          </motion.div>
        </div>

        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <h3 className="font-medium text-green-800 mb-2">Recently Uploaded:</h3>
            <ul className="space-y-1">
              {uploadedFiles.map((filename, index) => (
                <li key={index} className="text-sm text-green-700 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  {filename}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-800">File Requirements</h3>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>• Excel files must contain columns: Student Name, Preference 1, Preference 2, Preference 3, Fee Paid Date</li>
              <li>• Fee receipt images should be in PNG, JPG, or JPEG format</li>
              <li>• Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;
