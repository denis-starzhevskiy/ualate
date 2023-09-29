import axiosInstance from '@/api/axios/axiosInstance';
import { CookieValueTypes, getCookie } from 'cookies-next';

export const registerUser = async (request: object) => {
  const { data } = await axiosInstance.post(`/auth/users/`, request, {});

  return data;
};

export const loginUser = async (request: object) => {
  const { data } = await axiosInstance.post(`/auth/token/login/`, request);

  return data;

  // return {
  //   auth_token: '52c541e26da4314b66b041d108f63157ccc11ea1',
  // };
};

export const logoutUser = async (request: object) => {
  const { data } = await axiosInstance.post(`/auth/token/logout/`);

  return data;
};

export const me = async (authToken?: CookieValueTypes) => {
  const headers = { Authorization: 'Token ' + getCookie('access-token') };

  const { data } = await axiosInstance.get(`/auth/users/me/`, { headers });

  return data;
};

export const editUserData = async (request: object) => {
  const { data } = await axiosInstance.post(`/auth/users/me/`, request);

  return data;
};

export const deleteUserData = async () => {
  const { data } = await axiosInstance.delete(`/auth/users/me/`);

  return data;
};

export const activateAccount = async (uuid: string, token: string) => {
  const { data } = await axiosInstance.get(`/accounts/activate/${uuid}/${token}/`);

  return data;
};

export const passwordResetConfirm = async (uuid: string, token: string) => {
  const { data } = await axiosInstance.get(`/accounts/password/reset/confirm/${uuid}/${token}/`);

  return data;
};

export const activateProfile = async (request: object) => {
  const { data } = await axiosInstance.post(`/auth/users/activation/`, request);

  return data;
};

export const resendActivation = async (email: string) => {
  const { data } = await axiosInstance.post(`/auth/users/resend_activation/`, {
    email,
  });

  return data;
};

export const getUsers = async () => {
  const { data } = await axiosInstance.get(`/auth/users/`);

  return data;
};

export const getUserById = async (id: number) => {
  const { data } = await axiosInstance.get(`/auth/users/${id}/`);

  return data;
};

export const resetEmail = async (email: string) => {
  const { data } = await axiosInstance.post(`/auth/users/reset_email/`, {
    email,
  });

  return data;
};

export const resetEmailConfirm = async (email: string) => {
  const { data } = await axiosInstance.post(`/auth/users/reset_email_confirm/`, {
    email,
  });

  return data;
};

export const setEmail = async (email: string) => {
  const { data } = await axiosInstance.post(`/auth/users/set_email/`, { email });

  return data;
};

export const resetPassword = async (password: string) => {
  const { data } = await axiosInstance.post(`/auth/users/reset_password/`, {
    password,
  });

  return data;
};

export const resetPasswordConfirm = async (password: string) => {
  const { data } = await axiosInstance.post(`/auth/users/reset_password_confirm/`, {
    password,
  });

  return data;
};

export const setPassword = async (requestSetPassword: {
  new_password: string;
  current_password: string;
}) => {
  const { data } = await axiosInstance.post(`/auth/users/set_password/`, requestSetPassword);

  return data;
};

export const googleAuth = async (googleAuthRequest: {}) => {
  const { data } = await axiosInstance.post(`/auth/social/o/google`, googleAuthRequest);

  return data;
};
