import React from 'react';
import s from './UserMenu.module.scss';
import expandIcon from '../../../public/images/ArrowDropDown.svg';
import Image from 'next/image';
import clsx from 'clsx';
import {
  addMoreRoundedIcon,
  bookIcon,
  bookMarkIcon,
  exitIcon,
  letterIcon,
  noticeIcon,
  profileIcon,
  settingIcon,
} from '@/components/modules/icons';
import logo from '@/public/images/logo.png';
import Divider from '@/components/elements/Divider';
import Popover from '@/components/elements/Popover';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/router';

type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        className={clsx(s.selectContainer)}
        onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Image className={s.logo} src={user?.logo || logo} alt="Logo" width={50} height={50} />
        <div className={s.valueText}>{user?.first_name + ' ' + user?.last_name}</div>
        <Image src={expandIcon} alt={'expand icon'} />
      </div>
      <Popover open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} width={250}>
        <ul className={s.selectPopover}>
          <li
            key={'button'}
            onClick={() => {
              setAnchorEl(null);
            }}
            className={s.createButtonContainer}>
            <button
              className={clsx('button', s.customButton)}
              onClick={() => router.push('/create-translation')}>
              {addMoreRoundedIcon(router?.pathname === '/create-translation')}Створити переклад
            </button>
          </li>
          <li
            key={'button'}
            onClick={() => {
              setAnchorEl(null);
            }}
            className={s.optionButtonContainer}>
            <button
              className={clsx('button', s.optionButton)}
              onClick={() => router.push('/profile')}>
              {profileIcon(router?.pathname === '/profile')}Профіль
            </button>
          </li>
          <li
            key={'button'}
            onClick={() => {
              setAnchorEl(null);
            }}
            className={s.optionButtonContainer}>
            <button
              className={clsx('button', s.optionButton)}
              onClick={() => router.push('/notifications')}>
              {noticeIcon(router?.pathname === '/notifications')}Сповіщення
            </button>
          </li>
          <li
            key={'button'}
            onClick={() => {
              setAnchorEl(null);
            }}
            className={s.optionButtonContainer}>
            <button className={clsx('button', s.optionButton)} onClick={() => router.push('/mail')}>
              {letterIcon(router?.pathname === '/mail')}Пошта
            </button>
          </li>
          <li
            key={'button'}
            onClick={() => {
              setAnchorEl(null);
            }}
            className={s.optionButtonContainer}>
            <button
              className={clsx('button', s.optionButton)}
              onClick={() => router.push('/bookmarks')}>
              {bookMarkIcon(router?.pathname === '/bookmarks')}Закладки
            </button>
          </li>
          <li
            key={'button'}
            onClick={() => {
              setAnchorEl(null);
            }}
            className={s.optionButtonContainer}>
            <button
              className={clsx('button', s.optionButton)}
              onClick={() => router.push('/own-translations')}>
              {bookIcon(router?.pathname === '/own-translations')}Власні переклади
            </button>
          </li>
          <li
            key={'button'}
            onClick={() => {
              setAnchorEl(null);
            }}
            className={s.optionButtonContainer}>
            <button
              className={clsx('button', s.optionButton)}
              onClick={() => router.push('/profile/settings')}>
              {settingIcon(router?.pathname === '/profile/settings')}Налаштування
            </button>
          </li>
          <Divider />
          <li
            key={'button'}
            onClick={() => {
              logout();
              setAnchorEl(null);
              if (window) window.location.href = '/';
            }}
            className={s.optionButtonContainer}>
            <button className={clsx('button', s.optionButton)}>{exitIcon()}Вихід</button>
          </li>
        </ul>
      </Popover>
    </>
  );
};

export default UserMenu;
