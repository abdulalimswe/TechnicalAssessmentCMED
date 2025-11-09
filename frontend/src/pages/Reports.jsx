import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { prescriptionService } from '../services/prescriptionService';
import { getFirstDayOfMonth, getLastDayOfMonth } from '../utils/validation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
  });

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const data = await prescriptionService.getDayWiseCount(
        dateRange.startDate,
        dateRange.endDate
      );
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
      alert('Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,


      [name]: value,
    }));
  };

  const totalPrescriptions = reportData.reduce((sum, item) => sum + item.prescriptionCount, 0);
  const avgPerDay = reportData.length > 0 ? (totalPrescriptions / reportData.length).toFixed(1) : 0;
  const maxDay = reportData.reduce(
    (max, item) => (item.prescriptionCount > max.count ? { day: item.day, count: item.prescriptionCount } : max),
    { day: '', count: 0 }
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
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>

        {/* Date Range Filter */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateRangeChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateRangeChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Prescriptions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalPrescriptions}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Per Day</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgPerDay}</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Busiest Day</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  {maxDay.count > 0 ? `${maxDay.count} on ${maxDay.day}` : 'N/A'}
                </p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Day-wise Prescription Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Day-wise Prescription Count
          </h2>
          {reportData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📉</div>
              <p className="text-lg font-medium">No data available</p>
              <p className="text-sm mt-2">No prescriptions found for the selected date range</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="prescriptionCount"
                  fill="#3b82f6"
                  name="Prescription Count"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Data Table */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Detailed Data
          </h2>
          {reportData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No data available for the selected date range</p>
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
                      Prescription Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-2">{item.prescriptionCount}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{
                                width: `${(item.prescriptionCount / Math.max(...reportData.map(d => d.prescriptionCount))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {((item.prescriptionCount / totalPrescriptions) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {totalPrescriptions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;