import HomePage from "@/components/modules/home";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getBooks } from "@/api/bookAPI";
import { useBooks } from "@/hooks/api/useBooks";
import Loader from "@/components/elements/Loader/Loader";

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery(['books'], () => getBooks(1));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const { isLoading, data } = useBooks();

  return <>{isLoading ? <Loader /> : <HomePage books={data?.results || []} />}</>;
}
