import Link from 'next/link';
import * as React from 'react';
import { Avatar } from 'react-lorem-ipsum';
import DateComp from './Date';

export default function Header() {
  const isoDate = new Date().toISOString();

  return (
    <header>
      <DateComp dateString={isoDate} />
      <h1>
        <Link href="/">Today</Link>
      </h1>

      <Avatar className="avatar" />
    </header>
  );
}
