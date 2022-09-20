import { clsx } from '@yak-twitter-app/utility/helpers';
import styles from './btn-chart.module.css';

export interface BtnChartProps {
  handleClick: () => void;
  caption: string;
  active?: boolean;
}

export function BtnChart({
  handleClick,
  caption,
  active = false,
}: BtnChartProps) {
  return (
    <div className={styles['container']}>
      <button
        className={clsx(styles['button'], active ? styles['active'] : '')}
        onClick={handleClick}
        aria-pressed={active ? true : undefined}
      >
        {caption}
      </button>
    </div>
  );
}

export default BtnChart;
