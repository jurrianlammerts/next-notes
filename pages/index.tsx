import Head from 'next/head';
import CardList from '../components/CardList';
import Layout, { siteTitle } from '../components/Layout';
import { getSortedPostsData } from '../lib/posts';

export default function Home({ allPosts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <CardList data={allPosts} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getSortedPostsData();

  return {
    props: { allPosts },
  };
}
