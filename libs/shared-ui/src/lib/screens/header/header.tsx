import styles from './header.module.css';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useTheme } from '@yak-twitter-app/shared-lib';
import BtnToggleTheme from '../../components/btn-toggle-theme/btn-toggle-theme';

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
          <BtnToggleTheme handleClick={handleToggletheme} />
          <MdOutlineAccountCircle className={styles['icon']} />
        </div>
      </div>
    </header>
  );
}

export default Header;
