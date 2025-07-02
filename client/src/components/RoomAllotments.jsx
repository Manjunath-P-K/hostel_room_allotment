import { motion } from 'framer-motion';
import { Building2, Users, MapPin, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { apiService } from '../services/api';

const RoomAllotments = () => {
  const [allotmentData, setAllotmentData] = useState(null);
  const [roomStatus, setRoomStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [allotmentRes, roomRes] = await Promise.all([
        apiService.getAllotmentData(),
        apiService.getRoomStatus()
      ]);
      setAllotmentData(allotmentRes.data);
      setRoomStatus(roomRes.data.rooms || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleResetAllotment = async () => {
    if (!confirm('Are you sure you want to reset all allotments? This action cannot be undone.')) {
      return;
    }

    try {
      await apiService.resetAllotment();
      toast.success('Allotments reset successfully!');
      await fetchData();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to reset allotments');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-800 flex items-center"
        >
          <Building2 className="mr-3 h-6 w-6 text-blue-600" />
          Room Allotments
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleResetAllotment}
          className="btn-secondary flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Allotments</span>
        </motion.button>
      </div>

      {/* Room Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-purple-600" />
          Room Status Grid (1-60)
        </h3>
        
        <div className="grid grid-cols-10 gap-2 mb-6">
          {Array.from({ length: 60 }, (_, i) => {
            const roomNumber = i + 1;
            const room = roomStatus.find(r => r.room_number === roomNumber);
            const isOccupied = room?.status === 'occupied';
            
            return (
              <motion.div
                key={roomNumber}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-xs font-medium text-white
                  ${isOccupied ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
                  transition-colors duration-200 cursor-pointer
                `}
                title={`Room ${roomNumber} - ${isOccupied ? 'Occupied' : 'Available'}`}
                whileHover={{ scale: 1.1 }}
              >
                {roomNumber}
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600">Occupied</span>
          </div>
        </div>
      </motion.div>

      {/* Allotment Details */}
      {allotmentData && allotmentData.allotment_data && allotmentData.allotment_data.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-600" />
            Group Allotments
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {allotmentData.allotment_data.map((group, index) => (
              <motion.div
                key={group.group_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-800">Group {group.group_id}</h4>
                    <p className="text-sm text-gray-600">{Array.isArray(group.students) ? group.students.length : 0} students</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Room {group.room_number}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {Array.isArray(group.students) && group.students.length > 0 ? (
                    group.students.map((student, studentIndex) => (
                      <div key={studentIndex} className="text-sm text-gray-700 flex justify-between">
                        <span>{student['Student Name']}</span>
                        <span className="text-gray-500">
                          Paid: {student['Fee Paid Date'] ? new Date(student['Fee Paid Date']).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No students in this group</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {(!allotmentData || allotmentData.allotment_data.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 text-center"
        >
          <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Allotments Yet</h3>
          <p className="text-gray-500">Upload student data to generate room allotments.</p>
        </motion.div>
      )}
    </div>
  );
};

export default RoomAllotments;
