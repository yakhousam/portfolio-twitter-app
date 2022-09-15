import { BtnToggleTheme } from '@yak-twitter-app/web-ui-components-btn-toggle-theme';
import { Menu } from '@yak-twitter-app/web/ui/screens/menu';

import styles from './header.module.css';

export function Header() {
  console.log('header.........;;');

  return (
    <header className={styles['header']}>
      <div className={styles['container']}>
        <h1 className={styles['title']}>twitter hashtag analyzer</h1>
        <div className={styles['icons-wrapper']}>
          <BtnToggleTheme />
          <Menu />
        </div>
      </div>
    </header>
  );
}

export default Header;
