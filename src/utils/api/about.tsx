import axios from 'axios';
import { baseURL } from '../api';

// Define AboutItem interface
export interface AboutItem {
  id: string;
  introduction: string;
  skills: string;
  education: string;
  select: string;
}

// Fetch all About items
export const fetchAboutItems = async (): Promise<AboutItem[]> => {
  try {
    const res = await axios.get(`${baseURL}/about`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching about items');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Add a new About item
export const addAboutItem = async (aboutItem: AboutItem) => {
  try {
    const res = await axios.post(`${baseURL}/about`, aboutItem);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error adding about item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Update an existing About item
export const updateAboutItem = async (aboutItem: AboutItem) => {
  try {
    const res = await axios.put(`${baseURL}/about/${aboutItem.id}`, aboutItem);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating about item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Delete an About item by ID
export const deleteAboutItem = async (id: string) => {
  try {
    const res = await axios.delete(`${baseURL}/about/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting about item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Update the selected status of an About item
export const updateAboutSelect = async (id: string) => {
  try {
    const res = await axios.put(`${baseURL}/about/select/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating select status');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Get the currently selected About item
export const getSelectedAboutItem = async (): Promise<AboutItem | null> => {
  try {
    const res = await axios.get(`${baseURL}/about/selected`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching selected about item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
