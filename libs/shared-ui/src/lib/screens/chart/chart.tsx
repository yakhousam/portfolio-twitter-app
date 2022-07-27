import {
  AppData,
  formatDate,
  getOffset,
  TimeFrame,
} from '@yak-twitter-app/shared-lib';

import { useEffect, useState } from 'react';
import BtnChart from '../../components/btn-chart/btn-chart';
import BtnDirection from '../../components/btn-direction/btn-direction';
import LineChart from '../../components/line-chart/line-chart';

import styles from './chart.module.css';

export interface ChartProps {
  data: AppData['chart'];
}
const chartTimeFrame = ['d1', 'h4', 'h1', 'm30', 'm15', 'm5'] as const;

export function Chart({ data }: ChartProps) {
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>('h1');
  const [offset, setOfset] = useState(() => getOffset(activeTimeFrame));
  const [scales, setScales] = useState({
    min: data[activeTimeFrame].labels.length - offset,
    max: data[activeTimeFrame].labels.length,
  });

  const handleTimeFrame = (timeFrame: TimeFrame) => {
    setActiveTimeFrame(timeFrame);
    const offset = getOffset(timeFrame);
    setOfset(offset);
    setScales({
      min: data[activeTimeFrame].labels.length - offset,
      max: data[activeTimeFrame].labels?.length,
    });
  };
  function tickCallback(value: string | number) {
    const label = data[activeTimeFrame]['labels'][Number(value)];
    const date = new Date(label);
    return formatDate(date, activeTimeFrame);
  }

  const scrollChartForward = () => {
    if (scales.max === data[activeTimeFrame].labels.length) {
      return;
    }
    if (scales.max + offset < data[activeTimeFrame].labels.length - 1) {
      setScales((prev) => ({ min: prev.min + offset, max: prev.max + offset }));
    } else {
      setScales({
        min: data[activeTimeFrame].labels.length - offset,
        max: data[activeTimeFrame].labels.length,
      });
    }
  };
  const scrollChartBackward = () => {
    if (scales.min === 0) {
      return;
    }
    if (scales.min > offset + 1) {
      setScales((prev) => ({ min: prev.min - offset, max: prev.max - offset }));
    } else {
      setScales({ min: 0, max: offset });
    }
  };
  const activeData = data[activeTimeFrame];

  useEffect(() => {
    setScales({
      min: activeData.labels.length - offset,
      max: activeData.labels.length,
    });
  }, [activeData.labels.length, offset]);
  // TODO: fix section rerender
  return (
    <section className={styles['section']}>
      <div className={styles['buttons-container']}>
        <div className={styles['buttons-chart-container']}>
          {chartTimeFrame.map((timeFrame) => (
            <BtnChart
              key={timeFrame}
              caption={timeFrame}
              active={activeTimeFrame === timeFrame}
              handleClick={() => handleTimeFrame(timeFrame)}
            />
          ))}
        </div>
        <div className={styles['buttons-direction-container']}>
          <div className={styles['dumy']}></div>
          <div className={styles['dumy']}></div>
          <div className={styles['dumy']}></div>
          <div className={styles['dumy']}></div>

          <BtnDirection direction="left" handleClick={scrollChartBackward} />
          <BtnDirection direction="right" handleClick={scrollChartForward} />
        </div>
      </div>
      <LineChart
        data={activeData}
        scales={scales}
        tickCallback={tickCallback}
      />
    </section>
  );
}

export default Chart;
