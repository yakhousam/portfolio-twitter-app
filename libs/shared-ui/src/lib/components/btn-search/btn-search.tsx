import styles from './btn-search.module.css';
import { clsx } from '@yak-twitter-app/shared-lib';

export interface BtnSearchProps {
  children: React.ReactNode;
}

export function BtnSearch({ children, ...props }: BtnSearchProps) {
  return (
    <button {...props} className={clsx(styles['button'])} type="submit">
      {children}
    </button>
  );
}

export default BtnSearch;
