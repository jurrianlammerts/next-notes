import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import '../styles/index.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          type="text/css"
          href="/nprogress.css"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
