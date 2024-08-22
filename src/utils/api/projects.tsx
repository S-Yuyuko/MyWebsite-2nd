import axios from 'axios';
import { baseURL } from '../api';

export interface Project {
  id: string;
  title: string;
  skills: string;
  description: string;
  mediaFiles: string[]; // Store media files as base64 strings
}

// Function to add a new project
export async function addProject(projectData: Project) {
  try {
    const res = await axios.post(`${baseURL}/projects`, projectData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error adding project');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to edit an existing project
export async function editProject(projectId: string, projectData: Project) {
  try {
    const res = await axios.put(`${baseURL}/projects/${projectId}`, projectData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error editing project');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to delete a project by ID
export async function deleteProject(projectId: string) {
  try {
    const res = await axios.delete(`${baseURL}/projects/${projectId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error deleting project');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to fetch all projects
export async function fetchAllProjects() {
  try {
    const res = await axios.get(`${baseURL}/projects`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching projects');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

// Function to fetch a project by ID
export async function fetchProjectById(projectId: string) {
  try {
    const res = await axios.get(`${baseURL}/projects/${projectId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching project');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
