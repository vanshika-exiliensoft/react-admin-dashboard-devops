
import axios from 'axios';
import type { DashboardStats } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getLambdaDashboardStats(): Promise<DashboardStats> {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not configured');
  }

  const response = await axios.get<DashboardStats>(
    `${API_BASE_URL}/api/dashboard`,
    { timeout: 10000 }
  );

  return response.data;
}
