import styles from './btn-toggle-theme.module.css';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from '@yak-twitter-app/context/use-theme';

export function BtnToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={styles['button']}
      aria-label={theme === 'dark' ? 'dark mode on' : 'dark mode off'}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <MdOutlineDarkMode aria-hidden={true} />
      ) : (
        <MdOutlineLightMode aria-hidden={true} />
      )}
    </button>
  );
}

export default BtnToggleTheme;
