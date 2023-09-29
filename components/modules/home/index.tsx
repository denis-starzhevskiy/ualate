import React from 'react';
import Advertising from './Advertising';
import BooksSection from './BooksSection';
import LatestUpdates from './LatestUpdates';
import Recommendations from './Recommendations';
import TextSection from './TextSection';
import { BookProps } from '@/components/elements/Book';

type Props = {
  books: BookProps[];
};

const HomePage = ({ books }: Props) => {
  return (
    <>
      <BooksSection title="Реклама" items={books} countDesktopSlider={5} />
      <Advertising items={books} />
      <LatestUpdates items={books} />
      <BooksSection title="Тренди" items={books} light />
      <BooksSection title="ВипадковІ" items={books} light />
      <Recommendations dayTop={books} weekTop={books} monthTop={books} overallTop={books} />
      <TextSection />
    </>
  );
};

export default HomePage;
