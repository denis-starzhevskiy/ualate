import React from 'react';
import ProfilePage from '@/components/modules/profile/ProfilePage';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/profileAPI';
import { me } from '@/api/authAPI';
import { useAuthStore } from '@/store/authStore';
import FetchError from '@/components/elements/FetchError/FetchError';
import Loader from '@/components/elements/Loader/Loader';
import { getStatistic } from '@/api/statisticAPI';

const Profile = () => {
  const {
    user: { id },
  } = useAuthStore();

  const {
    isSuccess: meSuccess,
    data: resultAuth,
    isLoading: meLoading,
  } = useQuery(['me'], () => me());

  const {
    isLoading: profileLoading,
    data: profileData,
    isError: isProfileError,
    isSuccess: isProfileSuccess,
  } = useQuery(['profile'], () => getUserProfile(id || resultAuth?.id), {
    enabled: meSuccess && !meLoading,
  });

  const {
    isLoading: statisticLoading,
    data: statisticData,
    isError: statisticError,
  } = useQuery(['statistic'], () => getStatistic(), {
    enabled: meSuccess && isProfileSuccess,
  });

  return (
    <>
      {statisticLoading ? (
        <Loader />
      ) : (
        <>
          {isProfileError || statisticError ? (
            <FetchError />
          ) : (
            <ProfilePage userData={{ ...profileData, ...statisticData }} />
          )}
        </>
      )}
    </>
  );
};

export default Profile;
