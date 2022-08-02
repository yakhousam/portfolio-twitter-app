import styles from './btn-toggle-theme.module.css';
import { MdOutlineDarkMode } from 'react-icons/md';

export interface BtnToggleThemeProps {
  handleClick: () => void;
}

export function BtnToggleTheme({ handleClick }: BtnToggleThemeProps) {
  return (
    <button
      className={styles['button']}
      aria-label="toggle theme"
      onClick={handleClick}
    >
      <MdOutlineDarkMode />
    </button>
  );
}

export default BtnToggleTheme;
