import { clsx } from '@yak-twitter-app/shared-lib';
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
    <button
      className={clsx(styles['button'], active ? styles['active'] : '')}
      onClick={handleClick}
    >
      {caption}
    </button>
  );
}

export default BtnChart;
