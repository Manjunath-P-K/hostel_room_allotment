import { motion } from 'framer-motion';
import { Users, Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const StudentsList = () => {
  const [allotmentData, setAllotmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getAllotmentData();
        setAllotmentData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allStudents = allotmentData?.allotment_data.flatMap(group => 
    group.students.map(student => ({
      ...student,
      group_id: group.group_id,
      room_number: group.room_number
    }))
  ) || [];

  const filteredStudents = allStudents.filter(student =>
    student['Student Name'].toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="mr-3 h-6 w-6 text-blue-600" />
          Students List
        </h2>
        <div className="text-sm text-gray-600">
          Total: {allStudents.length} students
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>

        {filteredStudents.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={`${student.group_id}-${student['Student Name']}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {student['Student Name']}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Room {student.room_number} (Group {student.group_id})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Fee Paid: {new Date(student['Fee Paid Date']).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Room {student.room_number}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Room Preferences:</h4>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map(prefNum => (
                      <span
                        key={prefNum}
                        className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                      >
                        {prefNum}. {student[`Preference ${prefNum}`]}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : allStudents.length > 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No students found</h3>
            <p className="text-gray-500">Try adjusting your search term.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Students Yet</h3>
            <p className="text-gray-500">Upload student data to see the list of students.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudentsList;
