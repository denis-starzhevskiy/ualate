import Footer from '@/components/elements/Footer';
import Header from '@/components/elements/Header';
import Meta from '@/components/meta';
import React from 'react';

type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
