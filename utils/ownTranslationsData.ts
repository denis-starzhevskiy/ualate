import image9 from '../public/images/books/image9.png';
import image10 from '../public/images/books/image10.png';
import image11 from '../public/images/books/image11.png';
import image12 from '../public/images/books/image12.png';
import image13 from '../public/images/books/image13.png';
import image14 from '../public/images/books/image14.png';
import { StaticImageData } from 'next/image';

type OwnTranslationsDataType = {
  id: number;
  image: StaticImageData;
  title: string;
  link: string;
  creationDate: string;
  lastActivityDate: string;
  viewPerDay: string;
  incomePerDay: string;
  incomePerMonth: string;
};

export const ownTranslationsData: OwnTranslationsDataType[] = [
  {
    id: 0,
    image: image9,
    title: `Переклад книги “Гаррі Поттер”`,
    link: `/`,
  },
  {
    id: 1,
    image: image10,
    title: `Переклад книги “Гаррі Поттер”`,
    link: `/`,
  },
  {
    id: 2,
    image: image11,
    title: `Переклад книги “Гаррі Поттер”`,
    link: `/`,
  },
  {
    id: 3,
    image: image12,
    title: `Переклад книги “Гаррі Поттер”`,
    link: `/`,
  },
  {
    id: 4,
    image: image13,
    title: `Переклад книги “Гаррі Поттер”`,
    link: `/`,
  },
  {
    id: 5,
    image: image14,
    title: `Переклад книги “Гаррі Поттер”`,
    link: `/`,
  },
].map((item) => ({
  ...item,
  creationDate: '14.02.2023',
  lastActivityDate: '14.02.2023',
  viewPerDay: '14.02.2023',
  incomePerDay: '15',
  incomePerMonth: '15',
}));
