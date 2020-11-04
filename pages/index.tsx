import Head from 'next/head'
// import Link from 'next/link'
import Layout , { siteTitle } from '../components/Layout'
import Search from '../components/Search'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>Search</h2>
        <Search />
      </section>
    </Layout>
  )
}