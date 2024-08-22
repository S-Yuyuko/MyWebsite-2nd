import axios from 'axios';
import { baseURL } from '../api';

export const fetchImages = async () => {
  try {
    const res = await axios.get(`${baseURL}/images`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching images');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const uploadImages = async (files: FileList) => {
  const formData = new FormData();
  Array.from(files).forEach(file => {
    formData.append('images', file);
  });

  try {
    const res = await axios.post(`${baseURL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error uploading images');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const deleteImage = async (imagename: string) => {
  try {
    const res = await axios.delete(`${baseURL}/images/${imagename}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting image');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
