import axios from 'axios';
import { baseURL } from '../api';

export interface HomeWord {
  id: string;
  title: string;
  description: string;
  select: string; // Add the select property
}

export const fetchHomeWords = async (): Promise<HomeWord[]> => {
  try {
    const res = await axios.get(`${baseURL}/homewords`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching home words');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const addHomeWord = async (homeWord: { id: string; title: string; description: string; select: string }) => {
  try {
    const res = await axios.post(`${baseURL}/homewords`, homeWord);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error adding home word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const updateHomeWord = async (homeWord: { id: string; title: string; description: string }) => {
  try {
    const res = await axios.put(`${baseURL}/homewords`, homeWord);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating home word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const deleteHomeWord = async (id: string) => {
  try {
    const res = await axios.delete(`${baseURL}/homewords/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting home word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const updateSelect = async (id: string) => {
  try {
    const res = await axios.put(`${baseURL}/homewords/select/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating select status');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const getSelectedHomeWords = async (): Promise<HomeWord | null> => {
  try {
    const res = await axios.get(`${baseURL}/homewords/selected`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching selected home word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};