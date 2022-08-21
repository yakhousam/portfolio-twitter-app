import { useAppStatus } from '@yak-twitter-app/context/use-app-data';
import { MdSearch } from 'react-icons/md';
import styles from './btn-search.module.css';

export interface BtnSearchProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleCancelSearch: () => void;
}

export function BtnSearch({
  handleCancelSearch,
  handleSubmit,
}: BtnSearchProps) {
  const status = useAppStatus();

  const isSearching = status === 'pending' || status === 'receiving';

  return isSearching ? (
    <button className={styles['button']} onClick={handleCancelSearch}>
      CANCEL
    </button>
  ) : (
    <button
      className={styles['button']}
      onClick={handleSubmit}
      aria-label="search"
    >
      <MdSearch className={styles['icon']} />
    </button>
  );
}

export default BtnSearch;
