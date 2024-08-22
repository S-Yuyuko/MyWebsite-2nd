import React, { ReactNode } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { LoginProvider } from '../context/LoginContext';
import { NavBarProvider } from '../context/NavBarContext';
import { ContentProvider } from '../context/ContentContext';
import { ProjectsProvider } from '../context/ProjectsContext';
import { OtherProvider } from '../context/OtherContext';


interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LoginProvider>
        <NavBarProvider>
          <ContentProvider>
            <ProjectsProvider>
              <OtherProvider>
                {children}
              </OtherProvider> 
            </ProjectsProvider>
          </ContentProvider>
        </NavBarProvider>
      </LoginProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
