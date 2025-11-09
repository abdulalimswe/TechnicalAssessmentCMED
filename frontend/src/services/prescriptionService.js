import api from './api';

export const prescriptionService = {
  getAll: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get('/prescription', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/prescription/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/prescription', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/prescription/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/prescription/${id}`);
    return response.data;
  },

  getDayWiseCount: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    const response = await api.get('/prescription/report/day-wise-count', { params });
    return response.data;
  },
};

