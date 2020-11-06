import { search } from 'ss-search';

import { getSortedPostsData } from '../../../lib/posts';

const data =
  process.env.NODE_ENV === 'production'
    ? require('../../../cache/data').posts
    : getSortedPostsData();

const searchKeys = ['title', 'category'];

export default async (req, res) => {
  const results = search(data, searchKeys, req.query.q);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
};
