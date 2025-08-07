
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from './prisma';
import { initialReviews } from './data';
import { users, User } from './users';
import { UnitReview } from './definitions';
import { logActivity } from './logger';

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
    // --- Prisma Implementation ---
    // const user = await prisma.user.findUnique({ where: { email } });
    // // In a real app, you'd use a secure password hashing library like bcrypt
    // if (user && user.password === password) {
    //     return user;
    // }
    // return null;

    // --- Array Implementation ---
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        logActivity(`Pengguna ${user.name} (${user.role}) berhasil login.`);
    } else {
        logActivity(`Percobaan login gagal untuk email: ${email}.`);
    }
    return user || null;
}

export async function getUsers(filters: { unit?: string }): Promise<User[]> {
    // --- Prisma Implementation ---
    // const whereClause: any = {};
    // if (filters.unit) {
    //     whereClause.unit = filters.unit;
    // }
    // return await prisma.user.findMany({ where: whereClause, orderBy: { name: 'asc' } });
    
    // --- Array Implementation ---
    if (filters.unit) {
        return users.filter(user => user.unit === filters.unit);
    }
    return users.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getUserById(id: string): Promise<User | null> {
     // --- Prisma Implementation ---
    // return await prisma.user.findUnique({ where: { id } });

    // --- Array Implementation ---
    return users.find(u => u.id === id) || null;
}

export async function createUser(data: z.infer<typeof UserSchema>): Promise<User> {
    const validatedData = UserSchema.parse(data);
    
    // --- Prisma Implementation ---
    // const newUser = await prisma.user.create({
    //     data: {
    //         ...validatedData,
    //         avatar: `https://placehold.co/100x100.png?text=${validatedData.name.split(" ").map(n => n[0]).join("")}`,
    //     },
    // });
    // revalidatePath('/admin/users');
    // return newUser;

    // --- Array Implementation ---
    const newUser: User = {
        id: `user-${Date.now()}`,
        ...validatedData,
        lastLogin: new Date().toISOString(),
        avatar: `https://placehold.co/100x100.png?text=${validatedData.name.split(" ").map(n => n[0]).join("")}`
    };
    users.push(newUser);
    logActivity(`Pengguna baru "${newUser.name}" (${newUser.role}) telah dibuat.`);
    revalidatePath('/admin/users');
    return newUser;
}

export async function updateUser(id: string, data: z.infer<typeof UserUpdateSchema>): Promise<User> {
    const validatedData = UserUpdateSchema.parse(data);
    
    // --- Prisma Implementation ---
    // const updateData: any = { ...validatedData };
    // if (!validatedData.password || validatedData.password.trim() === '') {
    //     delete updateData.password;
    // }
    // const updatedUser = await prisma.user.update({
    //     where: { id },
    //     data: updateData,
    // });
    // revalidatePath(`/admin/users`);
    // revalidatePath(`/admin/users/${id}`);
    // return updatedUser;

    // --- Array Implementation ---
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        throw new Error("User not found");
    }
    
    const existingUser = users[userIndex];
    const updatedUser = { ...existingUser, ...validatedData };
    
    if (!validatedData.password || validatedData.password.trim() === '') {
        updatedUser.password = existingUser.password;
    }

    users[userIndex] = updatedUser;
    logActivity(`Data pengguna "${updatedUser.name}" telah diperbarui.`);
    revalidatePath(`/admin/users`);
    revalidatePath(`/admin/users/${id}`);
    return updatedUser;
}

export async function deleteUser(id: string) {
    // --- Prisma Implementation ---
    // await prisma.user.delete({ where: { id } });
    // revalidatePath('/admin/users');

    // --- Array Implementation ---
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex > -1) {
        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);
        logActivity(`Pengguna "${deletedUser.name}" telah dihapus.`);
    }
    revalidatePath('/admin/users');
}


// --- Review Actions ---
const ReviewSchema = z.object({
  userId: z.string().nullable().optional(),
  unit: z.string(),
  serviceSpeed: z.enum(["fast", "medium", "slow"]).optional(),
  rawCompleteness: z.enum(["complete", "incomplete", "not_applicable"]).optional(),
  comments: z.string().optional(),
  serviceQualityNew: z.enum(["positive", "negative"]),
  staffFriendlinessNew: z.enum(["positive", "negative"]),
});


export async function addReview(data: z.infer<typeof ReviewSchema>) {
    const validatedData = ReviewSchema.parse(data);
    
    // --- Prisma Implementation ---
    // let finalUserId = validatedData.userId;
    // if (!finalUserId) {
    //   let anonymousUser = await prisma.user.findFirst({ where: { email: 'anonymous@sim.rs' } });
    //   if (!anonymousUser) {
    //     anonymousUser = await prisma.user.create({
    //       data: {
    //         name: 'Pasien Anonim',
    //         email: 'anonymous@sim.rs',
    //         password: 'N/A',
    //         role: 'User',
    //         avatar: 'https://placehold.co/100x100.png?text=PA'
    //       }
    //     });
    //   }
    //   finalUserId = anonymousUser.id;
    // }
    // const newReviewData = {
    //   userId: finalUserId,
    //   unit: validatedData.unit,
    //   serviceSpeed: validatedData.serviceSpeed || 'medium',
    //   rawCompleteness: validatedData.rawCompleteness || 'not_applicable',
    //   comments: validatedData.comments || '',
    //   serviceQualityNew: validatedData.serviceQualityNew,
    //   staffFriendlinessNew: validatedData.staffFriendlinessNew,
    //   serviceQuality: 0, 
    //   staffFriendliness: 0,
    // };
    // const newReview = await prisma.review.create({ data: newReviewData });

    // --- Array Implementation ---
    let finalUserId = validatedData.userId;
    let userName = "Pasien Anonim";
    if (!finalUserId) {
        let anonymousUser = users.find(u => u.email === 'anonymous@sim.rs');
        if (!anonymousUser) {
            anonymousUser = {
                id: 'anonymous-user',
                name: 'Pasien Anonim',
                email: 'anonymous@sim.rs',
                role: 'User',
                lastLogin: new Date().toISOString(),
                avatar: 'https://placehold.co/100x100.png?text=PA'
            };
            users.push(anonymousUser);
        }
        finalUserId = anonymousUser.id;
    } else {
        const currentUser = users.find(u => u.id === finalUserId);
        if (currentUser) {
            userName = currentUser.name;
        }
    }
    
    const newReview = {
        id: `review-${Date.now()}`,
        userId: finalUserId,
        date: new Date(),
        unit: validatedData.unit,
        serviceSpeed: validatedData.serviceSpeed ?? 'medium', 
        rawCompleteness: validatedData.rawCompleteness ?? 'not_applicable',
        comments: validatedData.comments || '',
        serviceQualityNew: validatedData.serviceQualityNew,
        staffFriendlinessNew: validatedData.staffFriendlinessNew,
        serviceQuality: 0,
        staffFriendliness: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    initialReviews.unshift(newReview as any); // Use unshift to add to the top

    logActivity(`Ulasan baru diterima dari ${userName} untuk unit ${newReview.unit}.`);
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
  
  // --- Prisma Implementation ---
//   const whereClause: any = {};
//   if (unit) whereClause.unit = unit;
//   if (userId) whereClause.userId = userId;
//   if (from) whereClause.date = { ...whereClause.date, gte: from };
//   if (to) whereClause.date = { ...whereClause.date, lte: to };
//   if (userName) whereClause.user = { name: { contains: userName, mode: 'insensitive' }};
//   const reviews = await prisma.review.findMany({
//     where: whereClause,
//     include: {
//       user: {
//         select: { name: true, avatar: true }
//       }
//     },
//     orderBy: {
//       date: 'desc'
//     }
//   });
//   return reviews.map(review => ({
//     ...review,
//     user: {
//       name: review.user.name,
//       avatar: review.user.avatar
//     }
//   }));

  // --- Array Implementation ---
  let filteredReviews = [...initialReviews];
  if (unit && unit !== 'Semua Unit') {
    filteredReviews = filteredReviews.filter(r => r.unit === unit);
  }
  if (userId) {
    filteredReviews = filteredReviews.filter(r => r.userId === userId);
  }
  if (from) {
    filteredReviews = filteredReviews.filter(r => new Date(r.date) >= from);
  }
  if (to) {
    filteredReviews = filteredReviews.filter(r => new Date(r.date) <= to);
  }

  const result = filteredReviews.map(review => {
    const user = users.find(u => u.id === review.userId);
    return {
      ...review,
      user: {
        name: user?.name || 'Pengguna Anonim',
        avatar: user?.avatar || null,
      }
    };
  });
  
  if (userName) {
    return result.filter(r => r.user.name.toLowerCase().includes(userName.toLowerCase()));
  }

  return result.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function deleteReview(id: string) {
    // --- Prisma Implementation ---
    // await prisma.review.delete({ where: { id: id } });

    // --- Array Implementation ---
    const index = initialReviews.findIndex(r => r.id === id);
    if (index > -1) {
        const deletedReview = initialReviews[index];
        initialReviews.splice(index, 1);
        const user = users.find(u => u.id === deletedReview.userId);
        logActivity(`Ulasan ID ${id} dari pengguna ${user?.name || 'anonim'} untuk unit ${deletedReview.unit} telah dihapus.`);
    }
    
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');
}
