import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import Search from '../components/Search';
import Header from '../components/Header';

// import SearchIcon from '../icons/SearchIcon';

export const siteTitle = 'Next.js Notes';

export default function Layout({ children, home }: any) {
  const ref = useRef<any>(null);

  const [openSearch, setOpenSearch] = useState(false);
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenSearch(false);
    }
    if (e.key === 'Space') {
      setOpenSearch(true);
    }
  }, []);

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('keyup', escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('keyup', escapeListener);
    };
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Create the most beautifull notes" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Header />
      {/* <button
        className="search-button"
        onClick={() => setOpenSearch(!openSearch)}
      >
        <SearchIcon />
      </button> */}
      {openSearch && (
        <div className="overlay" ref={ref}>
          <div className="search">
            <Search open={openSearch} setOpen={setOpenSearch} />
          </div>
        </div>
      )}
      <main className="container">
        <div>{children}</div>
        {!home && (
          <div>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
