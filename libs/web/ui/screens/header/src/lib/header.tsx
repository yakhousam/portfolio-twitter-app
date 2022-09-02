import { clsx } from '@yak-twitter-app/utility/helpers';
import { Avatar } from '@yak-twitter-app/web-ui-components-avatar';
import { BtnToggleTheme } from '@yak-twitter-app/web-ui-components-btn-toggle-theme';
import { useEffect, useState } from 'react';
import styles from './header.module.css';

export function Header() {
  console.log('header.........;;');
  const [src, setSrc] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // from MDN
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('user_avatar_url='))
      ?.split('=')[1];
    if (cookieValue) {
      setSrc(decodeURIComponent(cookieValue));
    }
  }, []);
  return (
    <header className={styles['header']}>
      <div className={styles['container']}>
        <h1 className={styles['title']}>twitter hashtag analyzer</h1>
        <div className={styles['icons-wrapper']}>
          <BtnToggleTheme />
          <button
            className={styles['button']}
            onClick={() => setIsOpen((c) => !c)}
          >
            <Avatar src={src} />
          </button>
        </div>
        <div className={clsx(styles['menu'], isOpen ? styles['open'] : '')}>
          <a href="auth/logout">Logout</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
