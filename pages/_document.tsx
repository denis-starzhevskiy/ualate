import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="uk">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="portal" style={{ zIndex: 100 }} />
      </body>
    </Html>
  );
}
