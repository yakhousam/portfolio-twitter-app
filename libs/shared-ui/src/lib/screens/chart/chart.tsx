import { getOffset, TimeFrame, formatDate } from '@yak-twitter-app/shared-lib';
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
  const [btnDirectionLeftDisabled, setBtnDirectionLeftDisabled] =
    useState(false);
  const [btnDirectionRightDisabled, setBtnDirectionRightDisabled] =
    useState(true);

  const chartRef = useRef<Chartjs<'line'>>(null);

  const activeData = data[activeTimeFrame];

  const handleChangeTimeFrame = (timeFrame: TimeFrame) => {
    if (!chartRef.current) return;
    chartRef.current.data.labels = [...data[timeFrame].labels];
    chartRef.current.data.datasets[0].data = [
      ...data[timeFrame].datasets[0].data,
    ];
    if (chartRef.current.config.options?.scales?.['x']?.ticks) {
      chartRef.current.config.options.scales['x'].ticks.callback = (
        value: string | number
      ) => {
        const label = data[timeFrame].labels[Number(value)];
        const date = new Date(label);
        return formatDate(date, timeFrame);
      };
    }
    chartRef.current.update();
    setActiveTimeFrame(timeFrame);
    setBtnDirectionRightDisabled(true);
    if (
      chartRef.current.config.options?.scales?.['x']?.min !== undefined &&
      chartRef.current.config.options?.scales?.['x']?.max !== undefined
    ) {
      const min = data[timeFrame].labels.length - getOffset(timeFrame);
      const max = data[timeFrame].labels.length;
      console.log('update scales.', min, max);
      chartRef.current.config.options.scales['x'].min = min;
      chartRef.current.config.options.scales['x'].max = max;
      chartRef.current.update();
      setBtnDirectionLeftDisabled(min <= 0);
    }
  };

  const scrollChartForward = () => {
    if (!chartRef.current) return;
    if (
      chartRef.current.config.options?.scales?.['x']?.min !== undefined &&
      chartRef.current.config.options?.scales?.['x']?.max !== undefined
    ) {
      const min = chartRef.current.config.options.scales['x'].min;
      const max = chartRef.current.config.options.scales['x'].max;
      const offset = getOffset(activeTimeFrame);
      console.log({ min, max, offset });
      if (Number(max) + offset < activeData.labels.length) {
        chartRef.current.config.options.scales['x'].min = Number(min) + offset;
        chartRef.current.config.options.scales['x'].max = Number(max) + offset;
      } else {
        chartRef.current.config.options.scales['x'].min =
          activeData.labels.length - offset;
        chartRef.current.config.options.scales['x'].max =
          activeData.labels.length;
        setBtnDirectionRightDisabled(true);
      }
      setBtnDirectionLeftDisabled(false);
      chartRef.current.update();
    }
  };
  const scrollChartBackward = () => {
    if (!chartRef.current) return;
    if (
      chartRef.current.config.options?.scales?.['x']?.min !== undefined &&
      chartRef.current.config.options?.scales?.['x']?.max !== undefined
    ) {
      const min = chartRef.current.config.options.scales['x'].min;
      const max = chartRef.current.config.options.scales['x'].max;
      const offset = getOffset(activeTimeFrame);
      console.log({ min, max, offset });
      if (Number(min) - offset > 0) {
        chartRef.current.config.options.scales['x'].min = Number(min) - offset;
        chartRef.current.config.options.scales['x'].max = Number(max) - offset;
      } else {
        chartRef.current.config.options.scales['x'].min = 0;
        chartRef.current.config.options.scales['x'].max = offset - 1;
        setBtnDirectionLeftDisabled(true);
      }
      setBtnDirectionRightDisabled(false);
      chartRef.current.update();
    }
  };

  useEffect(() => {
    //clear chart data when user start a new search
    if (!chartRef.current) return;
    if (status === 'pending') {
      console.log('clearing chart data');
      chartRef.current.data.labels = [];
      chartRef.current.data.datasets[0].data = [];
      chartRef.current.update();
    }
  }, [status]);

  useEffect(() => {
    // update chart theme
    if (!chartRef.current) return;
    console.log('updating chart theme');
    const chartColor = getComputedStyle(document.body).getPropertyValue(
      '--chart-color'
    );
    const colorText = getComputedStyle(document.body).getPropertyValue(
      '--chart-tick-color'
    );
    const gridColor = getComputedStyle(document.body).getPropertyValue(
      '--chart-grid-color'
    );

    chartRef.current.data.datasets[0].borderColor = chartColor;
    if (chartRef.current.config.options?.scales?.['y']?.ticks) {
      chartRef.current.config.options.scales['y'].ticks.color = colorText;
    }
    if (chartRef.current.config.options?.scales?.['y']?.grid) {
      chartRef.current.config.options.scales['y'].grid.color = gridColor;
      chartRef.current.config.options.scales['y'].grid.borderColor = gridColor;
    }
    if (chartRef.current.config.options?.scales?.['x']?.ticks) {
      chartRef.current.config.options.scales['x'].ticks.color = colorText;
    }
    if (chartRef.current.config.options?.scales?.['x']?.grid) {
      chartRef.current.config.options.scales['x'].grid.color = gridColor;
      chartRef.current.config.options.scales['x'].grid.borderColor = gridColor;
    }
    chartRef.current.update();
  }, [theme]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (activeData.labels.length === 0) return;
    console.time('useEffect');
    const chartLabels: Array<string> =
      (chartRef.current.data.labels as Array<string>) || [];
    const chartData = chartRef.current.data.datasets[0].data as Array<number>;

    if (chartLabels.length === 0) {
      console.log('chart labels empty');
      chartLabels.push(...activeData.labels);
      chartData.push(...activeData.datasets[0].data);
      if (chartRef.current.config.options?.scales?.['x']?.ticks) {
        console.log('callbak functon is updated');
        chartRef.current.config.options.scales['x'].ticks.callback = (
          value: string | number
        ) => {
          const label = activeData.labels[Number(value)];
          const date = new Date(label);
          return formatDate(date, activeTimeFrame);
        };
      }
      if (
        chartRef.current.config.options?.scales?.['x']?.min !== undefined &&
        chartRef.current.config.options?.scales?.['x']?.max !== undefined
      ) {
        const min = activeData.labels.length - getOffset(activeTimeFrame);
        const max = activeData.labels.length;
        console.log('update scales.', min, max);
        chartRef.current.config.options.scales['x'].min = min;
        chartRef.current.config.options.scales['x'].max = max;
        chartRef.current.update();
        setBtnDirectionRightDisabled(true);
        setBtnDirectionLeftDisabled(min <= 0);
      }
      chartRef.current.update();
    } else if (chartLabels.length !== activeData.labels.length) {
      console.log('we receiving new data');
      console.log(chartLabels.length, chartData.length);
      // if the last date was updated after fetching new data, we update dataset data value
      chartData[0] =
        activeData.datasets[0].data.at(-chartLabels.length) || chartData[0];

      // we add the new labels and new data to the current chart
      chartLabels.unshift(...activeData.labels.slice(0, -chartLabels.length));
      chartData.unshift(
        ...activeData.datasets[0].data.slice(0, -chartData.length)
      );
      console.log(chartLabels.length, chartData.length);
      chartRef.current.update();
    }
    console.timeEnd('useEffect');
  }, [activeData.datasets, activeData.labels, activeTimeFrame]);

  return (
    <section className={styles['section']}>
      <div className={styles['buttons-container']}>
        <div className={styles['buttons-chart-container']}>
          {chartTimeFrame.map((timeFrame) => (
            <BtnChart
              key={timeFrame}
              caption={timeFrame}
              active={activeTimeFrame === timeFrame}
              handleClick={() => handleChangeTimeFrame(timeFrame)}
            />
          ))}
        </div>
        <div className={styles['buttons-direction-container']}>
          <div className={styles['dumy']}></div>
          <div className={styles['dumy']}></div>
          <div className={styles['dumy']}></div>
          <div className={styles['dumy']}></div>

          <BtnDirection
            direction="left"
            handleClick={scrollChartBackward}
            disabled={btnDirectionLeftDisabled}
          />
          <BtnDirection
            direction="right"
            handleClick={scrollChartForward}
            disabled={btnDirectionRightDisabled}
          />
        </div>
      </div>

      <LineChart chartRef={chartRef} />
    </section>
  );
}

export default Chart;
