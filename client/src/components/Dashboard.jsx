import { motion } from 'framer-motion';
import { Building2, Users, Clock, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const Dashboard = () => {
  const [allotmentData, setAllotmentData] = useState(null);
  const [roomStatus, setRoomStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [allotmentRes, roomRes] = await Promise.all([
          apiService.getAllotmentData(),
          apiService.getRoomStatus()
        ]);
        setAllotmentData(allotmentRes.data);
        setRoomStatus(roomRes.data.rooms || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please check if the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: 'Total Students',
      value: allotmentData?.total_students || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Groups',
      value: allotmentData?.total_groups || 0,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Occupied Rooms',
      value: Array.isArray(roomStatus) ? roomStatus.filter(room => room.status === 'occupied').length : 0,
      icon: Building2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Available Rooms',
      value: Array.isArray(roomStatus) ? roomStatus.filter(room => room.status === 'available').length : 0,
      icon: Building2,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Hostel Management Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Monitor room allotments and student management</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card p-6 ${stat.bgColor} border-l-4 border-gradient-to-b ${stat.color}`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.textColor}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {allotmentData?.allotment_data && allotmentData.allotment_data.length > 0 ? (
              allotmentData.allotment_data.slice(0, 5).map((group, index) => (
                <div key={group.group_id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Group {group.group_id}</p>
                    <p className="text-sm text-gray-600">{group.students && group.students.length || 0} students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">Room {group.room_number}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No allotment data available</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-purple-600" />
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Server Status</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="text-gray-800">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Rooms</span>
              <span className="text-gray-800">60</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Occupancy Rate</span>
              <span className="text-gray-800">
                {Array.isArray(roomStatus) && roomStatus.length > 0 
                  ? `${Math.round((roomStatus.filter(r => r.status === 'occupied').length / roomStatus.length) * 100)}%`
                  : '0%'
                }
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
