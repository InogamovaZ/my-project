// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string; // Добавляем _id к типу пользователя
      username?: string; // Добавляем username
      name: string;
      email: string;
      role: string;
      image?: string | null;
    } & DefaultSession["user"]; // Сохраняем остальные поля
  }

  interface User {
    _id: string;
    id: string;
    username?: string;
    name: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    id: string;
    username?: string;
    name: string;
    email: string;
    role: string;
  }
}
