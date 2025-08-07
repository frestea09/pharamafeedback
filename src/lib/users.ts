
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
];
