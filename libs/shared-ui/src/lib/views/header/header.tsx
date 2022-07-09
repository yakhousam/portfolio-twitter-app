import styles from './header.module.css';
import { MdOutlineDarkMode, MdOutlineAccountCircle } from 'react-icons/md';
import { useTheme } from '@yak-twitter-app/shared-lib';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [theme, setTheme] = useTheme();
  const handleToggletheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <header className={styles['header']}>
      <div className={styles['container']}>
        <h1 className={styles['title']}>twitter hashtag analyzer</h1>
        <div className={styles['icons-wrapper']}>
          <MdOutlineDarkMode
            aria-label="toggle theme"
            className={styles['icon']}
            onClick={handleToggletheme}
          />
          <MdOutlineAccountCircle className={styles['icon']} />
        </div>
      </div>
    </header>
  );
}

export default Header;
