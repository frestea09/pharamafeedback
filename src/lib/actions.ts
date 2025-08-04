
'use server';

import prisma from './prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
        return null;
    }
    return user;
}

export async function getUsers(filters: { unit?: string }) {
    return await prisma.user.findMany({
        where: {
            // If a unit is provided, filter by it. Admins without a unit can see all users.
            unit: filters.unit,
        },
        orderBy: {
            name: 'asc'
        }
    });
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
    
    // Prepare data, excluding password if it's not provided or empty
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
}

export async function deleteUser(id: string) {
    await prisma.user.delete({ where: { id } });
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
    let anonymousUser;

    // Handle anonymous submissions from kiosk mode
    if (!validatedData.userId) {
        anonymousUser = await prisma.user.findFirst({
            where: { name: 'Pasien Anonim' },
        });

        if (!anonymousUser) {
            anonymousUser = await prisma.user.create({
                data: {
                    name: 'Pasien Anonim',
                    email: `anon-${Date.now()}@sim.rs`,
                    password: 'N/A',
                    role: 'User',
                    unit: validatedData.unit,
                }
            });
        }
        validatedData.userId = anonymousUser.id;
    }
    
    const review = await prisma.review.create({
      data: {
        userId: validatedData.userId,
        unit: validatedData.unit,
        serviceSpeed: validatedData.serviceSpeed,
        serviceQuality: validatedData.serviceQuality,
        staffFriendliness: validatedData.staffFriendliness,
        rawCompleteness: validatedData.rawCompleteness,
        comments: validatedData.comments,
      },
    });
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/reviews');
    if (validatedData.userId) {
        revalidatePath(`/dashboard/history?userId=${validatedData.userId}`);
    }
    return review;
}

export async function getReviews(filters: {
  unit?: string;
  userName?: string;
  userId?: string;
  from?: Date;
  to?: Date;
}) {
  const { unit, userName, userId, from, to } = filters;
  const where: any = {};

  if (unit) where.unit = unit;
  if (userId) where.userId = userId;
  if (userName) where.user = { name: { contains: userName } };
  if (from) where.date = { ...where.date, gte: from };
  if (to) where.date = { ...where.date, lte: to };

  return await prisma.review.findMany({
    where,
    include: {
      user: {
        select: { name: true, avatar: true },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });
}

export async function deleteReview(id: string) {
    await prisma.review.delete({ where: { id } });
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');
}
