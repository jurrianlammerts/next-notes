import Link from 'next/link';
import { forwardRef } from 'react';
import { Avatar } from 'react-lorem-ipsum';
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
        className="search-button"
        onClick={() => setOpenSearch(true)}
      >
        <Avatar className="avatar" />
      </button>
    </header>
  );
});

export default Header;
