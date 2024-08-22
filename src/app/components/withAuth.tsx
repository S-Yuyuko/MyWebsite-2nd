'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useContext, useState } from 'react';
import { LoginContext } from '../context/LoginContext'; // Adjust the import path as needed
import Loading from './Loading'; // Adjust the import path as needed

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const context = useContext(LoginContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (context && context.identity !== undefined) {
        if (!context.identity) {
          router.push('/');
        }
        setLoading(false); // Context is loaded, no longer loading
      }
    }, [context, router]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
