import axios from 'axios';
import { baseURL } from '../api';

// Define the interface for Professional Experience
export interface ProfessionalExperience {
  id: string;
  title: string;
  company: string;
  description: string;
  mediaFiles: string[]; // Store media files as base64 strings
}

// Function to add a new professional experience
export async function addProfessionalExperience(experienceData: ProfessionalExperience) {
  try {
    const res = await axios.post(`${baseURL}/professional`, experienceData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error adding professional experience');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to edit an existing professional experience
export async function updateProfessionalExperience(experienceId: string, experienceData: ProfessionalExperience) {
  try {
    const res = await axios.put(`${baseURL}/professional/${experienceId}`, experienceData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error updating professional experience');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to delete a professional experience by ID
export async function deleteProfessionalExperience(experienceId: string) {
  try {
    const res = await axios.delete(`${baseURL}/professional/${experienceId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting professional experience');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to fetch all professional experiences
export async function fetchProfessionalExperiences() {
  try {
    const res = await axios.get(`${baseURL}/professional`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching professional experiences');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to fetch a professional experience by ID
export async function fetchProfessionalExperienceById(experienceId: string) {
  try {
    const res = await axios.get(`${baseURL}/professional/${experienceId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching professional experience');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
