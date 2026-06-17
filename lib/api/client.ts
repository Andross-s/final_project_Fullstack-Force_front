import { nextServer } from './api';
import { User } from '@/app/types/user';

export type UserRegisterProps = {
  email: string;
  password: string;
  username: string;
};

type RegisterResponse = {
  newUser: User;
};

// export const register = async (
//   data: UserRegisterProps,
// ): Promise<RegisterResponse> => {
//   const res = await nextServer.post('/auth/register', data);
//   return res.data;
// };

export const register = async (data: UserRegisterProps): Promise<RegisterResponse> => {
  const res = await nextServer.post('/api/auth/register', data);
  return res.data;
};