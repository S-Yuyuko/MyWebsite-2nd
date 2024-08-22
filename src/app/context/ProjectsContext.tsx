'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  addProject, 
  editProject, 
  deleteProject, 
  fetchAllProjects, 
  Project,
  addProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience,
  fetchProfessionalExperiences,
  ProfessionalExperience
} from '../../utils/api';
import {
  fetchProjectWords,
  addProjectWord,
  updateProjectWord,
  deleteProjectWord,
  updateProjectSelect,
  getSelectedProjectWord,
} from '../../utils/api'; // Import the API for project words

// Define interfaces
interface ProjectWord {
  id: string;
  title: string;
  description: string;
  select: string;
}

interface ProjectsContextType {
  projects: Project[];
  project: Project;
  showProjectForm: boolean;
  isEditing: boolean;
  loadAllProjects: () => void;
  handleSaveProject: () => void;
  initiateEditProject: (selectedProject: Project) => void;
  removeProject: (id: string) => void;
  resetProjectForm: () => void;
  handleProjectInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleMediaFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeSelectedFile: (index: number, event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  setShowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;

  // For project words (similar to welcome words)
  projectWords: ProjectWord[];
  projectWord: ProjectWord;
  isSelectProjectWord: string | null;
  selectedProjectWords: ProjectWord | null;
  loadAllProjectWords: () => void;
  handleAddProjectWord: () => void;
  initiateEditProjectWord: (selectedWord: ProjectWord) => void;
  removeProjectWord: (id: string) => void;
  resetProjectWordForm: () => void;
  handleProjectWordInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectProjectWord: (id: string) => void;

  // Professional Experience management
  professionalExperiences: ProfessionalExperience[];
  professionalExperience: ProfessionalExperience;
  showProfessionalForm: boolean;
  isEditingProfessional: boolean;
  loadAllProfessionalExperiences: () => void;
  handleSaveProfessionalExperience: () => void;
  initiateEditProfessionalExperience: (selectedExperience: ProfessionalExperience) => void;
  removeProfessionalExperience: (id: string) => void;
  resetProfessionalExperienceForm: () => void;
  handleProfessionalInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleProfessionalMediaFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeProfessionalSelectedFile: (index: number, event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  setShowProfessionalForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context
const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// ProjectsProvider component
export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  // States for managing projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project>({
    id: '',
    title: '',
    skills: '',
    description: '',
    mediaFiles: [],
  });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // States for managing project words
  const [projectWords, setProjectWords] = useState<ProjectWord[]>([]);
  const [projectWord, setProjectWord] = useState<ProjectWord>({
    id: '',
    title: '',
    description: '',
    select: 'no',
  });
  const [isSelectProjectWord, setIsSelectProjectWord] = useState<string | null>(null);
  const [selectedProjectWords, setSelectedProjectWords] = useState<ProjectWord | null>(null);

  // States for managing professional experiences
  const [professionalExperiences, setProfessionalExperiences] = useState<ProfessionalExperience[]>([]);
  const [professionalExperience, setProfessionalExperience] = useState<ProfessionalExperience>({
    id: '',
    title: '',
    company: '',
    description: '',
    mediaFiles: [],
  });
  const [showProfessionalForm, setShowProfessionalForm] = useState(false);
  const [isEditingProfessional, setIsEditingProfessional] = useState<boolean>(false);

  // UseEffect to load data when component mounts
  useEffect(() => {
    loadAllProjects();
    loadAllProjectWords();
    loadAllProfessionalExperiences();
  }, []);

  // Project management functions
  const loadAllProjects = async () => {
    try {
      const data = await fetchAllProjects(); 
      // Parse the mediaFiles JSON string into an array
      const parsedData = data.map((project: Project) => ({
        ...project,
        mediaFiles: typeof project.mediaFiles === 'string' ? JSON.parse(project.mediaFiles) : project.mediaFiles,
      }));
      setProjects(parsedData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  
  const handleSaveProject = async () => {
    try {
      const projectData: Project = {
        id: isEditing ? project.id : uuidv4(),
        title: project.title,
        skills: project.skills,
        description: project.description,
        mediaFiles: project.mediaFiles,
      };

      if (isEditing) {
        await editProject(projectData.id, projectData);
        setProjects((prevProjects) =>
          prevProjects.map((p) => (p.id === projectData.id ? { ...p, ...projectData } : p))
        );
      } else {
        const newProject = await addProject(projectData);
        setProjects((prevProjects) => [...prevProjects, newProject]);
      }

      resetProjectForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const initiateEditProject = (selectedProject: Project) => {
    setProject(selectedProject);
    setIsEditing(true);
    setShowProjectForm(true);
  };

  const removeProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const resetProjectForm = () => {
    setProject({
      id: '',
      title: '',
      skills: '',
      description: '',
      mediaFiles: [],
    });
    setIsEditing(false);
    setShowProjectForm(false);
  };

  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleMediaFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const base64Files = await Promise.all(files.map(fileToBase64));

      setProject((prevProject) => ({
        ...prevProject,
        mediaFiles: [...prevProject.mediaFiles, ...base64Files],
      }));
    }
  };

  const removeSelectedFile = (index: number, event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
  
    setProject((prevProject) => ({
      ...prevProject,
      mediaFiles: Array.isArray(prevProject.mediaFiles)
        ? prevProject.mediaFiles.filter((_, i) => i !== index)
        : [], // If mediaFiles is not an array, default to an empty array
    }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Project Word management functions
  const loadAllProjectWords = async () => {
    try {
      const data = await fetchProjectWords();
      setProjectWords(data);
  
      const selectedWord = await getSelectedProjectWord(); 
      if (selectedWord) {
        setIsSelectProjectWord(selectedWord.id); 
        setSelectedProjectWords(selectedWord)
      } else {
        setIsSelectProjectWord(null);
      }
    } catch (error) {
      console.error('Error fetching project words:', error);
    }
  };

  const handleAddProjectWord = async () => {
    const { title, description } = projectWord;
    if (!title || !description) {
      alert('Please fill out both fields.');
      return;
    }

    try {
      if (isEditing) {
        await updateProjectWord(projectWord);
        setProjectWords((prevWords) =>
          prevWords.map((word) => (word.id === projectWord.id ? projectWord : word))
        );

        // Update selectedProjectWord if the edited projectWord matches the selected one
        if (selectedProjectWords && projectWord.id === selectedProjectWords.id) {
          setSelectedProjectWords(projectWord);
        }

        setIsEditing(false);
      } else {
        const newWord = { id: uuidv4(), title, description, select: 'no' };
        const addedWord = await addProjectWord(newWord);
        setProjectWords((prevWords) => [...prevWords, addedWord]);
      }
      resetProjectWordForm();
      setShowProjectForm(false);
      alert('Project word added/updated successfully!');
    } catch (error) {
      console.error('Error adding or updating project word:', error);
      alert('Failed to add or update project word.');
    }
  };

  const initiateEditProjectWord = (selectedWord: ProjectWord) => {
    setProjectWord(selectedWord);
    setIsEditing(true);
    setShowProjectForm(true);
  };

  const removeProjectWord = async (id: string) => {
    try {
      await deleteProjectWord(id);
      setProjectWords((prevWords) => prevWords.filter((word) => word.id !== id));
    } catch (error) {
      console.error('Error deleting project word:', error);
    }
  };

  const resetProjectWordForm = () => {
    setProjectWord({
      id: '',
      title: '',
      description: '',
      select: 'no',
    });
    setIsEditing(false);
  };

  const handleProjectWordInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectWord({ ...projectWord, [name]: value });
  };

  const handleSelectProjectWord = async (id: string) => {
    if (isSelectProjectWord && isSelectProjectWord !== id) {
      alert('Another project word is already selected.');
      return;
    }
    try {
      const updatedWord = await updateProjectSelect(id); 

      setProjectWords((prevWords) =>
        prevWords.map((word) =>
          word.id === id ? { ...word, select: updatedWord.select } : word
        )
      );

      if (updatedWord.select === 'yes') {
        const selectedWord = projectWords.find((word) => word.id === id);
        if (selectedWord) {
          setIsSelectProjectWord(id);
          setSelectedProjectWords(selectedWord); 
        }
      } else {
        setIsSelectProjectWord(null); 
        setSelectedProjectWords(null); 
      }
    } catch (error) {
      console.error('Error updating project word select status:', error);
    }
  };

  // Professional Experience management functions
  const loadAllProfessionalExperiences = async () => {
    try {
      const data = await fetchProfessionalExperiences();
      console.log(data)
      setProfessionalExperiences(data);
    } catch (error) {
      console.error('Error fetching professional experiences:', error);
    }
  };

  const handleSaveProfessionalExperience = async () => {
    try {
      const experienceData: ProfessionalExperience = {
        id: isEditingProfessional ? professionalExperience.id : uuidv4(),
        title: professionalExperience.title,
        company: professionalExperience.company,
        description: professionalExperience.description,
        mediaFiles: professionalExperience.mediaFiles,
      };

      if (isEditingProfessional) {
        await updateProfessionalExperience(experienceData.id, experienceData);
        setProfessionalExperiences((prevExperiences) =>
          prevExperiences.map((e) => (e.id === experienceData.id ? { ...e, ...experienceData } : e))
        );
      } else {
        const newExperience = await addProfessionalExperience(experienceData);
        setProfessionalExperiences((prevExperiences) => [...prevExperiences, newExperience]);
      }

      resetProfessionalExperienceForm();
    } catch (error) {
      console.error('Error saving professional experience:', error);
    }
  };

  const initiateEditProfessionalExperience = (selectedExperience: ProfessionalExperience) => {
    setProfessionalExperience(selectedExperience);
    setIsEditingProfessional(true);
    setShowProfessionalForm(true);
  };

  const removeProfessionalExperience = async (id: string) => {
    try {
      await deleteProfessionalExperience(id);
      setProfessionalExperiences((prevExperiences) => prevExperiences.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Error deleting professional experience:', error);
    }
  };

  const resetProfessionalExperienceForm = () => {
    setProfessionalExperience({
      id: '',
      title: '',
      company: '',
      description: '',
      mediaFiles: [],
    });
    setIsEditingProfessional(false);
    setShowProfessionalForm(false);
  };

  const handleProfessionalInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfessionalExperience({ ...professionalExperience, [name]: value });
  };

  const handleProfessionalMediaFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const base64Files = await Promise.all(files.map(fileToBase64));

      setProfessionalExperience((prevExperience) => ({
        ...prevExperience,
        mediaFiles: [...prevExperience.mediaFiles, ...base64Files],
      }));
    }
  };

  const removeProfessionalSelectedFile = (index: number, event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    setProfessionalExperience((prevExperience) => ({
      ...prevExperience,
      mediaFiles: prevExperience.mediaFiles.filter((_, i) => i !== index),
    }));
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        project,
        showProjectForm,
        isEditing,
        loadAllProjects,
        handleSaveProject,
        initiateEditProject,
        removeProject,
        resetProjectForm,
        handleProjectInputChange,
        handleMediaFileChange,
        removeSelectedFile,
        setShowProjectForm,
        projectWords,
        projectWord,
        isSelectProjectWord,
        selectedProjectWords,
        loadAllProjectWords,
        handleAddProjectWord,
        initiateEditProjectWord,
        removeProjectWord,
        resetProjectWordForm,
        handleProjectWordInputChange,
        handleSelectProjectWord,
        professionalExperiences,
        professionalExperience,
        showProfessionalForm,
        isEditingProfessional,
        loadAllProfessionalExperiences,
        handleSaveProfessionalExperience,
        initiateEditProfessionalExperience,
        removeProfessionalExperience,
        resetProfessionalExperienceForm,
        handleProfessionalInputChange,
        handleProfessionalMediaFileChange,
        removeProfessionalSelectedFile,
        setShowProfessionalForm,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

// Custom hook to use ProjectsContext
export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
