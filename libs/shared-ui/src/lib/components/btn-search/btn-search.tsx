import styles from './btn-search.module.css';
import { clsx } from '@yak-twitter-app/shared-lib';

export interface BtnSearchProps {
  size: 'small' | 'large';
  children: React.ReactNode;
}

export function BtnSearch({ size, children, ...props }: BtnSearchProps) {
  return (
    <button
      {...props}
      className={clsx(
        styles['button'],
        size === 'large' ? styles['large'] : styles['small']
      )}
      type="submit"
    >
      {children}
    </button>
  );
}

export default BtnSearch;
