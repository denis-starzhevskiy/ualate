import React from 'react';
import BookDescription from '@/components/modules/viewItem/BookDescription';
import BookMainSection from '@/components/modules/viewItem/BookMainSection';
import ProposalsSection from '@/components/modules/viewItem/ProposalsSection';
import CommentSection from '@/components/modules/viewItem/CommentSection';
import BooksSection from '@/components/modules/viewItem/BooksSection';
import { useBook } from '@/hooks/api/useBooks';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getBookById } from '@/api/bookAPI';
import Loader from '@/components/elements/Loader/Loader';
import { useAuthStore } from '@/store/authStore';
import FetchError from '@/components/elements/FetchError/FetchError';
import { useRouter } from 'next/router';

type BookByIdProps = {
  isError?: boolean;
};

export const getServerSideProps = async (ctx: { params: { id: string } }) => {
  const { id } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['book', id], () => getBookById(id));
  } catch (error) {
    isError = true;
    // ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      //also passing down isError state to show a custom error component.
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ViewItemPage = ({ isError }: BookByIdProps) => {
  const router = useRouter();
  const { bookId } = router.query;
  const checkBookId = Array.isArray(bookId) ? bookId?.[0] : bookId || '1';

  const { isLoading, data, isError: isBookFetchError } = useBook(checkBookId);
  const authorized = useAuthStore((state) => state.authorized);

  if (isLoading) return <Loader size={80} />;

  if (isError || isBookFetchError) return <FetchError />;

  return (
    <>
      <BookMainSection book={data} />
      <BookDescription description={data?.description} />
      <BooksSection title="Інші роботи автора" bookId={checkBookId || '1'} light />
      {authorized && (
        <>
          <ProposalsSection bookId={checkBookId} />

          <CommentSection bookId={checkBookId} />
        </>
      )}
    </>
  );
};

export default ViewItemPage;
