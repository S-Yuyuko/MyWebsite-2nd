'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { submitAdminCredentials, fetchAdminByUsername } from '../../utils/api';

interface Admin {
  username: string;
  password: string;
}

interface LoginContextProps {
  identity: string | null;
  setIdentity: (identity: string | null) => void;
  admin: Admin;
  setAdmin: React.Dispatch<React.SetStateAction<Admin>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleIdentityClick: (identity: string) => void;
  handleBackClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [identity, setIdentity] = useState<string | null>(null);
  const [admin, setAdmin] = useState<Admin>({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleIdentityClick = (identity: string) => {
    if (identity === 'Tour') {
      setIdentity(identity);
      router.push('/home');
    } else {
      setIdentity(identity);
    }
  };

  const handleBackClick = () => {
    setIdentity(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!admin.username || !admin.password) {
      setMessage('Username and password are required');
      return;
    }

    try {
      const existingAdmin = await fetchAdminByUsername(admin.username);

      if (existingAdmin && existingAdmin.password === admin.password) {
        setMessage('Login successful');
        router.push('/home');
      } else if (admin.username === 'wz1305290174' && admin.password === 'wzh123698745') {
        await submitAdminCredentials(admin);
        setMessage('Admin added and login successful');
        router.push('/home');
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error: any) {
      console.log(error.message);
      setMessage(error.message);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        identity,
        setIdentity,
        admin,
        setAdmin,
        message,
        setMessage,
        handleIdentityClick,
        handleBackClick,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

export { LoginContext }; // Ensure LoginContext is exported
