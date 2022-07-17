import {
  formatDate,
  getOffset,
  StatChartData,
  TimeFrame,
} from '@yak-twitter-app/shared-lib';
import { BtnChart, BtnDirection, LineChart } from '@yak-twitter-app/shared-ui';
import { ChartData } from 'chart.js';

import { useEffect, useMemo, useState } from 'react';

import styles from './chart-section.module.css';

export interface ChartSectionProps {
  data: StatChartData;
}

const chartTimeFrame = ['d1', 'h4', 'h1', 'm30', 'm15', 'm5'] as const;

export function ChartSection({ data }: ChartSectionProps) {
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>('h1');
  const [offset, setOfset] = useState(() => getOffset(activeTimeFrame));
  const [scales, setScales] = useState({
    min: data[activeTimeFrame].length - offset,
    max: data[activeTimeFrame].length,
  });

  const handleTimeFrame = (timeFrame: TimeFrame) => {
    setActiveTimeFrame(timeFrame);
    const offset = getOffset(timeFrame);
    setOfset(offset);
    setScales({
      min: data[timeFrame].length - offset,
      max: data[timeFrame].length,
    });
  };
  function tickCallback(value: string | number) {
    const label = data[activeTimeFrame][Number(value)]['x'];
    const date = new Date(label);
    return formatDate(date, activeTimeFrame);
  }

  const scrollChartForward = () => {
    if (scales.max === data[activeTimeFrame].length) {
      return;
    }
    if (scales.max + offset < data[activeTimeFrame].length - 1) {
      setScales((prev) => ({ min: prev.min + offset, max: prev.max + offset }));
    } else {
      setScales({
        min: data[activeTimeFrame].length - offset,
        max: data[activeTimeFrame].length,
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
  // console.log('activeData length =', activeData.length);
  const forceUseMemoRun = activeData.length;
  const chartData: ChartData<'line'> = useMemo(() => {
    console.log('useMemo is updating chart data', forceUseMemoRun);
    const data = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    } as ChartData<'line'>;
    for (const { x, y } of activeData) {
      const d = new Date(x);
      data.labels?.push(d.toLocaleDateString() + ' ' + d.toLocaleTimeString());
      data.datasets[0].data.push(y);
    }
    return data;
  }, [activeData, forceUseMemoRun]);
  // console.log('chartData length', chartData.labels?.length);
  useEffect(() => {
    setScales({
      min: activeData.length - offset,
      max: activeData.length,
    });
  }, [activeData.length, offset]);

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
      <LineChart data={chartData} scales={scales} tickCallback={tickCallback} />
    </section>
  );
}

export default ChartSection;
