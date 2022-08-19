import { MdSearch } from 'react-icons/md';
import { useAppData } from '../../context/use-app-data/use-app-data';
import styles from './btn-search.module.css';

export interface BtnSearchProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  handleCancelSearch: () => void;
}

export function BtnSearch({
  handleCancelSearch,
  handleSubmit,
}: BtnSearchProps) {
  const {
    state: { status },
  } = useAppData();

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
