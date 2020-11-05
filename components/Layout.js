import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import Search from './Search';
import Header from './Header';

import SearchIcon from '../icons/SearchIcon';

export const siteTitle = 'Notes';

export default function Layout({ children, home }) {
  const searchRef = useRef(null);
  const avatarRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);

  const escapeListener = useCallback((e) => {
    if (e.key === 'Escape') {
      setOpenSearch(false);
    }
    if (e.key === 'Alt') {
      setOpenSearch(true);
    }
  }, []);

  const onClick = useCallback((event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target)
    ) {
      setOpenSearch(false);
      window.removeEventListener('click', onClick);
    }
  }, []);

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('keyup', escapeListener);
    document.addEventListener('click', onClick);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('keyup', escapeListener);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Create the most beautifull notes" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Header
        ref={avatarRef}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />
      {openSearch && (
        <div className="overlay" onClick={(e) => onClick(e)}>
          <div className="search" ref={searchRef}>
            <Search open={openSearch} setOpen={setOpenSearch} />
          </div>
        </div>
      )}
      <main className="container">
        <div>{children}</div>
        {!home && (
          <div className="back-button">
            <Link href="/">← Back</Link>
          </div>
        )}
      </main>
    </div>
  );
}
