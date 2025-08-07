
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';
import { initialReviews } from './data';
import { users, User } from './users';
import { UnitReview } from './definitions';

// --- User Actions ---
const UserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['Admin', 'User', 'KepalaUnit']),
    unit: z.string().optional(),
});

const UserUpdateSchema = UserSchema.extend({
    password: z.string().min(6).optional().or(z.literal('')),
});

export async function validateUser(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    // In a real app, you'd use a secure password hashing library like bcrypt
    if (user && user.password === password) {
        return user;
    }
    return null;
    // const user = users.find(u => u.email === email && u.password === password);
    // return user || null;
}

export async function getUsers(filters: { unit?: string }): Promise<User[]> {
    const whereClause: any = {};
    if (filters.unit) {
        whereClause.unit = filters.unit;
    }
    return await prisma.user.findMany({ where: whereClause, orderBy: { name: 'asc' } });

    // if (filters.unit) {
    //     return users.filter(user => user.unit === filters.unit);
    // }
    // return users;
}

export async function getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
    // return users.find(u => u.id === id) || null;
}

export async function createUser(data: z.infer<typeof UserSchema>): Promise<User> {
    const validatedData = UserSchema.parse(data);
    const newUser = await prisma.user.create({
        data: {
            ...validatedData,
            avatar: `https://placehold.co/100x100.png?text=${validatedData.name.split(" ").map(n => n[0]).join("")}`,
        },
    });

    revalidatePath('/admin/users');
    return newUser;

    // const newUser: User = {
    //     id: `user-${Date.now()}`,
    //     ...validatedData,
    //     lastLogin: new Date().toISOString(),
    //     avatar: `https://placehold.co/100x100.png?text=${validatedData.name.split(" ").map(n => n[0]).join("")}`
    // };
    // users.push(newUser);
    // revalidatePath('/admin/users');
    // return newUser;
}

export async function updateUser(id: string, data: z.infer<typeof UserUpdateSchema>): Promise<User> {
    const validatedData = UserUpdateSchema.parse(data);
    
    const updateData: any = { ...validatedData };
    if (!validatedData.password || validatedData.password.trim() === '') {
        delete updateData.password;
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
    });
    
    revalidatePath(`/admin/users`);
    revalidatePath(`/admin/users/${id}`);
    return updatedUser;
    
    // const userIndex = users.findIndex(u => u.id === id);

    // if (userIndex === -1) {
    //     throw new Error("User not found");
    // }

    // const updatedUser = { ...users[userIndex], ...validatedData };
    
    // if (!validatedData.password || validatedData.password.trim() === '') {
    //     delete updatedUser.password;
    // } else {
    //     updatedUser.password = validatedData.password;
    // }

    // users[userIndex] = updatedUser;
    
    // revalidatePath(`/admin/users`);
    // revalidatePath(`/admin/users/${id}`);
    // return updatedUser;
}

export async function deleteUser(id: string) {
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin/users');
    
    // const userIndex = users.findIndex(u => u.id === id);
    // if (userIndex > -1) {
    //     users.splice(userIndex, 1);
    // }
    // revalidatePath('/admin/users');
}


// --- Review Actions ---
const ReviewSchema = z.object({
  userId: z.string().nullable().optional(),
  unit: z.string(),
  serviceSpeed: z.enum(["fast", "medium", "slow"]).optional(),
  rawCompleteness: z.enum(["complete", "incomplete", "not_applicable"]).optional(),
  comments: z.string().optional(),
  // New fields for thumbs up/down
  serviceQualityNew: z.enum(["positive", "negative"]),
  staffFriendlinessNew: z.enum(["positive", "negative"]),
});


export async function addReview(data: z.infer<typeof ReviewSchema>) {
    const validatedData = ReviewSchema.parse(data);
    let finalUserId = validatedData.userId;

    if (!finalUserId) {
      let anonymousUser = await prisma.user.findFirst({ where: { email: 'anonymous@sim.rs' } });
      if (!anonymousUser) {
        anonymousUser = await prisma.user.create({
          data: {
            name: 'Pasien Anonim',
            email: 'anonymous@sim.rs',
            password: 'N/A', // Not used for login
            role: 'User',
            avatar: 'https://placehold.co/100x100.png?text=PA'
          }
        });
      }
      finalUserId = anonymousUser.id;
    }
    
    const newReviewData = {
      userId: finalUserId,
      unit: validatedData.unit,
      serviceSpeed: validatedData.serviceSpeed,
      rawCompleteness: validatedData.rawCompleteness,
      comments: validatedData.comments || '',
      serviceQualityNew: validatedData.serviceQualityNew,
      staffFriendlinessNew: validatedData.staffFriendlinessNew,
      serviceQuality: 0, 
      staffFriendliness: 0,
    };
    
    const newReview = await prisma.review.create({ data: newReviewData });

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
}): Promise<UnitReview[]> {
  const { unit, userName, userId, from, to } = filters;
  
  const whereClause: any = {};
  if (unit) whereClause.unit = unit;
  if (userId) whereClause.userId = userId;
  if (from) whereClause.date = { ...whereClause.date, gte: from };
  if (to) whereClause.date = { ...whereClause.date, lte: to };
  if (userName) whereClause.user = { name: { contains: userName, mode: 'insensitive' }};
  
  const reviews = await prisma.review.findMany({
    where: whereClause,
    include: {
      user: {
        select: { name: true, avatar: true }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });

  return reviews.map(review => ({
    ...review,
    user: {
      name: review.user.name,
      avatar: review.user.avatar
    }
  }));
}

export async function deleteReview(id: string) {
    await prisma.review.delete({ where: { id: id } });
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');
}
