import styles from './btn-toggle-theme.module.css';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from '@yak-twitter-app/context';

export function BtnToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={styles['button']}
      aria-label="toggle theme"
      onClick={toggleTheme}
    >
      {theme === 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </button>
  );
}

export default BtnToggleTheme;
