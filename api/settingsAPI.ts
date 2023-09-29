import axiosInstance from '@/api/axios/axiosInstance';

export type SettingProps = {
  font_size?: number;
  font_color?: string;
  background_color?: string;
  notifications?: boolean;
  site_news?: boolean;
  private_messages?: boolean;
  comments?: boolean;
  is_adult?: boolean;
};

export const getSettings = async (): Promise<SettingProps> => {
  const { data } = await axiosInstance.get('/settings/');

  return data
  // return {
  //   font_size: 15,
  //   font_color: 'blue',
  //   background_color: 'black',
  //   notifications: true,
  //   site_news: true,
  //   private_messages: true,
  //   comments: true,
  //   is_adult: true,
  // };
};

export const changeSettings = async (settingsData: SettingProps) => {
  const { data } = await axiosInstance.put('/settings/', settingsData);

  return data;
};

export const changeOneSettings = async (settingsData: SettingProps) => {
  const { data } = await axiosInstance.patch('/settings/', settingsData);

  return data;
};
