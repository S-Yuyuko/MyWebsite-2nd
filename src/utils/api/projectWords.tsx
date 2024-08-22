import axios from 'axios';
import { baseURL } from '../api';

export interface ProjectWord {
  id: string;
  title: string;
  description: string;
  select: string; // Add the select property
}

export const fetchProjectWords = async (): Promise<ProjectWord[]> => {
  try {
    const res = await axios.get(`${baseURL}/projectwords`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching project words');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const addProjectWord = async (projectWord: { id: string; title: string; description: string; select: string }) => {
  try {
    const res = await axios.post(`${baseURL}/projectwords`, projectWord);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error adding project word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const updateProjectWord = async (projectWord: { id: string; title: string; description: string }) => {
  try {
    const res = await axios.put(`${baseURL}/projectwords`, projectWord);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating project word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const deleteProjectWord = async (id: string) => {
  try {
    const res = await axios.delete(`${baseURL}/projectwords/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting project word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const updateProjectSelect = async (id: string) => {
  try {
    const res = await axios.put(`${baseURL}/projectwords/select/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating select status');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const getSelectedProjectWord = async (): Promise<ProjectWord | null> => {
  try {
    const res = await axios.get(`${baseURL}/projectwords/selected`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching selected project word');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
