import styles from './header.module.css';
import { MdOutlineAccountCircle } from 'react-icons/md';
import BtnToggleTheme from '../../components/btn-toggle-theme/btn-toggle-theme';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header className={styles['header']}>
      <div className={styles['container']}>
        <h1 className={styles['title']}>twitter hashtag analyzer</h1>
        <div className={styles['icons-wrapper']}>
          <BtnToggleTheme />
          <MdOutlineAccountCircle className={styles['icon']} />
        </div>
      </div>
    </header>
  );
}

export default Header;
