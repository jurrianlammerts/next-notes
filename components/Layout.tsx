import Head from 'next/head'
import Link from 'next/link'

const name = 'Notes'
export const siteTitle = 'Next.js Notes'

export default function Layout({ children, home }: any) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Create the most beautifull notes"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header>
        {home ? (
          <>
            <h1>{name}</h1>
          </>
        ) : (
          <>
            <h2>
              <Link href="/">
                <a>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}