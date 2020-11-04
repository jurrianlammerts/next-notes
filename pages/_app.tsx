import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import '../styles/index.css';

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
