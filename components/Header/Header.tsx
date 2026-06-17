'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav aria-label="Main Navigation">
        <ul>
          <li>
            <Link href="/auth">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
