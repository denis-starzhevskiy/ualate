import React from 'react';
import s from './BookInformationTable.module.scss';
import clsx from 'clsx';
import { BookProps } from '@/components/elements/Book';

const BookInformationTable = ({ book, author }: { book: BookProps; author: string }) => {
  return (
    <table className={s.table}>
      <tbody>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Автор
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>{author}</td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Перекладач
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>{author}</td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Розділів
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>{book.chapters.length}</td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Статус
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>{book.type_book}</td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Жанр
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            {book.genres
              .map((item) => {
                return item;
              })
              .join(' ') || 'Не вказано'}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Теги
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            {book.tags && book.tags.length === 0 && <p>Не вказано</p>}
            {book.tags && (
              <div className={s.tags}>
                <ul>
                  {book.tags.map((tag, index) => (
                    <li key={index}>
                      <p>{tag}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
            Фендом
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>{book.fund}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookInformationTable;
