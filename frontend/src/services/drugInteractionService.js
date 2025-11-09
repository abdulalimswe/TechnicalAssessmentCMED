import api from './api';

export const drugInteractionService = {
  getDrugInteraction: async () => {
    const response = await api.get('/drug-interaction');
    return response.data;
  },
};