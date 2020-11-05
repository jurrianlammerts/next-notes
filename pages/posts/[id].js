import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import Date from '../../components/Date';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>Notes - {postData.title}</title>
      </Head>
      <article>
        <Image
          key={postData.id}
          src={`/images/${postData.slug}.jpg`}
          alt="Picture of the author"
          height={500}
          width={1000}
          layout="responsive"
        />
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
