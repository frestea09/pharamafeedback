
import { create } from 'zustand';
import { users as initialUsers, User } from '@/lib/users';

interface UserState {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'lastLogin' | 'avatar'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  getUserById: (userId: string) => User | undefined;
  getUserByEmail: (email: string) => User | undefined;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: initialUsers,
  addUser: (user) => {
    const newUser: User = {
        ...user,
        id: `user-${Date.now()}`,
        lastLogin: new Date().toISOString(),
        avatar: `https://placehold.co/100x100.png?text=${user.name.split(" ").map(n => n[0]).join("")}`
    };
    set(state => ({ users: [newUser, ...state.users] }));
  },
  updateUser: (updatedUser) => {
    set(state => ({
      users: state.users.map(user => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user))
    }));
  },
  deleteUser: (userId) => {
    set(state => ({
      users: state.users.filter(user => user.id !== userId)
    }));
  },
  getUserById: (userId) => {
    return get().users.find(user => user.id === userId);
  },
  getUserByEmail: (email) => {
    return get().users.find(user => user.email.toLowerCase() === email.toLowerCase());
  },
}));
