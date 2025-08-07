
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
// import prisma from './prisma';
import { initialReviews, RawUnitReview } from './data';
import { users, User } from './users';
import { UnitReview } from './definitions';

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

export async function validateUser(email: string, password: string): Promise<User | null> {
    // const user = await prisma.user.findUnique({ where: { email } });
    // // In a real app, you'd use a secure password hashing library like bcrypt
    // if (user && user.password === password) {
    //     return user;
    // }
    // return null;
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
}

export async function getUsers(filters: { unit?: string }): Promise<User[]> {
    // const whereClause: any = {};
    // if (filters.unit) {
    //     whereClause.unit = filters.unit;
    // }
    // return await prisma.user.findMany({ where: whereClause, orderBy: { name: 'asc' } });

    if (filters.unit) {
        return users.filter(user => user.unit === filters.unit);
    }
    return users;
}

export async function getUserById(id: string): Promise<User | null> {
    // return await prisma.user.findUnique({ where: { id } });
    return users.find(u => u.id === id) || null;
}

export async function createUser(data: z.infer<typeof UserSchema>): Promise<User> {
    const validatedData = UserSchema.parse(data);
    const newUser: User = {
        id: `user-${Date.now()}`,
        ...validatedData,
        lastLogin: new Date().toISOString(),
        avatar: `https://placehold.co/100x100.png?text=${validatedData.name.split(" ").map(n => n[0]).join("")}`
    };
    users.push(newUser);
    revalidatePath('/admin/users');
    return newUser;
}

export async function updateUser(id: string, data: z.infer<typeof UserUpdateSchema>): Promise<User> {
    const validatedData = UserUpdateSchema.parse(data);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        throw new Error("User not found");
    }

    const updatedUser = { ...users[userIndex], ...validatedData };
    
    if (!validatedData.password || validatedData.password.trim() === '') {
        delete updatedUser.password;
    } else {
        updatedUser.password = validatedData.password;
    }

    users[userIndex] = updatedUser;
    
    revalidatePath(`/admin/users`);
    revalidatePath(`/admin/users/${id}`);
    return updatedUser;
}

export async function deleteUser(id: string) {
    // await prisma.user.delete({ where: { id } });
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex > -1) {
        users.splice(userIndex, 1);
    }
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
        let anonymousUser = users.find(u => u.email === 'anonymous@sim.rs');
        if (!anonymousUser) {
            anonymousUser = {
                id: `user-${Date.now()}`,
                name: 'Pasien Anonim',
                email: 'anonymous@sim.rs',
                password: 'N/A', // Not used for login
                role: 'User',
                lastLogin: new Date().toISOString(),
                avatar: 'https://placehold.co/100x100.png?text=PA'
            };
            users.push(anonymousUser);
        }
        finalUserId = anonymousUser.id;
    }
    
    const newReview = {
        id: `review-${Date.now()}`,
        date: new Date().toISOString(),
        userId: finalUserId,
        unit: validatedData.unit,
        serviceSpeed: validatedData.serviceSpeed,
        rawCompleteness: validatedData.rawCompleteness,
        comments: validatedData.comments || '',
        serviceQualityNew: validatedData.serviceQualityNew,
        staffFriendlinessNew: validatedData.staffFriendlinessNew,
        // Set legacy fields to a default value (e.g., 0 or 3) for type consistency
        serviceQuality: 0,
        staffFriendliness: 0,
    };
    
    initialReviews.unshift(newReview);

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
  
  let filteredReviews = [...initialReviews];

  if (unit) filteredReviews = filteredReviews.filter(r => r.unit === unit);
  if (userId) filteredReviews = filteredReviews.filter(r => r.userId === userId);
  
  if (from) filteredReviews = filteredReviews.filter(r => new Date(r.date) >= from);
  if (to) filteredReviews = filteredReviews.filter(r => new Date(r.date) <= to);

  const populatedReviews = filteredReviews.map(review => {
      const user = users.find(u => u.id === review.userId);
      return {
          ...review,
          id: review.id.toString(),
          createdAt: new Date(review.date),
          updatedAt: new Date(review.date),
          date: new Date(review.date),
          serviceQuality: review.serviceQuality || 0,
          staffFriendliness: review.staffFriendliness || 0,
          user: {
              name: user?.name || 'Pengguna Anonim',
              avatar: user?.avatar || 'https://placehold.co/100x100.png?text=PA',
          }
      };
  });

  if (userName) {
    return populatedReviews.filter(r => r.user.name.toLowerCase().includes(userName.toLowerCase()));
  }

  return populatedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function deleteReview(id: string) {
    const reviewIndex = initialReviews.findIndex(r => r.id === id);
    if (reviewIndex > -1) {
        initialReviews.splice(reviewIndex, 1);
    }
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');
}
