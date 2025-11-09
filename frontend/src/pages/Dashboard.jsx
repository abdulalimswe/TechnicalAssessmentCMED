import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { prescriptionService } from '../services/prescriptionService';
import { getFirstDayOfMonth, getLastDayOfMonth, formatDisplayDate } from '../utils/validation';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPrescriptions: 0,
    thisMonth: 0,
    today: 0,
  });
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const startDate = getFirstDayOfMonth();
      const endDate = getLastDayOfMonth();
      const prescriptions = await prescriptionService.getAll(startDate, endDate);

      const today = new Date().toISOString().split('T')[0];
      const todayCount = prescriptions.filter(p => p.prescriptionDate === today).length;

      setStats({
        totalPrescriptions: prescriptions.length,
        thisMonth: prescriptions.length,
        today: todayCount,
      });

      // Get 5 most recent prescriptions
      setRecentPrescriptions(prescriptions.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`card ${color} transform hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => navigate('/prescription/new')}
            className="btn-primary flex items-center"
          >
            <span className="mr-2">➕</span>
            New Prescription
          </button>


        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="This Month"
            value={stats.thisMonth}
            icon="📊"
            color="bg-gradient-to-br from-blue-50 to-blue-100"
          />
          <StatCard
            title="Today"
            value={stats.today}
            icon="📅"
            color="bg-gradient-to-br from-green-50 to-green-100"
          />
          <StatCard
            title="Total Prescriptions"
            value={stats.totalPrescriptions}
            icon="📋"
            color="bg-gradient-to-br from-purple-50 to-purple-100"
          />
        </div>

        {/* Recent Prescriptions */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Prescriptions</h2>
            <button
              onClick={() => navigate('/prescriptions')}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View All →
            </button>
          </div>

          {recentPrescriptions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg">No prescriptions found</p>
              <p className="text-sm mt-2">Create your first prescription to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diagnosis
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPrescriptions.map((prescription) => (
                    <tr
                      key={prescription.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/prescription/edit/${prescription.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDisplayDate(prescription.prescriptionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {prescription.patientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prescription.patientAge}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prescription.patientGender}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                        {prescription.diagnosis || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/prescriptions')}
            className="card hover:shadow-lg transition-shadow duration-200 text-left"
          >
            <div className="flex items-center">
              <div className="text-3xl mr-4">📋</div>
              <div>
                <h3 className="font-semibold text-gray-900">View Prescriptions</h3>
                <p className="text-sm text-gray-500 mt-1">Browse all prescriptions</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/reports')}
            className="card hover:shadow-lg transition-shadow duration-200 text-left"
          >
            <div className="flex items-center">
              <div className="text-3xl mr-4">📈</div>
              <div>
                <h3 className="font-semibold text-gray-900">View Reports</h3>
                <p className="text-sm text-gray-500 mt-1">Analyze prescription data</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/drug-interaction')}
            className="card hover:shadow-lg transition-shadow duration-200 text-left"
          >
            <div className="flex items-center">
              <div className="text-3xl mr-4">💊</div>
              <div>
                <h3 className="font-semibold text-gray-900">Drug Information</h3>
                <p className="text-sm text-gray-500 mt-1">Check drug interactions</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
