import Link from 'next/link';
import { forwardRef } from 'react';
import SearchIcon from '../icons/SearchIcon';
import DateComp from './Date';

const Header = forwardRef((props, ref) => {
  const { openSearch, setOpenSearch } = props;
  const isoDate = new Date().toISOString();

  return (
    <header>
      <DateComp dateString={isoDate} />
      <h1>
        <Link href="/">Today</Link>
      </h1>

      <button
        ref={ref}
        aria-label='Search Button'
        className="search-button"
        onClick={() => setOpenSearch(true)}
      >
        <SearchIcon />
      </button>
    </header>
  );
});

export default Header;
