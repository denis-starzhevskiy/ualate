import axiosInstance from '@/api/axios/axiosInstance';

export const getMails = async () => {
  const { data } = await axiosInstance.get('/mail/');

  return data;
};

export const getMailById = async (mailId: number) => {
  const { data } = await axiosInstance.get(`/mail/${mailId}`);

  return data;
};

export const sendMail = async (message: string, recipient: number) => {
  const { data } = await axiosInstance.post(`/mail/`, {
    message,
    recipient,
  });

  return data;
};

export const deleteMail = async (messageId: string) => {
  const { data } = await axiosInstance.delete(`/mail/${messageId}`);

  return data;
};
