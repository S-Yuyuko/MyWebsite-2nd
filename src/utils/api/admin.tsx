import axios from 'axios';
import { baseURL } from '../api';

export interface Admin {
  username: string;
  password: string;
}

export const fetchAdminByUsername = async (username: string) => {
  try {
    const res = await axios.post(`${baseURL}/admin/username`, { username });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching admin');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const submitAdminCredentials = async (admin: { username: string; password: string }) => {
  try {
    const res = await axios.post(`${baseURL}/admin`, admin);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error submitting admin credentials');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const fetchAllAdmins = async (): Promise<Admin[]> => {
  try {
    const res = await axios.get(`${baseURL}/admins`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching admins');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const addAdmin = async (admin: Admin) => {
  try {
    const res = await axios.post(`${baseURL}/admin`, admin);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error adding admin');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const editAdmin = async (admin: Admin) => {
  try {
    const res = await axios.put(`${baseURL}/admin`, admin);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error editing admin');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const deleteAdmin = async (username: string) => {
  try {
    const res = await axios.delete(`${baseURL}/admin`, { data: { username } });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting admin');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
