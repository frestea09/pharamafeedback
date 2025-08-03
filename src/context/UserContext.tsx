
"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { users as initialUsers, User } from '@/lib/users';

export interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'lastLogin' | 'avatar'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  getUserById: (userId: string) => User | undefined;
  getUserByEmail: (email: string) => User | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = (user: Omit<User, 'id' | 'lastLogin' | 'avatar'>) => {
    const newUser: User = {
        ...user,
        id: `user-${Date.now()}`,
        lastLogin: new Date().toISOString(),
        avatar: `https://placehold.co/100x100.png?text=${user.name.split(" ").map(n => n[0]).join("")}`
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user))
    );
  };

  const deleteUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  }

  const getUserByEmail = (email: string) => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUserById, getUserByEmail }}>
      {children}
    </UserContext.Provider>
  );
};
