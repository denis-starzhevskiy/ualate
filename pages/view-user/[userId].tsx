import React from 'react';
import ViewUser from '@/components/modules/profile/viewUser';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import { useRouter } from 'next/router';
import { getUserProfile } from '@/api/profileAPI';
import { getStatistic } from '@/api/statisticAPI';

const Profile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const stringUserId = Array.isArray(userId) ? userId[0] : userId || '1';

  const {
    isLoading,
    data: userData,
    isError,
  } = useQuery(['userInfo', userId], () => getUserProfile(stringUserId));

  const {
    isLoading: statisticLoading,
    data: statisticData,
    isError: statisticError,
  } = useQuery(['statistic'], () => getStatistic());

  return (
    <>
      {isLoading ? <Loader /> : <>{isError ? <FetchError /> : <ViewUser userInfo={userData} />}</>}
    </>
  );
};

export default Profile;
