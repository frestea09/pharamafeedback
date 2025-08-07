
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { initialReviews } from './data';
import { users } from './users';
import type { User } from './users';
import type { UnitReview } from './definitions';

// --- Temporary In-Memory Data Store ---
let tempUsers: User[] = [...users];
let tempReviews: any[] = [...initialReviews];
let nextReviewId = tempReviews.length + 1;
let nextUserId = tempUsers.length + 1;


// User Actions
const UserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['Admin', 'User']),
    unit: z.string().optional(),
});

const UserUpdateSchema = UserSchema.extend({
    password: z.string().min(6).optional(),
});

export async function validateUser(email: string, password: string) {
    const user = tempUsers.find(u => u.email === email && u.password === password);
    return user ? { ...user } : null;
}

export async function getUsers(filters: { unit?: string }) {
    if (filters.unit) {
        return tempUsers.filter(u => u.unit === filters.unit).sort((a, b) => a.name.localeCompare(b.name));
    }
    return tempUsers.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getUserById(id: string) {
    const user = tempUsers.find(u => u.id === id);
    return user ? { ...user } : null;
}

export async function createUser(data: z.infer<typeof UserSchema>) {
    const validatedData = UserSchema.parse(data);
    const newUser: User = {
        id: `user-${nextUserId++}`,
        ...validatedData,
        lastLogin: new Date().toISOString(),
        avatar: `https://placehold.co/100x100.png?text=${validatedData.name.split(" ").map(n => n[0]).join("")}`
    };
    tempUsers.push(newUser);
    revalidatePath('/admin/users');
    return newUser;
}

export async function updateUser(id: string, data: z.infer<typeof UserUpdateSchema>) {
    const validatedData = UserUpdateSchema.parse(data);
    const userIndex = tempUsers.findIndex(u => u.id === id);

    if (userIndex === -1) {
        throw new Error("User not found");
    }

    const updatedUser = { ...tempUsers[userIndex], ...validatedData };
    if (!validatedData.password || validatedData.password.trim() === '') {
        delete updatedUser.password;
    }

    tempUsers[userIndex] = updatedUser;
    
    revalidatePath(`/admin/users`);
    revalidatePath(`/admin/users/${id}`);
    return updatedUser;
}

export async function deleteUser(id: string) {
    tempUsers = tempUsers.filter(u => u.id !== id);
    revalidatePath('/admin/users');
}

// Review Actions
const ReviewSchema = z.object({
  userId: z.string().nullable().optional(),
  unit: z.string(),
  serviceSpeed: z.enum(["fast", "medium", "slow"]),
  serviceQuality: z.number().min(1).max(5),
  rawCompleteness: z.enum(["complete", "incomplete", "not_applicable"]),
  staffFriendliness: z.number().min(1).max(5),
  comments: z.string().optional(),
});


export async function addReview(data: z.infer<typeof ReviewSchema>) {
    const validatedData = ReviewSchema.parse(data);
    let finalUserId = validatedData.userId;

    if (!finalUserId) {
        let anonymousUser = tempUsers.find(u => u.name === 'Pasien Anonim');
        if (!anonymousUser) {
            anonymousUser = {
                id: 'anon-user',
                name: 'Pasien Anonim',
                email: `anon-${Date.now()}@sim.rs`,
                password: 'N/A',
                role: 'User',
                unit: validatedData.unit,
                lastLogin: new Date().toISOString(),
                avatar: 'https://placehold.co/100x100.png?text=PA'
            };
            tempUsers.push(anonymousUser);
        }
        finalUserId = anonymousUser.id;
    }
    
    const newReview = {
      id: `review-${nextReviewId++}`,
      date: new Date().toISOString(),
      userId: finalUserId,
      ...validatedData,
    };
    tempReviews.unshift(newReview);

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/reviews');
    if (validatedData.userId) {
        revalidatePath(`/dashboard/history?userId=${validatedData.userId}`);
    }
    return newReview;
}

export async function getReviews(filters: {
  unit?: string;
  userName?: string;
  userId?: string;
  from?: Date;
  to?: Date;
}) {
  const { unit, userName, userId, from, to } = filters;
  
  let filteredReviews = tempReviews.map(r => {
    const user = tempUsers.find(u => u.id === r.userId);
    return {
      ...r,
      user: {
        name: user?.name || 'Unknown',
        avatar: user?.avatar || null
      }
    }
  });

  if (unit) filteredReviews = filteredReviews.filter(r => r.unit === unit);
  if (userId) filteredReviews = filteredReviews.filter(r => r.userId === userId);
  if (userName) filteredReviews = filteredReviews.filter(r => r.user.name.toLowerCase().includes(userName.toLowerCase()));
  if (from) filteredReviews = filteredReviews.filter(r => new Date(r.date) >= from);
  if (to) filteredReviews = filteredReviews.filter(r => new Date(r.date) <= to);

  return filteredReviews.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function deleteReview(id: string) {
    tempReviews = tempReviews.filter(r => r.id !== id);
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');
}
