import styles from './btn-direction.module.css';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import React from 'react';

export interface BtnDirectionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
      aria-label={
        direction === 'left' ? 'scroll chart backward' : 'scroll chart forward'
      }
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
