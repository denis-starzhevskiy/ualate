import Image from 'next/image';
import React, { useState } from 'react';
import Button from '@/components/elements/Button';
import GlobalSvgSelector from '@/components/GlobalSvgSelector';
import { useScrollBlock } from '@/hooks/useScrollBlock';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Search from '../Search';
import Navigation from '../Navigation';

import logo from '../../../public/images/logo.png';

import s from './Header.module.scss';
import SignUpModal from '@/components/elements/SignUpModal';
import SignInModal from '@/components/elements/SignInModal';
import { useAuthStore } from '@/store/authStore';
import UserMenu from '@/components/elements/UserMenu';
import Link from 'next/link';
import SearchModal from '@/components/elements/SearchModal';
import { GoogleOAuthProvider } from '@react-oauth/google';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const isMobile = useMediaQuery('991.98');
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const authorized = useAuthStore((state) => state.authorized);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);

    menuVisible ? allowScroll() : blockScroll();
  };

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.content}>
          <div className={s.wrapper}>
            {!isMobile && (
              <div className={s.search}>
                <Search
                  placeholder="Пошук по сайту"
                  icon="search"
                  disabled={openSearchModal}
                  value={searchFilter}
                  onChangeValue={(value) => {
                    if (!(value === '')) {
                      setSearchFilter(value);
                    } else {
                      setSearchFilter('');
                    }
                  }}
                  onSubmitClick={(value) => {
                    if (value.trim().length !== 0) {
                      setOpenSearchModal(true);
                    }
                  }}
                />
              </div>
            )}
            <Link href={'/'}>
              <Image className={s.logo} src={logo} alt="Logo" width={160} height={161} />
            </Link>
            {isMobile && (
              <button className={s.burger} onClick={toggleMenu}>
                <GlobalSvgSelector id="burger" />
              </button>
            )}
            {!isMobile && (
              <div className={s.inner}>
                {/*<ThemeToggle />*/}
                <div className={s.buttons}>
                  {authorized ? (
                    <UserMenu />
                  ) : (
                    <>
                      <Button
                        icon="user_circle"
                        onClick={() => {
                          setOpenSignUpModal(true);
                        }}>
                        Реєстрація
                      </Button>
                      <Button icon="sign_in" onClick={() => setOpenSignInModal(true)}>
                        Увійти
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {!isMobile && (
            <div className={s.navigation}>
              <Navigation />
            </div>
          )}
        </div>
      </div>
      {isMobile && menuVisible && (
        <div className={s.menu}>
          <div className="container">
            <button className={s.close} onClick={toggleMenu}>
              <GlobalSvgSelector id="close" />
            </button>
            <div className={s.mobileSearch}>
              <Search
                placeholder="Пошук по сайту"
                icon="search"
                disabled={openSearchModal}
                value={searchFilter}
                onChangeValue={(value) => {
                  if (!(value === '')) {
                    setSearchFilter(value);
                  } else {
                    setSearchFilter('');
                  }
                }}
              />
              {searchFilter.trim().length > 0 && (
                <button className={'button'} onClick={() => setOpenSearchModal(true)}>
                  Пошук
                </button>
              )}
            </div>
            <div className={s.navigation}>
              <Navigation onClose={() => setMenuVisible(false)} />
            </div>
            <div className={s.inner}>
              <div className={s.buttons}>
                {authorized ? (
                  <UserMenu />
                ) : (
                  <>
                    <Button
                      icon="user_circle"
                      onClick={() => {
                        setOpenSignUpModal(true);
                      }}>
                      Реєстрація
                    </Button>
                    <Button icon="sign_in" onClick={() => setOpenSignInModal(true)}>
                      Увійти
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <SignUpModal open={openSignUpModal} onClose={() => setOpenSignUpModal(false)} />
      <GoogleOAuthProvider
        clientId={'693990561448-9lh6mehrff5ocudfvcpcmg90l9u3898h.apps.googleusercontent.com'}>
        <SignInModal open={openSignInModal} onClose={() => setOpenSignInModal(false)} />
      </GoogleOAuthProvider>
      <SearchModal
        searchRequest={searchFilter}
        open={openSearchModal}
        onClose={() => {
          setSearchFilter('');
          setMenuVisible(false);
          setOpenSearchModal(false);
        }}
      />
    </header>
  );
};

export default Header;
