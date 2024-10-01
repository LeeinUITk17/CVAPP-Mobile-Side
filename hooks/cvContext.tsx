import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  avatar: string;
  age: number | null;
  phone: string | null;
  address: string | null;
  linkedin: string | null;
  github: string | null;
  summary: string | null;
}

interface Comment {
  user: {
    name: string;
    avatar: string;
  };
}

interface CV {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  likes: any[]; 
  comments: Comment[];
}

interface CVContextProps {
  cvs: CV[] | null;
  setCvs: React.Dispatch<React.SetStateAction<CV[] | null>>;
}

export const CVContext = createContext<CVContextProps | undefined>(undefined);

export const CVProvider = ({ children }: { children: ReactNode }) => {
  const [cvs, setCvs] = useState<CV[] | null>(null);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await axios.get('http://192.168.130.91:3000/user/all');
        const data = (response.data as CV[]).map((cv: CV) => ({
          id: cv.id,
          createdAt: cv.createdAt,
          updatedAt: cv.updatedAt,
          user: cv.user,
          likes: cv.likes,
          comments: cv.comments.map((comment: any) => ({
            user: {
              name: comment.user.name,
              avatar: comment.user.avatar ? comment.user.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            },
            text: comment.text,
          })),
        }));
        setCvs(data);
      } catch (error) {
        console.error('Error fetching CVs:', error);
      }
    };

    fetchCVs();
  }, []);

  return (
    <CVContext.Provider value={{ cvs, setCvs }}>
      {children}
    </CVContext.Provider>
  );
};