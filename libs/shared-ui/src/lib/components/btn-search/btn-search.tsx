import styles from './btn-search.module.css';

export interface BtnSearchProps {
  children: React.ReactNode;
}

export function BtnSearch({ children, ...props }: BtnSearchProps) {
  return (
    <button
      {...props}
      className={styles['button']}
      type="submit"
      aria-label="search"
    >
      {children}
    </button>
  );
}

export default BtnSearch;
