'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  fetchImages,
  uploadImages,
  deleteImage,
  fetchHomeWords,
  addHomeWord,
  updateHomeWord,
  deleteHomeWord,
  updateSelect,
  HomeWord,
  getSelectedHomeWords
} from '../../utils/api';

// Define interfaces
interface Image {
  imagename: string;
  path: string;
}

interface ContentContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  openCatalogs: string[];
  toggleCatalog: (catalog: string) => void;
  images: Image[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<void>;
  handleDelete: (imagename: string) => Promise<void>;
  selectedFiles: FileList | null;
  homeword: HomeWord;
  setHomeword: React.Dispatch<React.SetStateAction<HomeWord>>;
  homeWords: HomeWord[];
  showWelcomeForm: boolean;
  setShowWelcomeForm: React.Dispatch<React.SetStateAction<boolean>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddWelcome: () => Promise<void>;
  handleEdit: (word: HomeWord) => void;
  handleDeleteWord: (id: string) => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectClick: (id: string) => Promise<void>;
  isSelectHomeWord: string | null;
  selectedHomeWords: HomeWord | null;
}

// Create context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// ContentProvider component
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  
  // States for managing sections, catalogs, images, home words, and form states
  const [activeSection, setActiveSection] = useState('');
  const [openCatalogs, setOpenCatalogs] = useState<string[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [homeword, setHomeword] = useState<HomeWord>({ id: '', title: '', description: '', select: '' });
  const [homeWords, setHomeWords] = useState<HomeWord[]>([]);
  const [showWelcomeForm, setShowWelcomeForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isSelectHomeWord, setIsSelectHomeWord] = useState<string | null>(null);
  const [selectedHomeWords, setSelectedHomeWords] = useState<HomeWord | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchImagesData();
    fetchWordsData();
  }, []);

  // Section and Catalog Management
  const toggleCatalog = (catalog: string) => {
    setOpenCatalogs(prev =>
      prev.includes(catalog) ? prev.filter(item => item !== catalog) : [...prev, catalog]
    );
  };

  // Image Management
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    try {
      await uploadImages(selectedFiles);
      fetchImagesData();
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const fetchImagesData = async () => {
    try {
      const data = await fetchImages();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleDelete = async (imagename: string) => {
    try {
      await deleteImage(imagename);
      setImages(prevImages => prevImages.filter(img => img.imagename !== imagename));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Home Words Management
  const fetchWordsData = async () => {
    try {
      // Fetch all home words
      const data = await fetchHomeWords();
      setHomeWords(data);

      // Fetch the currently selected home word
      const selectedWord = await getSelectedHomeWords();
      if (selectedWord) {
        setIsSelectHomeWord(selectedWord.id); // Set the ID of the selected home word
        setSelectedHomeWords(selectedWord)
      } else {
        setIsSelectHomeWord(null); // If no word is selected, set it to null
      }
    } catch (error) {
      console.error('Error fetching home words:', error);
    }
  };

  const handleAddWelcome = async () => {
    const { title, description } = homeword;
    if (!title || !description) {
      alert('Please fill out both fields.');
      return;
    }

    try {
      if (editing) {
        await updateHomeWord(homeword);
        setHomeWords((prev) => prev.map((word) => (word.id === homeword.id ? homeword : word)));
        
        // Update selectedHomeWords if the edited homeword matches the selected one
        if (selectedHomeWords && homeword.id === selectedHomeWords.id) {
          setSelectedHomeWords(homeword);
        }
        
        setEditing(false);
      } else {
        const newHomeword = { id: uuidv4(), title, description, select: 'no' };
        await addHomeWord(newHomeword);
        setHomeWords((prev) => [...prev, newHomeword]);
      }
      setHomeword({ id: '', title: '', description: '', select: '' });
      setShowWelcomeForm(false);

      alert('Welcome word added successfully!');
    } catch (error) {
      console.error('Error adding welcome word:', error);
      alert('Failed to add welcome word.');
    }
  };

  const handleEdit = (word: HomeWord) => {
    setHomeword(word);
    setShowWelcomeForm(true);
    setEditing(true);
  };

  const handleDeleteWord = async (id: string) => {
    try {
      await deleteHomeWord(id);
      setHomeWords((prev) => prev.filter((word) => word.id !== id));
      alert('Welcome word deleted successfully!');
    } catch (error) {
      console.error('Error deleting welcome word:', error);
      alert('Failed to delete welcome word.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHomeword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectClick = async (id: string) => {
    if (isSelectHomeWord && isSelectHomeWord !== id) {
      alert('Another home word is already selected.');
      return;
    }

    try {
      const data = await updateSelect(id); // Call the API to update the select status

      // Update the homeWords state to reflect the new selection status
      setHomeWords(prevWords =>
        prevWords.map(word =>
          word.id === id ? { ...word, select: data.select } : word
        )
      );

      if (data.select === 'yes') {
        const selectedWord = homeWords.find(word => word.id === id);

        if (selectedWord) {
          setIsSelectHomeWord(id);
          setSelectedHomeWords(selectedWord); // Set the selected word with its id, title, description
        }
      } else {
        setIsSelectHomeWord(null);
        setSelectedHomeWords(null); // Reset the selectedHomeWords if deselected
      }
    } catch (error) {
      console.error('Failed to update select status:', error);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        activeSection,
        setActiveSection,
        openCatalogs,
        toggleCatalog,
        images,
        handleFileChange,
        handleUpload,
        handleDelete,
        selectedFiles,
        homeword,
        setHomeword,
        homeWords,
        showWelcomeForm,
        setShowWelcomeForm,
        editing,
        setEditing,
        handleAddWelcome,
        handleEdit,
        handleDeleteWord,
        handleInputChange,
        handleSelectClick,
        isSelectHomeWord,
        selectedHomeWords,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook to use ContentContext
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
