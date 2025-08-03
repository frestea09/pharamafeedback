
export type User = {
  id: string
  name: string
  email: string
  password?: string
  role: "Admin" | "User"
  lastLogin: string
  avatar: string
  unit?: "Farmasi" | "Rawat Jalan" | "Rawat Inap" | "Laboratorium" | "Radiologi"
}

export const users: User[] = [
  {
    id: "user-1",
    name: "Ahmad Subarjo",
    email: "admin@pharmafeedback.com",
    password: "admin123",
    role: "Admin",
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=AS"
  },
  {
    id: "user-8",
    name: "Fina (Admin Farmasi)",
    email: "admin.farmasi@pharmafeedback.com",
    password: "admin123",
    role: "Admin",
    unit: "Farmasi",
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=AF"
  },
    {
    id: "user-9",
    name: "Joko (Admin Rawat Jalan)",
    email: "admin.rawatjalan@pharmafeedback.com",
    password: "admin123",
    role: "Admin",
    unit: "Rawat Jalan",
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=AJ"
  },
  {
    id: "user-2",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    password: "password123",
    role: "User",
    unit: "Farmasi",
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=BS"
  },
  {
    id: "user-3",
    name: "Citra Lestari",
    email: "citra.lestari@example.com",
    password: "password123",
    role: "User",
    unit: "Rawat Jalan",
    lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=CL"
  },
  {
    id: "user-4",
    name: "Dewi Anggraini",
    email: "dewi.anggraini@example.com",
    password: "password123",
    role: "User",
    unit: "Farmasi",
    lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=DA"
  },
  {
    id: "user-5",
    name: "Eko Prasetyo",
    email: "eko.prasetyo@example.com",
    password: "password123",
    role: "User",
    unit: "Laboratorium",
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=EP"
  },
   {
    id: "user-6",
    name: "Fitriani",
    email: "fitriani@example.com",
    password: "password123",
    role: "User",
    lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=F"
  },
   {
    id: "user-7",
    name: "Gunawan",
    email: "gunawan@example.com",
    password: "password123",
    role: "User",
    lastLogin: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=G"
  },
];
