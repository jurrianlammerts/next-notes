import Head from 'next/head';
import Link from 'next/link';
import Search from '../components/Search'

const name = 'Notes';
export const siteTitle = 'Next.js Notes';

export default function Layout({ children, home }: any) {
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
      </header>
      <section>
        <h2>Search</h2>
        <Search />
      </section>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
