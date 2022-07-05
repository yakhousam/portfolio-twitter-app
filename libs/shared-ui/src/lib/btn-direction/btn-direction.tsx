import styles from './btn-direction.module.css';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

export interface BtnDirectionProps {
  direction: 'left' | 'right';
}

export function BtnDirection({ direction }: BtnDirectionProps) {
  return (
    <button className={styles['button']}>
      {direction === 'left' ? (
        <MdArrowBack className={styles['icon']} />
      ) : (
        <MdArrowForward className={styles['icon']} />
      )}
    </button>
  );
}

export default BtnDirection;
