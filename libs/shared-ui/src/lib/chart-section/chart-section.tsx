import { StatChartData } from '@yak-twitter-app/shared-lib';
import { ChartData } from 'chart.js';

import { useState } from 'react';
import BtnChart from '../btn-chart/btn-chart';
import BtnDirection from '../btn-direction/btn-direction';
import LineChart from '../line-chart/line-chart';
import styles from './chart-section.module.css';

export interface ChartSectionProps {
  data: StatChartData;
}

const chartTimeFrame = ['d1', 'h4', 'h1', 'm30', 'm15', 'm5'] as const;

type TimeFrame = typeof chartTimeFrame[number];

function getOffset(timeFrame: TimeFrame): number {
  switch (timeFrame) {
    case 'd1':
      return 7;
    case 'h4':
      return 14;
    case 'h1':
      return 20;
    case 'm30':
      return 30;
    case 'm15':
      return 40;
    case 'm5':
      return 50;
    default:
      return 20;
  }
}

export function ChartSection({ data }: ChartSectionProps) {
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>('h1');
  const [offset, setOfset] = useState(40);
  const [scales, setScales] = useState({
    min: data[activeTimeFrame].length - offset,
    max: data[activeTimeFrame].length,
  });
  console.log(scales);
  console.log(data[activeTimeFrame].length);

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
    console.log('tickcallback time frame', activeTimeFrame);
    const labels = data[activeTimeFrame].map((data) => data.x);
    const date = new Date(labels[Number(value)]);

    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

    switch (activeTimeFrame) {
      case 'h1': {
        const hour = date.getHours();
        if (hour === 0) {
          return date.toLocaleDateString();
        }
        if (hour % 4 === 0) {
          return `${date.getHours()}:00`;
        }
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }

      default:
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  }

  const scrollChartForward = () => {
    console.log(data[activeTimeFrame][data[activeTimeFrame].length - 1]);
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
    if (scales.min > offset + 1) {
      setScales((prev) => ({ min: prev.min - offset, max: prev.max - offset }));
    } else {
      setScales({ min: 0, max: offset });
    }
  };
  const chartData: ChartData<'line'> = {
    labels: data[activeTimeFrame].map(({ x }) => {
      const d = new Date(x);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }),
    datasets: [
      {
        data: data[activeTimeFrame].map(({ y }) => y),
      },
    ],
  };
  return (
    <section className={styles['section']}>
      <div className={styles['buttons-container']}>
        <div className={styles['buttons-chart-container']}>
          {chartTimeFrame.map((timeFrame, i) => (
            <BtnChart
              key={i}
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
        <LineChart
          data={chartData}
          scales={scales}
          tickCallback={tickCallback}
        />
      </div>
    </section>
  );
}

export default ChartSection;
