'use client'
import {useEffect} from 'react'; // Import ReactNode and useEffect
import { useRouter } from 'next/navigation';
import { getTokenFromLocalStorage } from './GetSetToken';

const ProtectedRoute= ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const token = getTokenFromLocalStorage("jsonwebtoken");
    if (!token) {
      router.push('/'); // Redirect to the login page if not authenticated
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;