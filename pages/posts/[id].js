import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import Date from '../../components/Date';

export default function Post({ postData }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Layout>
      <Head>
        <title>Notes - {postData.title}</title>
      </Head>
      <article>
        <picture
          style={{
            position: 'relative',
            paddingBottom: '56.25%', 
            overflow: 'hidden',
          }}
        >
          <source
            srcSet={require(`../../public/images/${postData.slug}.jpg?webp`)}
            type="image/webp"
          />
          <source
            srcSet={require(`../../public/images/${postData.slug}.jpg`)}
            type="image/jpeg"
          />
          {!loaded ? (
            <img
              key={postData.id}
              src={require(`../../public/images/${postData.slug}.jpg?lqip`)}
              alt="Picture of the author"
              style={{
                width: '100%',
                height: 500,
                top: 0,
                left: 0,
                position: 'absolute',
              }}
              onLoad={setLoaded(true)}
            />
          ) : (
            <img
              key={postData.id}
              src={require(`../../public/images/${postData.slug}.jpg`)}
              alt="Picture of the author"
              style={{
                width: '100%',
                height: 500,
                top: 0,
                left: 0,
                position: 'absolute',
                objectFit: 'cover',
              }}
            />
          )}
        </picture>
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
