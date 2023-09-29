import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';

import s from './CommentsSection.module.scss';

import avatar from '../../../../public/images/avatar.svg';
import { heartIcon } from '@/components/modules/icons';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getComments } from '@/api/commentsAPI';
import { withCSR } from '@/utils/with-CSR';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';

export type CommentProps = {
  username: string;
  comment: string;
  avatar: string | null;
  publicationData: string;
};

function CommentItem(props: { item: CommentProps }) {
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <div className={s.itemContainer}>
      <div>
        <Image src={avatar} alt={''} />
      </div>
      <div className={s.textContainer}>
        <div className={s.usernameLastSeenContainer}>
          <p className={s.usernameTextDecoration}>{props.item.username}</p>
          <p className={clsx(s.greyTextDecoration, s.textItalic)}>{props.item.publicationData}</p>
        </div>
        <p className={s.commentTextDecoration}>{props.item.comment}</p>
        <div className={s.likeActionContainer}>
          <p className={s.greyTextDecoration} onClick={() => setReplyOpen((prev) => !prev)}>
            Відповісти
          </p>
          {heartIcon()}
        </div>
        {replyOpen && (
          <input className={clsx('input', s.replyInput)} placeholder={'Введіть відповідь'} />
        )}
      </div>
    </div>
  );
}

const CommentsSection = ({ bookId }: { bookId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery(['comments', bookId, 'book'], () => getComments(bookId));

  return (
    <section className={clsx(s.section, 'section')}>
      <div className="container">
        <div className={s.wrapper}>
          <h2 className={clsx(s.title, 'title-section')}>Коментарі</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError ? (
                <FetchError />
              ) : (
                <>
                  {comments && comments.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '20px' }}>Коментарі відсутні.</p>
                  )}
                  {comments &&
                    comments.map((item: CommentProps, idx: number) => {
                      return <CommentItem key={idx} item={item} />;
                    })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = withCSR(async (ctx: { params: { bookId: string } }) => {
  const { bookId } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['comments', bookId], () => getComments(bookId));
  } catch (error) {
    isError = true;
    // ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default CommentsSection;
