import styles from './btn-search.module.css';
import { clsx } from '@yak-twitter-app/shared-lib';

export interface BtnSearchProps {
  handleClick: () => void;
  size: 'small' | 'large';
  children: React.ReactNode;
}

export function BtnSearch({ handleClick, size, children }: BtnSearchProps) {
  return (
    <button
      className={clsx(
        styles['button'],
        size === 'large' ? styles['large'] : styles['small']
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default BtnSearch;
