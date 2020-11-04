import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Search from '../components/Search';
import SearchIcon from '../icons/SearchIcon';

const name = 'Notes';
export const siteTitle = 'Next.js Notes';

export default function Layout({ children, home }: any) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Create the most beautifull notes" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header>
        <h1>
          <Link href="/">
            <a>{name}</a>
          </Link>
        </h1>
        <button
          className="search-button"
          onClick={() => setOpenSearch(!openSearch)}
        >
          <SearchIcon />
        </button>
      </header>
      <section className="search">
        {openSearch && <Search />}
      </section>
      <main>
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
