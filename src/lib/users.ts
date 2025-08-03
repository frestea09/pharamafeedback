
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
    name: "Admin Sistem",
    email: "admin@pharmafeedback.com",
    password: "admin123",
    role: "Admin",
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    avatar: "https://placehold.co/100x100.png?text=AS"
  },
];
