import styles from './web-ui-screens-menu.module.css';
import { useEffect, useState } from 'react';
import { clsx, getCookieValue } from '@yak-twitter-app/utility/helpers';
import { Avatar } from '@yak-twitter-app/web-ui-components-avatar';

/* eslint-disable-next-line */
export interface WebUiScreensMenuProps {}

export function WebUiScreensMenu(props: WebUiScreensMenuProps) {
  const [src, setSrc] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const cookieValue = getCookieValue('user_avatar_url');
    if (cookieValue) {
      setSrc(decodeURIComponent(cookieValue));
    }
  }, []);
  return (
    <>
      <button
        aria-label="open user menu"
        aria-pressed={isOpen}
        className={styles['button']}
        onClick={() => setIsOpen((c) => !c)}
      >
        <Avatar src={src} />
      </button>
      <div className={clsx(styles['menu'], isOpen ? styles['open'] : '')}>
        <a href="auth/logout">Logout</a>
      </div>
    </>
  );
}

export default WebUiScreensMenu;
