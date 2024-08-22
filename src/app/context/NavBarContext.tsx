'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLogin } from './LoginContext';
import AdminInfoDialog from '../components/navbar/AdminInfoDialog';

interface NavBarContextProps {
  isMenuOpen: boolean;
  isDialogOpen: boolean;
  toggleMenu: () => void;
  handleLogout: () => void;
  openDialog: () => void;
  closeDialog: () => void;
  identity: string | null;
  pathname: string;
}

const NavBarContext = createContext<NavBarContextProps | undefined>(undefined);

export const NavBarProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { identity, setIdentity } = useLogin();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIdentity(null);
    router.push('/');
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    setIsMenuOpen(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <NavBarContext.Provider
      value={{
        isMenuOpen,
        isDialogOpen,
        toggleMenu,
        handleLogout,
        openDialog,
        closeDialog,
        identity,
        pathname,
      }}
    >
      {children}
      {isDialogOpen && <AdminInfoDialog onClose={closeDialog} />}
    </NavBarContext.Provider>
  );
};

export const useNavBar = (): NavBarContextProps => {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }
  return context;
};
