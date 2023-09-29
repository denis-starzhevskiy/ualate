import React from 'react';
import TranslatorsView from '@/components/modules/translators';
import { translators } from '@/utils/createTranslation';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getTranslators } from '@/api/translatorsAPI';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['translators'], () => getTranslators());
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Translators = () => {
  const { isLoading, data, isError } = useQuery(['translators'], () => getTranslators());

  return <TranslatorsView translators={data} isError={isError} isLoading={isLoading} />;
};

export default Translators;
