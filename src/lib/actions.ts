
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';

// --- User Actions ---
const UserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['Admin', 'User']),
    unit: z.string().optional(),
});

const UserUpdateSchema = UserSchema.extend({
    password: z.string().min(6).optional().or(z.literal('')),
});

export async function validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    // In a real app, you'd use a secure password hashing library like bcrypt
    if (user && user.password === password) {
        return user;
    }
    return null;
}

export async function getUsers(filters: { unit?: string }) {
    const whereClause: any = {};
    if (filters.unit) {
        whereClause.unit = filters.unit;
    }
    return await prisma.user.findMany({ where: whereClause, orderBy: { name: 'asc' } });
}

export async function getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
}

export async function createUser(data: z.infer<typeof UserSchema>) {
    const validatedData = UserSchema.parse(data);
    const newUser = await prisma.user.create({
        data: {
            ...validatedData,
            avatar: `https://placehold.co/100x100.png?text=${validatedData.name.split(" ").map(n => n[0]).join("")}`
        }
    });
    revalidatePath('/admin/users');
    return newUser;
}

export async function updateUser(id: string, data: z.infer<typeof UserUpdateSchema>) {
    const validatedData = UserUpdateSchema.parse(data);
    const updateData: any = { ...validatedData };
    
    if (!validatedData.password || validatedData.password.trim() === '') {
        delete updateData.password;
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData
    });
    
    revalidatePath(`/admin/users`);
    revalidatePath(`/admin/users/${id}`);
    return updatedUser;
}

export async function deleteUser(id: string) {
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin/users');
}


// --- Review Actions ---
const ReviewSchema = z.object({
  userId: z.string().nullable().optional(),
  unit: z.string(),
  serviceSpeed: z.enum(["fast", "medium", "slow"]),
  rawCompleteness: z.enum(["complete", "incomplete", "not_applicable"]),
  comments: z.string().optional(),
  // New fields for thumbs up/down
  serviceQualityNew: z.enum(["positive", "negative"]),
  staffFriendlinessNew: z.enum(["positive", "negative"]),
});


export async function addReview(data: z.infer<typeof ReviewSchema>) {
    const validatedData = ReviewSchema.parse(data);
    let finalUserId = validatedData.userId;

    // Handle anonymous kiosk users
    if (!finalUserId) {
        const anonymousUser = await prisma.user.upsert({
            where: { email: 'anonymous@sim.rs' },
            update: {},
            create: {
                name: 'Pasien Anonim',
                email: 'anonymous@sim.rs',
                password: 'N/A', // Not used for login
                role: 'User',
                avatar: 'https://placehold.co/100x100.png?text=PA'
            }
        });
        finalUserId = anonymousUser.id;
    }
    
    const newReview = await prisma.review.create({
        data: {
            userId: finalUserId,
            unit: validatedData.unit,
            serviceSpeed: validatedData.serviceSpeed,
            rawCompleteness: validatedData.rawCompleteness,
            comments: validatedData.comments,
            serviceQualityNew: validatedData.serviceQualityNew,
            staffFriendlinessNew: validatedData.staffFriendlinessNew,
            // Set legacy fields to a default value (e.g., 0 or 3) for type consistency
            serviceQuality: 0,
            staffFriendliness: 0,
        }
    });

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
  
  const whereClause: any = {};
  if (unit) whereClause.unit = unit;
  if (userId) whereClause.userId = userId;
  if (userName) whereClause.user = { name: { contains: userName, mode: 'insensitive' } };
  if (from) whereClause.date = { ...whereClause.date, gte: from };
  if (to) whereClause.date = { ...whereClause.date, lte: to };

  const reviews = await prisma.review.findMany({
      where: whereClause,
      include: {
          user: {
              select: {
                  name: true,
                  avatar: true,
              }
          }
      },
      orderBy: {
          date: 'desc'
      }
  });
  return reviews;
}

export async function deleteReview(id: string) {
    await prisma.review.delete({ where: { id } });
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');
}
