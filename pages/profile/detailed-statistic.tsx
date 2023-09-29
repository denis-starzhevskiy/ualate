import React from 'react';
import StatisticView from '@/components/modules/profile/statistic';
import { useQuery } from '@tanstack/react-query';
import { getStatistic } from '@/api/statisticAPI';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';

const DetailedStatistic = () => {
  const { isLoading, data, isError } = useQuery(['statistic'], () => getStatistic());

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>{isError ? <FetchError /> : <StatisticView statistic={data} />}</>
      )}
    </>
  );
};

export default DetailedStatistic;
