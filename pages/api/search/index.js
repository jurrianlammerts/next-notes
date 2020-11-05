import FuzzySearch from 'fuzzy-search';
import { getSortedPostsData } from '../../../lib/posts';

const posts =
  process.env.NODE_ENV === 'production'
    ? require('../../../cache/data').posts
    : getSortedPostsData();

export default (req, res) => {
  const searcher = new FuzzySearch(posts, ['title', 'category', 'slug'], {
    caseSensitive: true,
  });
  const results = searcher.search(req.query.q);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
};
