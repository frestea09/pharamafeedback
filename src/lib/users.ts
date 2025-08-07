
export type User = {
  id: string
  name: string
  email: string
  password?: string
  role: "Admin" | "User" | "KepalaUnit"
  lastLogin: string
  avatar: string
  unit?: string
}

export const users: User[] = [
  {
    id: "user-1",
    name: "Admin Sistem",
    email: "admin@sim.rs",
    password: "123456",
    role: "Admin",
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=AS"
  },
  {
    id: "user-2",
    name: "Dr. Budi (Kepala Unit)",
    email: "kepala.farmasi@sim.rs",
    password: "123456",
    role: "KepalaUnit",
    unit: "GF - Instalasi Farmasi (Gedung Utama)",
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=DB"
  },
  {
    id: 'user-budi',
    name: 'Budi Santoso',
    email: 'budi.santoso@example.com',
    password: 'password123',
    role: 'User',
    unit: 'GF - Instalasi Farmasi (Gedung Utama)',
    lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: `https://placehold.co/100x100.png?text=BS`
  },
  {
    id: 'user-ani',
    name: 'Ani Yudhoyono',
    email: 'ani.yudhoyono@example.com',
    password: 'password123',
    role: 'User',
    unit: 'L2 - Ruang Perawatan Anak Anyelir',
    lastLogin: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: `https://placehold.co/100x100.png?text=AY`
  }
];
