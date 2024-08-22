import axios from 'axios';
import { baseURL } from '../api';

// Define MoreItem interface
export interface MoreItem {
  id: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  select: string;
}

// Fetch all More items
export const fetchMoreItems = async (): Promise<MoreItem[]> => {
  try {
    const res = await axios.get(`${baseURL}/more`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching more items');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Add a new More item
export const addMoreItem = async (moreItem: MoreItem) => {
  try {
    const res = await axios.post(`${baseURL}/more`, moreItem);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error adding more item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Update an existing More item
export const updateMoreItem = async (moreItem: MoreItem) => {
  try {
    const res = await axios.put(`${baseURL}/more/${moreItem.id}`, moreItem);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating more item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Delete a More item by ID
export const deleteMoreItem = async (id: string) => {
  try {
    const res = await axios.delete(`${baseURL}/more/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting more item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Update the selected status of a More item
export const updateMoreSelect = async (id: string) => {
  try {
    const res = await axios.put(`${baseURL}/more/select/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating select status');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

// Get the currently selected More item
export const getSelectedMoreItem = async (): Promise<MoreItem | null> => {
  try {
    const res = await axios.get(`${baseURL}/more/selected`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching selected more item');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
