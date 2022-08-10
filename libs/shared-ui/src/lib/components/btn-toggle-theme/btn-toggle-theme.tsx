import styles from './btn-toggle-theme.module.css';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useTheme } from '../../context/use-theme/use-theme';

export function BtnToggleTheme() {
  const { toggleTheme } = useTheme();
  return (
    <button
      className={styles['button']}
      aria-label="toggle theme"
      onClick={toggleTheme}
    >
      <MdOutlineDarkMode />
    </button>
  );
}

export default BtnToggleTheme;
