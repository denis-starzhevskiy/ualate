import { create } from 'zustand';
import { removeCookies } from 'cookies-next';

export type User = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  logo?: string;
};

type UserStore = {
  user: User;
  authorized: boolean;
  accessToken: string;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<UserStore>((set) => ({
  authorized: false,
  accessToken: '',
  theme: 'light',
  user: {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    logo: '',
  },
  login: (user, accessToken) =>
    set(() => ({
      user: user,
      authorized: true,
      accessToken: accessToken,
    })),
  logout: () => {
    removeCookies('access-token');
    set(() => ({
      authorized: false,
      user: {},
      accessToken: '',
    }));
  },
}));
