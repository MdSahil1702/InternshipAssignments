import api from './axios';
import type { LeadFilters } from '../types';

export const getLeadsAPI = (filters: Partial<LeadFilters>) =>
  api.get('/leads', { params: filters });

export const getLeadAPI = (id: string) =>
  api.get(`/leads/${id}`);

export const createLeadAPI = (data: object) =>
  api.post('/leads', data);

export const updateLeadAPI = (id: string, data: object) =>
  api.put(`/leads/${id}`, data);

export const deleteLeadAPI = (id: string) =>
  api.delete(`/leads/${id}`);

export const exportCSVAPI = () =>
  api.get('/leads/export', { responseType: 'blob' });