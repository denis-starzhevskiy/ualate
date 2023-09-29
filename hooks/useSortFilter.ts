import { useState } from 'react';

export const optionsTitles = [
  'назвою',
  'датою створення',
  'датою оновлення',
  'рейтингами',
  'переглядами',
  'кількістю лайків',
  'кількістю безкоштовних сторінок',
  'кількістю сторінок',
  'кількістю розділів',
  'кількістю в закладках',
];

type selectOptions =
  | 'title'
  | 'created'
  | 'last_edit'
  | 'likes'
  | 'views'
  | 'price'
  | 'price_chapter'
  | 'comment_count'
  | 'book_count';

export const useSortFilter = () => {
  const [sortType, setSortType] = useState<selectOptions>('title');

  const setOptionByName = (option: string) => {
    if (option === 'назвою') {
      setSortType('title');
    } else if (option === 'датою створення') {
      setSortType('created');
    } else if (option === 'дата оновлення') {
      setSortType('last_edit');
    } else if (option === 'рейтингами') {
      setSortType('likes');
    } else if (option === 'переглядами') {
      setSortType('views');
    } else if (option === 'кількістю лайків') {
      setSortType('likes');
    } else if (option === 'кількістю безкоштовних сторінок') {
      setSortType('price');
    } else if (option === 'кількістю сторінок') {
      setSortType('price');
    } else if (option === 'кількістю розділів') {
      setSortType('price_chapter');
    } else if (option === 'кількістю в закладках') {
      setSortType('likes');
    } else if (option === 'кількість коментарів') {
      setSortType('comment_count');
    } else if (option === 'кількість книг') {
      setSortType('book_count');
    } else {
      setSortType('title');
    }
  };

  return {
    sortType,
    setOptionByName,
  };
};
