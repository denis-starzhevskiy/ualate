import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import MainLayout from '@/components/layouts/MainLayout';
import Meta from '@/components/meta';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { me } from '@/api/authAPI';
import { useAuthStore } from '@/store/authStore';
import { NextAdapter } from 'next-query-params';
import { QueryParamProvider } from 'use-query-params';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    me()
      .then((result) => {
        login(result, 'token');
      })
      .catch(() => {
        logout();
      });
  }, []);

  useEffect(() => {
    if (window) {
      const theme = window.localStorage.getItem('theme');
      if (theme) {
        document.documentElement.className = theme;
      }
    }
  }, []);

  console.log(process.env);

  return (
    <QueryParamProvider adapter={NextAdapter} options={{ removeDefaultsFromUrl: true }}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GoogleOAuthProvider
            clientId={`818287238868-60ir0f93j9gil3o1u8917cviqegl8rjp.apps.googleusercontent.com`}>
            <Meta />
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </GoogleOAuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </QueryParamProvider>
  );
}
