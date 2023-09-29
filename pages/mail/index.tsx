import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/elements/PageTitle';
import s from './mail.module.scss';
import NotificationsLayout from '@/components/layouts/NotificationsLayout';
import Button from '@/components/elements/Button';
import Menu from '@/components/elements/Menu';
import Checkbox from '@/components/elements/CheckBox/CheckBox';
import clsx from 'clsx';
import trashIcon from '../../public/images/trash.svg';
import replyIcon from '../../public/images/reply.svg';
import expandLeftIcon from '../../public/images/expandLeft.svg';
import expandRightIcon from '../../public/images/expandRight.svg';
import Image from 'next/image';
import { letterIcon } from '@/components/modules/icons';
import Select from '@/components/elements/Select';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteMail, getMails } from '@/api/mailAPI';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import SendMailModal from '@/components/elements/SendMailModal';
import moment from 'moment';
import { useAuthStore } from '@/store/authStore';
import ConfirmModal from '@/components/elements/ConfirmModal';

export default function MailPage() {
  const [sortFilter, setSortFilter] = useState<'received' | 'send' | 'deleted' | 'note'>(
    'received'
  );
  const { data, isLoading, isError } = useQuery(['mails'], () => getMails());

  return (
    <div className={clsx('container', s.container)}>
      <BreadCrumbs
        path={[
          { title: 'Головна', link: '/' },
          { title: 'Профіль', link: '/profile' },
          { title: 'Пошта', link: '' },
        ]}
      />
      <PageTitle title="Пошта" />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <FetchError />
          ) : (
            <NotificationsLayout
              leftSide={<LeftSide sortFilter={sortFilter} setSortFilter={setSortFilter} />}
              rightSide={
                <RightSide
                  sortFilter={sortFilter}
                  setSortFilter={setSortFilter}
                  letters={data?.results}
                  count={data?.count}
                />
              }
            />
          )}
        </>
      )}
    </div>
  );
}

const LeftSide = ({
  sortFilter,
  setSortFilter,
}: {
  sortFilter: 'received' | 'send' | 'deleted' | 'note';
  setSortFilter: (newValue: 'received' | 'send' | 'deleted' | 'note') => void;
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button
        className={s.writeLetterButton}
        onClick={() => {
          setOpenModal(true);
        }}>
        {letterIcon()}
        Написати листа
      </Button>
      <Menu
        value={sortFilter}
        onChange={setSortFilter}
        menu={[
          { title: 'Вхідні', value: 'received' },
          { title: 'Відправлені', value: 'send' },
          { title: 'Видаленні', value: 'deleted' },
          { title: 'Чернетки', value: 'note' },
        ].map((item) => ({
          label: item.title,
          value: item.value,
        }))}
      />
      <SendMailModal onClose={() => setOpenModal(false)} open={openModal} />
    </>
  );
};

const RightSide = ({
  letters,
  count,
  sortFilter,
  setSortFilter,
}: {
  letters: { recipient: number; message: string; time: string; sender: number; id: number }[];
  count: number;
  sortFilter: 'received' | 'send' | 'deleted' | 'note';
  setSortFilter: (newValue: 'received' | 'send' | 'deleted' | 'note') => void;
}) => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [replyId, setReplyId] = useState<number | null>(null);
  const currentUser = useAuthStore((state) => state.user);
  const [sortedLetters, setSortedLetters] = useState(letters);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openConfirmSeveralModal, setOpenConfirmSeveralModal] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);

  useEffect(() => {
    setSortedLetters(() => {
      return letters.filter((item) => {
        if (sortFilter === 'received') {
          return item.recipient == currentUser.id;
        }

        if (sortFilter === 'send') {
          return item.sender == currentUser.id;
        }

        if (sortFilter === 'deleted') {
          return false;
        }

        if (sortFilter === 'note') {
          return false;
        }
      });
    });
  }, [sortFilter]);

  return (
    <>
      <div className={s.mobileContainer}>
        <Button
          className={s.writeLetterButtonMobile}
          onClick={() => {
            setOpenModal(true);
          }}>
          {letterIcon()}
          Написати листа
        </Button>
        <div className={s.sortContainer}>
          <div className={clsx('color-light-grey', 'fontsize14')}>Категорії</div>
          <Select
            value={sortFilter}
            onChange={(newValue: 'received' | 'send' | 'deleted' | 'note') =>
              setSortFilter(newValue)
            }
            options={[
              { title: 'Вхідні', value: 'received' },
              { title: 'Відправлені', value: 'send' },
              { title: 'Видаленні', value: 'deleted' },
              { title: 'Чернетки', value: 'note' },
            ].map((item) => ({
              label: item.title,
              value: item.value,
            }))}
          />
        </div>
      </div>
      <div className={s.section}>
        <div
          className={clsx(
            'color-light-grey',
            'fontsize14'
          )}>{`Показано ${sortedLetters.length} сповіщення`}</div>
        <div className={s.sortContainer}>
          <div
            className={clsx(
              'color-light-grey',
              'fontsize14'
            )}>{`1 - ${sortedLetters.length} из ${sortedLetters.length}`}</div>
          <div className={s.prevNextButtonContainer}>
            <Button className={s.prevNextButton}>
              <Image src={expandLeftIcon} alt="previous" />
            </Button>
            <Button className={s.prevNextButton}>
              <Image src={expandRightIcon} alt="next" />
            </Button>
          </div>
        </div>
      </div>
      {sortedLetters?.length === 0 ? (
        <p style={{ textAlign: 'center', margin: '20px 0px' }}>Листів не знайдено.</p>
      ) : (
        <>
          <ul className={s.lettersList}>
            {sortedLetters.map((letter, index) => (
              <li key={index}>
                <div
                  className={clsx(
                    s.letterContainer,
                    selectedLetters.includes(index.toString()) && s.selectedRow
                  )}>
                  <div className={s.checkboxContainer}>
                    <Checkbox
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedLetters([...selectedLetters, letter.id.toString()]);
                        } else {
                          setSelectedLetters(
                            selectedLetters.filter((item) => item !== letter.id.toString())
                          );
                        }
                      }}
                    />
                  </div>
                  <div className={s.date}>
                    {moment(letter.time).format('DD-MM-YYYY') || '15.02.2023'}
                  </div>
                  <div className={s.sender}>{letter.recipient || 'Дмитрій'}</div>
                  <div className={s.content}>
                    {letter.message ||
                      `Вітання.Добро пожалувати в систему перекладів «UA Translate». Цей сайт призначений
                      для професійних мов любительських перекладів будь-яких новелів, фанфіків, ранобе з
                      різних мов.`}
                  </div>
                  <div className={s.actionsContainer}>
                    <Button
                      onClick={() => {
                        setOpenConfirmModal(true);
                        setDeleteMessageId(letter.id.toString());
                      }}>
                      <Image src={trashIcon} alt="delete letter" />
                    </Button>
                    <Button
                      onClick={() => {
                        setReplyId(letter.sender);
                        setOpenModal(true);
                      }}>
                      <Image src={replyIcon} alt="send letter" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {sortedLetters && sortedLetters.length > 0 && (
            <Button
              disabled={selectedLetters.length === 0}
              onClick={() => setOpenConfirmSeveralModal(true)}>
              <Image src={trashIcon} alt="delete selected letters" />
              Видалити обрані
            </Button>
          )}
        </>
      )}
      <SendMailModal onClose={() => setOpenModal(false)} open={openModal} replyId={replyId} />
      <ConfirmModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        text={'Ви точно бажаєте видалити даний лист?'}
        onConfirmAction={() => {
          deleteMail(deleteMessageId);
          queryClient.invalidateQueries(['mails']);
        }}
      />
      <ConfirmModal
        open={openConfirmSeveralModal}
        onClose={() => setOpenConfirmSeveralModal(false)}
        text={'Ви точно бажаєте видалити обрані листи?'}
        onConfirmAction={() => {
          selectedLetters.forEach((item) => {
            deleteMail(item);
          });
          queryClient.invalidateQueries(['mails']);
        }}
      />
    </>
  );
};
