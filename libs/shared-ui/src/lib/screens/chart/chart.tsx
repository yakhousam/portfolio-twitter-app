import {
  getOffset,
  TimeFrame,
  getChartOptions,
} from '@yak-twitter-app/shared-lib';
import { Chart as Chartjs } from 'chart.js';

import { useEffect, useRef, useState } from 'react';
import BtnChart from '../../components/btn-chart/btn-chart';
import BtnDirection from '../../components/btn-direction/btn-direction';
import LineChart from '../../components/line-chart/line-chart';
import { useAppData } from '../../context/use-app-data/use-app-data';
import { useTheme } from '../../context/use-theme/use-theme';

import styles from './chart.module.css';

const chartTimeFrame = ['d1', 'h4', 'h1', 'm30', 'm15', 'm5'] as const;
const timeFrame = 'm5';

export function Chart() {
  const { theme } = useTheme();
  const { state } = useAppData();
  const { chart: data, status } = state;
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>(timeFrame);

  const [step, setStep] = useState(0);
  const chartRef = useRef<Chartjs<'line'>>(null);
  const chartTimeFrameRef = useRef(timeFrame);

  const activeData = data[activeTimeFrame];

  const handleChangeTimeFrame = (timeFrame: TimeFrame) => {
    setActiveTimeFrame(timeFrame);
    setStep(0);
  };

  const scrollChartForward = () => {
    setStep((c) => (c > 1 ? c - 1 : 0));
  };
  const scrollChartBackward = () => {
    setStep((c) => {
      const maxSteps = activeData.labels.length / getOffset(activeTimeFrame);
      return c < maxSteps - 1 ? c + 1 : c;
    });
  };

  useEffect(() => {
    if (!chartRef.current) return;
    const chartLabels: Array<string> =
      (chartRef.current.data.labels as Array<string>) || [];
    const chartData = chartRef.current.data.datasets[0].data as Array<number>;
    chartRef.current.data.datasets[0].borderColor = getComputedStyle(
      document.body
    ).getPropertyValue('--chart-color');
    if (chartTimeFrameRef.current !== activeTimeFrame) {
      console.log('ref not equal active time frame');
      chartRef.current.data.labels = [...activeData.labels];
      chartRef.current.data.datasets[0].data = [...activeData.datasets[0].data];
      chartTimeFrameRef.current = activeTimeFrame;
    } else if (chartLabels.length === 0) {
      chartLabels.push(...activeData.labels);
      chartData.push(...activeData.datasets[0].data);
    } else if (activeData.datasets[0]?.data) {
      // if the last date was updated after fetching new data, we update dataset data value
      chartData[0] =
        activeData.datasets[0].data.at(-chartLabels.length) || chartData[0];

      // we add the new labels and new data to the current chart
      chartLabels.unshift(...activeData.labels.slice(0, -chartLabels.length));
      chartData.unshift(
        ...activeData.datasets[0].data.slice(0, -chartData.length)
      );
    }
    chartRef.current.config.options = getChartOptions(
      activeData.labels,
      activeTimeFrame,
      step
    );
    chartRef.current.update();
  }, [activeData.datasets, activeData.labels, activeTimeFrame, step, theme]);

  const isEmpty =
    status === 'idle' || status === 'rejected' || status === 'pending';
  if (isEmpty) {
    return null;
  }

  return (
    <section className={styles['section']}>
      <ChartButtonContainer
        activeTimeFrame={activeTimeFrame}
        updateTimeFrame={handleChangeTimeFrame}
        directionLeftOnClick={scrollChartBackward}
        directionRightOnClick={scrollChartForward}
      />
      <LineChart chartRef={chartRef} />
    </section>
  );
}

export default Chart;

interface ChartButtonContainerProps {
  activeTimeFrame: TimeFrame;
  updateTimeFrame: (timeFrame: TimeFrame) => void;
  directionLeftOnClick: () => void;
  directionRightOnClick: () => void;
}

function ChartButtonContainer({
  activeTimeFrame,
  updateTimeFrame,
  directionLeftOnClick,
  directionRightOnClick,
}: ChartButtonContainerProps) {
  return (
    <div className={styles['buttons-container']}>
      <div className={styles['buttons-chart-container']}>
        {chartTimeFrame.map((timeFrame) => (
          <BtnChart
            key={timeFrame}
            caption={timeFrame}
            active={activeTimeFrame === timeFrame}
            handleClick={() => updateTimeFrame(timeFrame)}
          />
        ))}
      </div>
      <div className={styles['buttons-direction-container']}>
        <div className={styles['dumy']}></div>
        <div className={styles['dumy']}></div>
        <div className={styles['dumy']}></div>
        <div className={styles['dumy']}></div>

        <BtnDirection direction="left" handleClick={directionLeftOnClick} />
        <BtnDirection direction="right" handleClick={directionRightOnClick} />
      </div>
    </div>
  );
}
