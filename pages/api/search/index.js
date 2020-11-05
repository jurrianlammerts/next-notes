const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:3000/posts/search?' });

import { getSortedPostsData } from '../../../lib/posts';

const posts =
  process.env.NODE_ENV === 'production'
    ? require('../../../cache/data').posts
    : getSortedPostsData();

export default async (req, res) => {
  try {
    const response = await client.search({
      q: 'pants',
    });
    console.log(response.hits.hits);
    console.log(response);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ response }));
  } catch (error) {
    console.trace(error.message);
  }
};
