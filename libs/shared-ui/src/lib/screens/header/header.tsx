import styles from './header.module.css';
import BtnToggleTheme from '../../components/btn-toggle-theme/btn-toggle-theme';
import Avatar from '../../components/avatar/avatar';

export function Header() {
  console.log('header.........;;');
  return (
    <header className={styles['header']}>
      <div className={styles['container']}>
        <h1 className={styles['title']}>twitter hashtag analyzer</h1>
        <div className={styles['icons-wrapper']}>
          <BtnToggleTheme />
          <Avatar src="https://i.pravatar.cc/150" />
        </div>
      </div>
    </header>
  );
}

export default Header;
