import { RegisterLoginData, User } from '@/types/user';
import { nextServer } from './api';

export type UserRegisterProps = {
  email: string;
  password: string;
  username: string;
};

type RegisterResponse = {
  newUser: User;
};

export const register = async (data: UserRegisterProps): Promise<RegisterResponse> => {
  const res = await nextServer.post('/auth/register', data);
  return res.data;
};

export const login = async (data: RegisterLoginData) => {
  const res = await nextServer.post<User>(`/auth/login`, data);
  return res.data;
};
