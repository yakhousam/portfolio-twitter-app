import styles from './header.module.css';
import { MdOutlineDarkMode, MdOutlineAccountCircle } from 'react-icons/md';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <header className={styles['header']}>
      <div className={styles['container']}>
        <h1 className={styles['title']}>twitter hashtag analyzer</h1>
        <div className={styles['icons-wrapper']}>
          <MdOutlineDarkMode className={styles['icon']} />
          <MdOutlineAccountCircle className={styles['icon']} />
        </div>
      </div>
    </header>
  );
}

export default Header;
