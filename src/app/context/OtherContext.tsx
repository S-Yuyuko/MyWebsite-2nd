'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  fetchAboutItems,
  addAboutItem,
  updateAboutItem,
  deleteAboutItem,
  updateAboutSelect,
  getSelectedAboutItem,
  AboutItem,
} from '../../utils/api';
import {
  fetchMoreItems,
  addMoreItem,
  updateMoreItem,
  deleteMoreItem,
  updateMoreSelect,
  getSelectedMoreItem,
  MoreItem,
} from '../../utils/api';

interface OtherContextType {
  // About Items
  aboutItems: AboutItem[];
  aboutItem: AboutItem;
  isSelectAboutItem: string | null;
  selectedAboutItem: AboutItem | null;
  showAboutForm: boolean;
  loadAllAboutItems: () => void;
  handleAddAboutItem: () => void;
  initiateEditAboutItem: (selectedItem: AboutItem) => void;
  removeAboutItem: (id: string) => void;
  resetAboutForm: () => void;
  handleAboutInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectAboutItem: (id: string) => void;
  setShowAboutForm: React.Dispatch<React.SetStateAction<boolean>>;

  // More Items
  moreItems: MoreItem[];
  moreItem: MoreItem;
  isSelectMoreItem: string | null;
  selectedMoreItem: MoreItem | null;
  showMoreForm: boolean;
  loadAllMoreItems: () => void;
  handleAddMoreItem: () => void;
  initiateEditMoreItem: (selectedItem: MoreItem) => void;
  removeMoreItem: (id: string) => void;
  resetMoreForm: () => void;
  handleMoreInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectMoreItem: (id: string) => void;
  setShowMoreForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context
const OtherContext = createContext<OtherContextType | undefined>(undefined);

export const OtherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for managing About items
  const [aboutItems, setAboutItems] = useState<AboutItem[]>([]);
  const [aboutItem, setAboutItem] = useState<AboutItem>({
    id: '',
    introduction: '',
    skills: '',
    education: '',
    select: 'no',
  });
  const [isSelectAboutItem, setIsSelectAboutItem] = useState<string | null>(null);
  const [selectedAboutItem, setSelectedAboutItem] = useState<AboutItem | null>(null);
  const [showAboutForm, setShowAboutForm] = useState<boolean>(false);

  // State for managing More items
  const [moreItems, setMoreItems] = useState<MoreItem[]>([]);
  const [moreItem, setMoreItem] = useState<MoreItem>({
    id: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    select: 'no',
  });
  const [isSelectMoreItem, setIsSelectMoreItem] = useState<string | null>(null);
  const [selectedMoreItem, setSelectedMoreItem] = useState<MoreItem | null>(null);
  const [showMoreForm, setShowMoreForm] = useState<boolean>(false);

  useEffect(() => {
    loadAllAboutItems();
    loadAllMoreItems();
  }, []);

  // Fetch and load all about items
  const loadAllAboutItems = async () => {
    try {
      const data = await fetchAboutItems();
      setAboutItems(data);

      const selectedItem = await getSelectedAboutItem();
      if (selectedItem) {
        setIsSelectAboutItem(selectedItem.id);
        setSelectedAboutItem(selectedItem)
      } else {
        setIsSelectAboutItem(null);
      }
    } catch (error) {
      console.error('Error fetching about items:', error);
    }
  };

  // Fetch and load all more items
  const loadAllMoreItems = async () => {
    try {
      const data = await fetchMoreItems();
      setMoreItems(data);

      const selectedItem = await getSelectedMoreItem();
      if (selectedItem) {
        setIsSelectMoreItem(selectedItem.id);
        setSelectedMoreItem(selectedItem)
      } else {
        setIsSelectMoreItem(null);
      }
    } catch (error) {
      console.error('Error fetching more items:', error);
    }
  };

  // Handle adding or updating about item
  const handleAddAboutItem = async () => {
    const { introduction, skills, education } = aboutItem;
    if (!introduction || !skills || !education) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      if (aboutItem.id) {
        await updateAboutItem(aboutItem);
        setAboutItems((prevItems) =>
          prevItems.map((item) => (item.id === aboutItem.id ? aboutItem : item))
        );

        // Update selectedAboutItem if the edited aboutItem matches the selected one
        if (selectedAboutItem && aboutItem.id === selectedAboutItem.id) {
          setSelectedAboutItem(aboutItem);
        }
      } else {
        const newItem = { id: uuidv4(), introduction, skills, education, select: 'no' };
        const addedItem = await addAboutItem(newItem);
        setAboutItems((prevItems) => [...prevItems, addedItem]);
      }
      resetAboutForm();
    } catch (error) {
      console.error('Error adding or updating about item:', error);
      alert('Failed to add or update about item.');
    }
  };

  // Handle adding or updating more item
  const handleAddMoreItem = async () => {
    const { email, phone, github, linkedin } = moreItem;
    if (!email || !phone || !github || !linkedin) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      if (moreItem.id) {
        await updateMoreItem(moreItem);
        setMoreItems((prevItems) =>
          prevItems.map((item) => (item.id === moreItem.id ? moreItem : item))
        );

        // Update selectedMoreItem if the edited moreItem matches the selected one
        if (selectedMoreItem && moreItem.id === selectedMoreItem.id) {
          setSelectedMoreItem(moreItem);
        }
        
      } else {
        const newItem = { id: uuidv4(), email, phone, github, linkedin, select: 'no' };
        const addedItem = await addMoreItem(newItem);
        setMoreItems((prevItems) => [...prevItems, addedItem]);
      }
      resetMoreForm();
    } catch (error) {
      console.error('Error adding or updating more item:', error);
      alert('Failed to add or update more item.');
    }
  };

  // Initialize edit mode for about item
  const initiateEditAboutItem = (selectedItem: AboutItem) => {
    setAboutItem(selectedItem);
    setShowAboutForm(true);
  };

  // Initialize edit mode for more item
  const initiateEditMoreItem = (selectedItem: MoreItem) => {
    setMoreItem(selectedItem);
    setShowMoreForm(true);
  };

  // Handle deleting an about item
  const removeAboutItem = async (id: string) => {
    try {
      await deleteAboutItem(id);
      setAboutItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting about item:', error);
    }
  };

  // Handle deleting a more item
  const removeMoreItem = async (id: string) => {
    try {
      await deleteMoreItem(id);
      setMoreItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting more item:', error);
    }
  };

  // Reset the about form
  const resetAboutForm = () => {
    setAboutItem({
      id: '',
      introduction: '',
      skills: '',
      education: '',
      select: 'no',
    });
    setShowAboutForm(false);
  };

  // Reset the more form
  const resetMoreForm = () => {
    setMoreItem({
      id: '',
      email: '',
      phone: '',
      github: '',
      linkedin: '',
      select: 'no',
    });
    setShowMoreForm(false);
  };

  // Handle input change for about form
  const handleAboutInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutItem({ ...aboutItem, [name]: value });
  };

  // Handle input change for more form
  const handleMoreInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMoreItem({ ...moreItem, [name]: value });
  };

  // Handle selecting an about item
  const handleSelectAboutItem = async (id: string) => {
    if (isSelectAboutItem && isSelectAboutItem !== id) {
      alert('Another about item is already selected.');
      return;
    }
    try {
      const updatedItem = await updateAboutSelect(id);

      setAboutItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, select: updatedItem.select } : item
        )
      );

      if (updatedItem.select === 'yes') {
        const selectedItem = aboutItems.find((item) => item.id === id);
        if (selectedItem) {
          setIsSelectAboutItem(id);
          setSelectedAboutItem(selectedItem);
        }
      } else {
        setIsSelectAboutItem(null);
        setSelectedAboutItem(null);
      }
    } catch (error) {
      console.error('Error updating about item select status:', error);
    }
  };

  // Handle selecting a more item
  const handleSelectMoreItem = async (id: string) => {
    if (isSelectMoreItem && isSelectMoreItem !== id) {
      alert('Another more item is already selected.');
      return;
    }
    try {
      const updatedItem = await updateMoreSelect(id);

      setMoreItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, select: updatedItem.select } : item
        )
      );

      if (updatedItem.select === 'yes') {
        const selectedItem = moreItems.find((item) => item.id === id);
        if (selectedItem) {
          setIsSelectMoreItem(id);
          setSelectedMoreItem(selectedItem);
        }
      } else {
        setIsSelectMoreItem(null);
        setSelectedMoreItem(null);
      }
    } catch (error) {
      console.error('Error updating more item select status:', error);
    }
  };

  return (
    <OtherContext.Provider
      value={{
        aboutItems,
        aboutItem,
        isSelectAboutItem,
        selectedAboutItem,
        showAboutForm,
        loadAllAboutItems,
        handleAddAboutItem,
        initiateEditAboutItem,
        removeAboutItem,
        resetAboutForm,
        handleAboutInputChange,
        handleSelectAboutItem,
        setShowAboutForm,
        moreItems,
        moreItem,
        isSelectMoreItem,
        selectedMoreItem,
        showMoreForm,
        loadAllMoreItems,
        handleAddMoreItem,
        initiateEditMoreItem,
        removeMoreItem,
        resetMoreForm,
        handleMoreInputChange,
        handleSelectMoreItem,
        setShowMoreForm,
      }}
    >
      {children}
    </OtherContext.Provider>
  );
};

// Custom hook to use the OtherContext
export const useOther = (): OtherContextType => {
  const context = useContext(OtherContext);
  if (context === undefined) {
    throw new Error('useOther must be used within a OtherProvider');
  }
  return context;
};
