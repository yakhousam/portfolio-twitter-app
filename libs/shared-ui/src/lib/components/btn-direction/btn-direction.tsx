import styles from './btn-direction.module.css';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

export interface BtnDirectionProps {
  direction: 'left' | 'right';
  handleClick?: () => void;
}

export function BtnDirection({ direction, handleClick }: BtnDirectionProps) {
  return (
    <button
      className={styles['button']}
      onClick={handleClick}
      aria-label={direction === 'left' ? 'backward' : 'forward'}
    >
      {direction === 'left' ? (
        <MdArrowBack className={styles['icon']} />
      ) : (
        <MdArrowForward className={styles['icon']} />
      )}
    </button>
  );
}

export default BtnDirection;
