import styles from './btn-direction.module.css';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { ButtonHTMLAttributes } from 'react';

export interface BtnDirectionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'left' | 'right';
  handleClick?: () => void;
}

export function BtnDirection({
  direction,
  handleClick,
  ...props
}: BtnDirectionProps) {
  return (
    <button
      className={styles['button']}
      onClick={handleClick}
      aria-label={direction === 'left' ? 'backward' : 'forward'}
      {...props}
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
