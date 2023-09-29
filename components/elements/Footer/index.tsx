import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SocialFooter from '../SocialFooter';

import logo from '../../../public/images/logo.png';

import s from './Footer.module.scss';
import NavigationFooter from '../NavigationFooter';
import GlobalSvgSelector from '@/components/GlobalSvgSelector';

type FooterProps = {};

const Footer = (props: FooterProps) => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.columns}>
            <div className={s.column}>
              <Image className={s.logo} src={logo} alt="Logo" width={160} height={161} />
            </div>
            <div className={s.column}>
              <div className={s.navigation}>
                <NavigationFooter />
              </div>
            </div>
            <div className={s.column}>
              <div className={s.social}>
                <SocialFooter />
              </div>
              <Link href="/" className={s.dev}>
                <GlobalSvgSelector id="michael" />
                Розроблено Michaelstudioo
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={s.copyright}>
        UAtranslate © 2023 <span>Kryvoruchko Svitlana Nikolaevna</span> All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
