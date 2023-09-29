import React, { useState } from 'react';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/navigation';

import s from './ProposalsSection.module.scss';
import { bookIcon, downloadIcon, noticeIcon } from '@/components/modules/icons';
import { dehydrate, QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { buyChapter, getChapterById } from '@/api/chapterAPI';
import { ChapterProps } from '@/components/elements/Book';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';

export type ProposalProps = {
  name: string;
  cost: number;
  active: string;
};

type Props = {
  bookId: string;
  light?: boolean;
};

export const getServerSideProps = async (ctx: { params: { id: string } }) => {
  const { id } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['chapters', id], () => getChapterById(id));
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

const ProposalsSection = ({ bookId, light }: Props) => {
  const [disableDownloadByOne, setDisabledDownloadByOne] = useState('disabled');
  const { isLoading, data, isError } = useQuery(['chapters', bookId], () => getChapterById(bookId));
  const [chaptersIds, setChapterIds] = useState([]);
  const buyChoosenMutation = useMutation({
    mutationFn: () => buyChapter(chaptersIds),
  });

  const buyOneMutation = useMutation({
    mutationFn: (request: { chapterId: number }) => buyChapter([request.chapterId]),
  });

  const buyAllMutation = useMutation({
    mutationFn: () => buyChapter([...data.map((item, idx) => idx)]),
  });

  return (
    <section className={clsx(s.section, 'section')}>
      <div className={'container'}>
        <div className={clsx(s.content, light && s.light)}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError ? (
                <FetchError />
              ) : (
                <>
                  <div className={clsx(s.rowContainer, s.marginBottom20)}>
                    <div />
                    <p className={s.tableHeaders}>Вартість (UAcoins)</p>
                    <p className={s.tableHeaders}>Назва</p>
                    <p className={clsx(s.tableHeaders, s.activeBlock)}>Актив</p>
                    <div />
                  </div>
                  {data && Array.isArray(data) ? (
                    data.map((item: ChapterProps, idx: number) => {
                      return (
                        <div key={idx}>
                          <div className={clsx(s.rowContainer, s.rowItemContainer)}>
                            <label className={s.container}>
                              <input
                                type={'checkbox'}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setChapterIds((prev) => {
                                      prev.push(idx);
                                      return prev;
                                    });
                                  } else {
                                    setChapterIds((prev) => {
                                      return prev.filter((item) => item !== idx);
                                    });
                                  }
                                }}
                              />
                              <span className={s.checkmark}></span>
                            </label>
                            <p className={s.costLabel}>{`${10}`}</p>
                            <p className={s.nameLabel}>{item.chapter_name}</p>
                            <p className={s.activeBlock}>{item.is_free}</p>
                            <div className={s.buttonContainer}>
                              <button
                                className={clsx('button', s.outlinedButton)}
                                onClick={() => {
                                  buyOneMutation.mutate({ chapterId: idx });
                                }}>
                                {buyOneMutation.isLoading ? (
                                  <Loader size={20} styles={{ minHeight: '0px' }} />
                                ) : (
                                  bookIcon()
                                )}
                                Читати
                              </button>
                            </div>
                          </div>
                          <div className={s.rowDivider} />
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <div className={clsx(s.rowContainer, s.rowItemContainer)}>
                        <label className={s.container}>
                          <input
                            type={'checkbox'}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setChapterIds((prev) => {
                                  prev.push(data.id);
                                  return prev;
                                });
                              } else {
                                setChapterIds((prev) => {
                                  return prev.filter((item) => item !== data.id);
                                });
                              }
                            }}
                          />
                          <span className={s.checkmark}></span>
                        </label>
                        <p className={s.costLabel}>{`${10}`}</p>
                        <p className={s.nameLabel}>{data.chapter_name}</p>
                        <p className={s.activeBlock}>{data.is_free ? 'Так' : 'Ні'}</p>
                        <div className={s.buttonContainer}>
                          <button
                            className={clsx('button', s.outlinedButton)}
                            onClick={() => {
                              buyOneMutation.mutate({ chapterId: data.id });
                            }}>
                            {buyOneMutation.isLoading ? (
                              <Loader size={20} styles={{ minHeight: '0px' }} />
                            ) : (
                              bookIcon()
                            )}
                            Читати
                          </button>
                        </div>
                      </div>
                      <div className={s.rowDivider} />
                    </div>
                  )}
                  <div className={s.actionContainer}>
                    <button
                      className={'button'}
                      onClick={() => {
                        buyAllMutation.mutate();
                      }}>
                      {buyOneMutation.isLoading ? (
                        <Loader size={20} styles={{ minHeight: '0px', width: '20px' }} />
                      ) : (
                        noticeIcon()
                      )}
                      Купити 5 розділів за 45
                    </button>
                    <div className={s.downloadButtonsContainer}>
                      <button className={'button'}>{downloadIcon()}.fb2</button>
                      <button className={'button'}>{downloadIcon()}.docx</button>
                      <button className={'button'} disabled={!!disableDownloadByOne}>
                        {downloadIcon(!!disableDownloadByOne)}Завантажити одним файлом
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProposalsSection;
