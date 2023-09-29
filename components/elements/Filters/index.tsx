import React, { useState } from 'react';
import s from './Filters.module.scss';
import Checkbox from '@/components/elements/CheckBox/CheckBox';
import Accordion from '@/components/elements/Accordion';
import RadioGroup from '@/components/elements/RadioGroup';
import Divider from '@/components/elements/Divider';
import TagCheckbox from '@/components/elements/TagCheckbox';
import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/api/tagAPI';
import { BookProps } from '@/components/elements/Book';
import { useRouter } from 'next/router';

type FiltersProps = {
  allBooks?: BookProps[];
  filteredQuery: {};
  setFilteredQuery: (filteredQuery: any) => void;
};

type filtersTypes = {
  lg: string[] | null;
  ageRestrict: boolean | null;
  type: string[] | null;
  genre: string[] | null;
  tags: string[] | null;
  fends: string[] | null;
  excludeGenres: string[] | null;
  excludeTags: string[] | null;
  excludeFeds: string[] | null;
  chapterCount: number[] | null;
  pagesCount: number[] | null;
  isReady: boolean | null;
};

const getLgValue = (language: string) => {
  if (language === 'Англійська') {
    return 'en';
  }

  if (language === 'Французька') {
    return 'fr';
  }

  if (language === 'Українська') {
    return 'ua';
  }
};

const getOriginValue = (origin: string) => {
  if (origin === 'Переклад') {
    return 'translated';
  }

  return 'original';
};

const Filters = ({ filteredQuery, setFilteredQuery }: FiltersProps) => {
  const router = useRouter();
  const { data: tags } = useQuery(['tags'], () => getTags(), {});
  const [filters, addFilter] = useState<filtersTypes>({
    lg: null,
    ageRestrict: null,
    type: null,
    genre: null,
    tags: null,
    fends: null,
    excludeGenres: null,
    excludeTags: null,
    excludeFeds: null,
    chapterCount: null,
    pagesCount: null,
    isReady: null,
  });

  const [genres, setGenres] = useState<string[]>([]);
  const [queryTags, setQueryTags] = useState<string[]>([]);

  console.log(filteredQuery);

  return (
    <div className={s.container}>
      <h3 className={s.filtersTitle}>Фільтри</h3>
      <Accordion
        title={'Мова оригіналу'}
        content={
          <div className={s.scrollContainer}>
            {['Англійська', 'Французька', 'Українська'].map((item) => (
              <Checkbox
                key={item}
                label={item}
                name={'language'}
                checked={filteredQuery.original_language === getLgValue(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilteredQuery((prev) => {
                      return { ...prev, original_language: getLgValue(item) };
                    });
                  } else {
                    setFilteredQuery((prev) => {
                      return { ...prev, original_language: undefined };
                    });
                  }
                }}
              />
            ))}
          </div>
        }
      />
      <Divider className={s.my20} />
      <Accordion
        title={'Обмеження за віком 18+'}
        content={
          <RadioGroup
            value={filters?.ageRestrict ? 'Так' : 'Ні'}
            onChange={(value) => {
              setFilteredQuery((prev) => {
                return { ...prev, age_restrictions: value === 'Так' };
              });
            }}
            options={['Так', 'Ні'].map((item) => ({ label: item, value: item }))}
          />
        }
      />
      <Divider className={s.my20} />
      <Accordion
        title={'Тип'}
        content={['Переклад', 'Авторське'].map((item) => {
          return (
            <Checkbox
              key={item}
              label={item}
              name={item}
              checked={getOriginValue(item) === filteredQuery.type_book}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilteredQuery((prev) => {
                    return { ...prev, type_book: getOriginValue(item) };
                  });
                } else {
                  setFilteredQuery((prev) => {
                    return { ...prev, type_book: undefined };
                  });
                }
              }}
            />
          );
        })}
      />
      <Divider className={s.my20} />
      <Accordion
        title={'Жанри'}
        content={['Переклад', 'Авторське'].map((item) => (
          <Checkbox
            key={item}
            label={item}
            name={'genre'}
            onChange={(e) => {
              setGenres((prev) => [...prev, getOriginValue(item)]);
              setFilteredQuery((prev) => {
                return { ...prev, genres: getOriginValue(item) };
              });
            }}
          />
        ))}
      />
      <Divider className={s.my20} />
      <Accordion
        title={'Теги'}
        content={
          <div className={s.tagsContainer}>
            {tags &&
              tags.results.map((item) => (
                <TagCheckbox
                  key={item.tag_name}
                  label={item.tag_name}
                  name={'tags'}
                  onChange={(e) => {
                    setQueryTags((prev) => [...prev, getOriginValue(item)]);
                    setFilteredQuery((prev) => {
                      return { ...prev, tags: getOriginValue(item) };
                    });
                  }}
                />
              ))}
          </div>
        }
      />
      <Divider className={s.my20} />
      <Accordion
        title={'Фендом'}
        content={['Переклад', 'Авторське'].map((item) => (
          <Checkbox
            key={item}
            label={item}
            name={'fandom'}
            onChange={(e) => {
              setFilteredQuery((prev) => {
                return { ...prev, fund: getOriginValue(item) };
              });
            }}
          />
        ))}
      />
      <Divider className={s.my20} />
      <button
        className={'button'}
        style={{ color: 'white', border: '1px solid white', padding: '5px', fontSize: '12px' }}
        onClick={() => {
          router.push('/catalog');
        }}>
        Очистити фільтри
      </button>
      {/*<Accordion*/}
      {/*  title={'Виключити жанри'}*/}
      {/*  content={['Переклад', 'Авторське'].map((item) => (*/}
      {/*    <Checkbox*/}
      {/*      key={item}*/}
      {/*      label={item}*/}
      {/*      name={'excluded genre'}*/}
      {/*      onChange={(e) => {*/}
      {/*        if (e.target.checked) {*/}
      {/*          addFilter((prev) => {*/}
      {/*            return {*/}
      {/*              ...prev,*/}
      {/*              tags: prev?.tags*/}
      {/*                ? [...prev.tags, getOriginValue(item)]*/}
      {/*                : [getOriginValue(item)],*/}
      {/*            };*/}
      {/*          });*/}
      {/*        } else {*/}
      {/*          if (filters?.tags?.length === 1) {*/}
      {/*            addFilter((prev) => {*/}
      {/*              return { ...prev, tags: null };*/}
      {/*            });*/}
      {/*          } else {*/}
      {/*            addFilter((prev) => {*/}
      {/*              return {*/}
      {/*                ...prev,*/}
      {/*                tags: prev.tags?.filter((elem) => elem !== getOriginValue(item)),*/}
      {/*              };*/}
      {/*            });*/}
      {/*          }*/}
      {/*        }*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*/>*/}
      {/*<Divider className={s.my20} />*/}
      {/*<Accordion*/}
      {/*  title={'Виключити теги'}*/}
      {/*  content={['Переклад', 'Авторське'].map((item) => (*/}
      {/*    <Checkbox*/}
      {/*      key={item}*/}
      {/*      label={item}*/}
      {/*      name={'excluded tag'}*/}
      {/*      onChange={(e) => {*/}
      {/*        if (e.target.checked) {*/}
      {/*          addFilter((prev) => {*/}
      {/*            return {*/}
      {/*              ...prev,*/}
      {/*              tags: prev?.tags*/}
      {/*                ? [...prev.tags, getOriginValue(item)]*/}
      {/*                : [getOriginValue(item)],*/}
      {/*            };*/}
      {/*          });*/}
      {/*        } else {*/}
      {/*          if (filters?.tags?.length === 1) {*/}
      {/*            addFilter((prev) => {*/}
      {/*              return { ...prev, tags: null };*/}
      {/*            });*/}
      {/*          } else {*/}
      {/*            addFilter((prev) => {*/}
      {/*              return {*/}
      {/*                ...prev,*/}
      {/*                tags: prev.tags?.filter((elem) => elem !== getOriginValue(item)),*/}
      {/*              };*/}
      {/*            });*/}
      {/*          }*/}
      {/*        }*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*/>*/}
      {/*<Divider className={s.my20} />*/}
      {/*<Accordion*/}
      {/*  title={'Виключити фендоми'}*/}
      {/*  content={['Переклад', 'Авторське'].map((item) => (*/}
      {/*    <Checkbox*/}
      {/*      key={item}*/}
      {/*      label={item}*/}
      {/*      name={'excluded fandom'}*/}
      {/*      onChange={(e) => {*/}
      {/*        if (e.target.checked) {*/}
      {/*          addFilter((prev) => {*/}
      {/*            return {*/}
      {/*              ...prev,*/}
      {/*              tags: prev?.tags*/}
      {/*                ? [...prev.tags, getOriginValue(item)]*/}
      {/*                : [getOriginValue(item)],*/}
      {/*            };*/}
      {/*          });*/}
      {/*        } else {*/}
      {/*          if (filters?.tags?.length === 1) {*/}
      {/*            addFilter((prev) => {*/}
      {/*              return { ...prev, tags: null };*/}
      {/*            });*/}
      {/*          } else {*/}
      {/*            addFilter((prev) => {*/}
      {/*              return {*/}
      {/*                ...prev,*/}
      {/*                tags: prev.tags?.filter((elem) => elem !== getOriginValue(item)),*/}
      {/*              };*/}
      {/*            });*/}
      {/*          }*/}
      {/*        }*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*/>*/}
      {/*<Divider className={s.my20} />*/}
      {/*<Accordion*/}
      {/*  title={'Без фендомів'}*/}
      {/*  content={*/}
      {/*    <RadioGroup*/}
      {/*      options={['Так', 'Ні'].map((item) => ({ label: item, value: item }))}*/}
      {/*      value={filters?.excludeFeds ? 'Так' : 'Ні'}*/}
      {/*      onChange={(value) => {*/}
      {/*        addFilter((prev) => {*/}
      {/*          return { ...prev, excludeFeds: value === 'Так' };*/}
      {/*        });*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Divider className={s.my20} />*/}
      {/*<Accordion*/}
      {/*  title={'Кількість розділів'}*/}
      {/*  content={*/}
      {/*    <div className={s.numberInputsContainer}>*/}
      {/*      <label>*/}
      {/*        <span>від</span>*/}
      {/*        <input ref={lowCountChapter} type="text" className={clsx('input', s.numberInput)} />*/}
      {/*      </label>*/}
      {/*      <label>*/}
      {/*        <span>до</span>*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          className={clsx('input', s.numberInput)}*/}
      {/*          onChange={(e) => {*/}
      {/*            if (lowCountChapter?.current?.value) {*/}
      {/*              addFilter((prev) => {*/}
      {/*                return {*/}
      {/*                  ...prev,*/}
      {/*                  chapterCount: [lowCountChapter.current.value, e.target.value],*/}
      {/*                };*/}
      {/*              });*/}
      {/*            }*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </label>*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Divider className={s.my20} />*/}
      {/*<Accordion*/}
      {/*  title={'Кількість сторінок'}*/}
      {/*  content={*/}
      {/*    <div className={s.numberInputsContainer}>*/}
      {/*      <label>*/}
      {/*        <span>від</span>*/}
      {/*        <input ref={lowCountPages} type="text" className={clsx('input', s.numberInput)} />*/}
      {/*      </label>*/}
      {/*      <label>*/}
      {/*        <span>до</span>*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          className={clsx('input', s.numberInput)}*/}
      {/*          onChange={(e) => {*/}
      {/*            if (lowCountPages?.current?.value) {*/}
      {/*              addFilter((prev) => {*/}
      {/*                return {*/}
      {/*                  ...prev,*/}
      {/*                  chapterCount: [lowCountPages?.current?.value, e.target.value],*/}
      {/*                };*/}
      {/*              });*/}
      {/*            }*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </label>*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*/>*/}
      {/*<Divider className={s.my20} />*/}
      {/*<div>*/}
      {/*  {[*/}
      {/*    'Готові на 100%',*/}
      {/*    'Доступні для скачування',*/}
      {/*    'Завершені проекти',*/}
      {/*    'Тільки непереглянуті',*/}
      {/*    'Не показувати закладки',*/}
      {/*    'Тільки онгоінги',*/}
      {/*  ].map((item) => (*/}
      {/*    <Checkbox*/}
      {/*      key={item}*/}
      {/*      label={item}*/}
      {/*      name={'other filters'}*/}
      {/*      onChange={(e) => {*/}
      {/*        if (item === 'Готові на 100%') {*/}
      {/*          addFilter((prev) => {*/}
      {/*            return { ...prev, isReady: e.target.checked };*/}
      {/*          });*/}
      {/*        }*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
};

export default Filters;
