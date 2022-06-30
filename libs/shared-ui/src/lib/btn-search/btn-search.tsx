import styles from './btn-search.module.css';
import { MdSearch } from 'react-icons/md';
import { clsx } from '@yak-twitter-app/shared-lib';

export interface BtnSearchProps {
  handleClick: () => void;
  size: 'small' | 'large';
}

export function BtnSearch({ handleClick, size }: BtnSearchProps) {
  return (
    <button
      className={clsx(
        styles['button'],
        size === 'large' ? styles['large'] : styles['small']
      )}
      onClick={handleClick}
    >
      <MdSearch className={styles['icon']} />
    </button>
  );
}

export default BtnSearch;
