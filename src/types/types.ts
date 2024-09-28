export type UserRole = "admin" | "user";

export type User = {
  id: number;
  email: string;
  role: UserRole;
};
