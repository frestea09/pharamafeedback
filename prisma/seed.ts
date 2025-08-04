
import { PrismaClient } from '@prisma/client'
import { serviceUnits } from '../src/lib/constants';

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // Create Users
  const adminSistem = await prisma.user.create({
    data: {
      name: 'Admin Sistem',
      email: 'admin@sim.rs',
      password: '123456',
      role: 'Admin',
      avatar: `https://placehold.co/100x100.png?text=AS`,
    },
  })

  const adminFarmasi = await prisma.user.create({
    data: {
      name: 'Admin Farmasi',
      email: 'admin.farmasi@sim.rs',
      password: '123456',
      role: 'Admin',
      unit: 'GF - Instalasi Farmasi (Gedung Utama)',
      avatar: `https://placehold.co/100x100.png?text=AF`,
    },
  });

  const userBudi = await prisma.user.create({
      data: {
          name: 'Budi Santoso',
          email: 'budi.santoso@example.com',
          password: 'password123',
          role: 'User',
          unit: 'GF - Instalasi Farmasi (Gedung Utama)',
          avatar: `https://placehold.co/100x100.png?text=BS`
      }
  });

   const userAni = await prisma.user.create({
      data: {
          name: 'Ani Yudhoyono',
          email: 'ani.yudhoyono@example.com',
          password: 'password123',
          role: 'User',
          unit: 'L2 - Ruang Perawatan Anak Anyelir',
          avatar: `https://placehold.co/100x100.png?text=AY`
      }
  });
  
  console.log(`Created users:`, { adminSistem, adminFarmasi, userBudi, userAni });

  // Create Reviews
  const review1 = await prisma.review.create({
    data: {
      userId: userBudi.id,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      unit: 'GF - Instalasi Farmasi (Gedung Utama)',
      serviceSpeed: 'fast',
      serviceQuality: 5,
      staffFriendliness: 4,
      comments: 'Pelayanan sangat cepat dan stafnya ramah. Obat yang diberikan juga lengkap.',
      rawCompleteness: 'complete',
    },
  })

  const review2 = await prisma.review.create({
    data: {
        userId: userAni.id,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        unit: 'L2 - Ruang Perawatan Anak Anyelir',
        serviceSpeed: 'medium',
        serviceQuality: 4,
        staffFriendliness: 5,
        comments: 'Perawat sangat sabar dan baik kepada anak saya. Ruangan juga bersih.',
        rawCompleteness: 'complete',
    }
  })

   const review3 = await prisma.review.create({
    data: {
        userId: userBudi.id,
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        unit: 'L1 - Instalasi Laboratorium',
        serviceSpeed: 'slow',
        serviceQuality: 3,
        staffFriendliness: 4,
        comments: 'Menunggu hasil lab cukup lama, tapi petugasnya informatif.',
        rawCompleteness: 'complete',
    }
  })


  console.log(`Created reviews:`, { review1, review2, review3 });

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
