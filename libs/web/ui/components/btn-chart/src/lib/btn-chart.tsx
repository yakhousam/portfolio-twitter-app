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
    <button
      className={clsx(styles['button'], active ? styles['active'] : '')}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={`set chart time frame to ${caption}`}
    >
      {caption}
    </button>
  );
}

export default BtnChart;
