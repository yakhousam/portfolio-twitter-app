import {
  combineChartData,
  fillEmptyDate,
  formatChartData,
  getChartData,
  getMostEngagedTweets,
} from './util';
import { faker } from '@faker-js/faker';
import {
  dateRange15min,
  dateRange1Day,
  dateRange1hour,
  dateRange30min,
  dateRange4hour,
  dateRange5min,
  TimeFrame,
} from '../helpers/date-helpers';
import { ChartDataLine, Data } from '../interfaces';

describe('fillEmptyData', () => {
  test('should fill between empty date, m5', () => {
    const startDate = new Date('12/28/2021');
    const endDate = new Date('01/02/2022');
    const uniqueDates = new Set();
    const data = Array(100)
      .fill('')
      .map(() => {
        let d = dateRange5min(
          faker.date.between(startDate, endDate).toLocaleString()
        );
        while (!d || uniqueDates.has(d)) {
          d = d = dateRange5min(
            faker.date.between(startDate, endDate).toLocaleString()
          );
        }
        uniqueDates.add(d);
        return {
          x: d,
          y: faker.datatype.number(100),
        };
      })
      .sort((a, b) => (a.x < b.x ? -1 : 1));

    const m5Data = fillEmptyDate(data, 'm5');
    // console.log('%o', m5Data);
    for (let i = 0; i < m5Data.length - 1; i++) {
      const date1 = new Date(m5Data[i]['x']);
      const date2 = new Date(m5Data[i + 1]['x']);
      date1.setMinutes(date1.getMinutes() + 5);
      expect(date1).toEqual(date2);
    }
  });

  test('should fill between empty date, m15', () => {
    const startDate = new Date('12/29/2021').toISOString();
    const endDate = new Date('01/04/2022').toISOString();
    const uniqueDates = new Set();
    const data = Array(100)
      .fill('')
      .map(() => {
        let d = dateRange15min(
          faker.date.between(startDate, endDate).toISOString()
        );
        while (!d || uniqueDates.has(d)) {
          d = d = dateRange15min(
            faker.date.between(startDate, endDate).toISOString()
          );
        }
        uniqueDates.add(d);
        return {
          x: d,
          y: faker.datatype.number(100),
        };
      })
      .sort((a, b) => (a.x < b.x ? -1 : 1));
    const m15Data = fillEmptyDate(data, 'm15');
    for (let i = 0; i < m15Data.length - 1; i++) {
      const date1 = new Date(m15Data[i]['x']);
      const date2 = new Date(m15Data[i + 1]['x']);
      date1.setMinutes(date1.getMinutes() + 15);
      expect(date1).toEqual(date2);
    }
  });

  test('should fill between empty date, m30', () => {
    const startDate = new Date('12/27/2021').toISOString();
    const endDate = new Date('01/03/2022').toISOString();
    const uniqueDates = new Set();
    const data = Array(100)
      .fill('')
      .map(() => {
        let d = dateRange30min(
          faker.date.between(startDate, endDate).toISOString()
        );
        while (!d || uniqueDates.has(d)) {
          d = d = dateRange30min(
            faker.date.between(startDate, endDate).toISOString()
          );
        }
        uniqueDates.add(d);
        return {
          x: d,
          y: faker.datatype.number(100),
        };
      })
      .sort((a, b) => (a.x < b.x ? -1 : 1));
    const m30Data = fillEmptyDate(data, 'm30');
    for (let i = 0; i < m30Data.length - 1; i++) {
      const date1 = new Date(m30Data[i]['x']);
      const date2 = new Date(m30Data[i + 1]['x']);
      date1.setMinutes(date1.getMinutes() + 30);
      expect(date1).toEqual(date2);
    }
  });

  test('should fill between empty date, h1', () => {
    const startDate = new Date('12/28/2021').toISOString();
    const endDate = new Date('01/05/2022').toISOString();
    const uniqueDates = new Set();
    const data = Array(100)
      .fill('')
      .map(() => {
        let d = dateRange1hour(
          faker.date.between(startDate, endDate).toISOString()
        );
        while (!d || uniqueDates.has(d)) {
          d = d = dateRange1hour(
            faker.date.between(startDate, endDate).toISOString()
          );
        }
        uniqueDates.add(d);
        return {
          x: d,
          y: faker.datatype.number(100),
        };
      })
      .sort((a, b) => (a.x < b.x ? -1 : 1));
    const h1Data = fillEmptyDate(data, 'h1');
    for (let i = 0; i < h1Data.length - 1; i++) {
      const date1 = new Date(h1Data[i]['x']);
      const date2 = new Date(h1Data[i + 1]['x']);
      date1.setHours(date1.getHours() + 1);
      expect(date1).toEqual(date2);
    }
  });
  test('should fill between empty date, h4', () => {
    const startDate = new Date('12/15/2021').toISOString();
    const endDate = new Date('01/15/2022').toISOString();
    const uniqueDates = new Set();
    const data = Array(100)
      .fill('')
      .map(() => {
        let d = dateRange4hour(
          faker.date.between(startDate, endDate).toISOString()
        );
        while (!d || uniqueDates.has(d)) {
          d = d = dateRange4hour(
            faker.date.between(startDate, endDate).toISOString()
          );
        }
        uniqueDates.add(d);
        return {
          x: d,
          y: faker.datatype.number(100),
        };
      })
      .sort((a, b) => (a.x < b.x ? -1 : 1));
    const h4Data = fillEmptyDate(data, 'h4');
    for (let i = 0; i < h4Data.length - 1; i++) {
      const date1 = new Date(h4Data[i]['x']);
      const date2 = new Date(h4Data[i + 1]['x']);
      date1.setHours(date1.getHours() + 4);
      expect(date1).toEqual(date2);
    }
  });

  test('should fill between empty date, d1', () => {
    const startDate = new Date('12/15/2021').toISOString();
    const endDate = new Date('01/15/2022').toISOString();
    const uniqueDates = new Set();
    const data = Array(10)
      .fill('')
      .map(() => {
        let d = dateRange1Day(
          faker.date.between(startDate, endDate).toISOString()
        );
        while (!d || uniqueDates.has(d)) {
          d = d = dateRange1Day(
            faker.date.between(startDate, endDate).toISOString()
          );
        }
        uniqueDates.add(d);
        return {
          x: d,
          y: faker.datatype.number(100),
        };
      })
      .sort((a, b) => (a.x < b.x ? -1 : 1));
    const d1Data = fillEmptyDate(data, 'd1');
    for (let i = 0; i < d1Data.length - 1; i++) {
      const date1 = new Date(d1Data[i]['x']);
      const date2 = new Date(d1Data[i + 1]['x']);
      date1.setDate(date1.getDate() + 1);
      expect(date1).toEqual(date2);
    }
  });
});

describe('getMostEngagedTweets', () => {
  test('it should return the ids of the 3 most engaged tweets', () => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      let min = 0,
        max = 100;
      if (i > 5 && i < 9) {
        switch (true) {
          case i === 6:
            min = 700;
            max = 800;
            break;
          case i === 7:
            min = 600;
            max = 699;
            break;
          case i === 8:
            min = 500;
            max = 599;
            break;
          default:
            break;
        }
      }
      arr.push({
        text: faker.lorem.text(),
        public_metrics: {
          retweet_count: faker.datatype.number({ min, max }),
          reply_count: faker.datatype.number({ min, max }),
          like_count: faker.datatype.number({ min, max }),
          quote_count: faker.datatype.number({ min, max }),
        },
        author_id: faker.datatype.uuid(),
        created_at: faker.date
          .between('2021-12-27T23:00:00.000Z', '2022-01-03T23:00:00.000Z')
          .toISOString(),
        id: faker.datatype.uuid(),
      });
    }

    const ids = getMostEngagedTweets(arr, 3).map(({ id }) => id);
    expect(ids).toEqual(arr.slice(6, 9).map(({ id }) => id));
  });
});

describe('getChartData', () => {
  test('getChartData m5', () => {
    const dates = [
      ...new Set(
        Array(100)
          .fill(0)
          .map(() =>
            String(
              dateRange5min(
                faker.date
                  .between(
                    '2021-12-27T23:00:00.000Z',
                    '2022-01-03T23:00:00.000Z'
                  )
                  .toISOString()
              )
            )
          )
      ),
    ];
    const values = Array(dates.length)
      .fill(0)
      .map(() => faker.datatype.number({ min: 1 }));

    const data = dates.reduce((acc: Record<string, number>, key, i) => {
      acc[key] = values[i];
      return acc;
    }, {});
    const res = getChartData(data, 'm5');
    expect(res).toHaveProperty('labels');
    expect(res).toHaveProperty('datasets');
    for (let i = 0; i < res.labels.length - 1; i++) {
      const date1 = new Date(res.labels[i]);
      const date2 = new Date(res.labels[i + 1]);
      date1.setMinutes(date1.getMinutes() + 5);
      expect(date1).toEqual(date2);
      const found = dates.indexOf(res.labels[i]);
      if (found > -1) {
        expect(res.datasets[0].data[i]).toBe(values[found]);
      } else {
        expect(res.datasets[0].data[i]).toBe(0);
      }
    }
  });

  test('getChartData m15', () => {
    const dates = [
      ...new Set(
        Array(100)
          .fill(0)
          .map(() =>
            String(
              dateRange15min(
                faker.date
                  .between(
                    '2021-12-27T23:00:00.000Z',
                    '2022-01-03T23:00:00.000Z'
                  )
                  .toISOString()
              )
            )
          )
      ),
    ];
    const values = Array(dates.length)
      .fill(0)
      .map(() => faker.datatype.number({ min: 1 }));

    const data = dates.reduce((acc: Record<string, number>, key, i) => {
      acc[key] = values[i];
      return acc;
    }, {});
    const res = getChartData(data, 'm15');
    expect(res).toHaveProperty('labels');
    expect(res).toHaveProperty('datasets');
    for (let i = 0; i < res.labels.length - 1; i++) {
      const date1 = new Date(res.labels[i]);
      const date2 = new Date(res.labels[i + 1]);
      date1.setMinutes(date1.getMinutes() + 15);
      expect(date1).toEqual(date2);
      const found = dates.indexOf(res.labels[i]);
      if (found > -1) {
        expect(res.datasets[0].data[i]).toBe(values[found]);
      } else {
        expect(res.datasets[0].data[i]).toBe(0);
      }
    }
  });

  test('getChartData m30', () => {
    const dates = [
      ...new Set(
        Array(100)
          .fill(0)
          .map(() =>
            String(
              dateRange30min(
                faker.date
                  .between(
                    '2021-12-27T23:00:00.000Z',
                    '2022-01-03T23:00:00.000Z'
                  )
                  .toISOString()
              )
            )
          )
      ),
    ];
    const values = Array(dates.length)
      .fill(0)
      .map(() => faker.datatype.number({ min: 1 }));

    const data = dates.reduce((acc: Record<string, number>, key, i) => {
      acc[key] = values[i];
      return acc;
    }, {});
    const res = getChartData(data, 'm30');
    expect(res).toHaveProperty('labels');
    expect(res).toHaveProperty('datasets');
    for (let i = 0; i < res.labels.length - 1; i++) {
      const date1 = new Date(res.labels[i]);
      const date2 = new Date(res.labels[i + 1]);
      date1.setMinutes(date1.getMinutes() + 30);
      expect(date1).toEqual(date2);
      const found = dates.indexOf(res.labels[i]);
      if (found > -1) {
        expect(res.datasets[0].data[i]).toBe(values[found]);
      } else {
        expect(res.datasets[0].data[i]).toBe(0);
      }
    }
  });

  test('getChartData h1', () => {
    const dates = [
      ...new Set(
        Array(100)
          .fill(0)
          .map(() =>
            String(
              dateRange1hour(
                faker.date
                  .between(
                    '2021-12-27T23:00:00.000Z',
                    '2022-01-13T23:00:00.000Z'
                  )
                  .toISOString()
              )
            )
          )
      ),
    ];
    const values = Array(dates.length)
      .fill(0)
      .map(() => faker.datatype.number({ min: 1 }));

    const data = dates.reduce((acc: Record<string, number>, key, i) => {
      acc[key] = values[i];
      return acc;
    }, {});
    const res = getChartData(data, 'h1');
    expect(res).toHaveProperty('labels');
    expect(res).toHaveProperty('datasets');
    for (let i = 0; i < res.labels.length - 1; i++) {
      const date1 = new Date(res.labels[i]);
      const date2 = new Date(res.labels[i + 1]);
      date1.setHours(date1.getHours() + 1);
      expect(date1).toEqual(date2);
      const found = dates.indexOf(res.labels[i]);
      if (found > -1) {
        expect(res.datasets[0].data[i]).toBe(values[found]);
      } else {
        expect(res.datasets[0].data[i]).toBe(0);
      }
    }
  });

  test('getChartData h4', () => {
    const dates = [
      ...new Set(
        Array(100)
          .fill(0)
          .map(() =>
            String(
              dateRange4hour(
                faker.date
                  .between(
                    '2021-12-17T23:00:00.000Z',
                    '2022-01-13T23:00:00.000Z'
                  )
                  .toISOString()
              )
            )
          )
      ),
    ];
    const values = Array(dates.length)
      .fill(0)
      .map(() => faker.datatype.number({ min: 1 }));

    const data = dates.reduce((acc: Record<string, number>, key, i) => {
      acc[key] = values[i];
      return acc;
    }, {});
    const res = getChartData(data, 'h4');
    expect(res).toHaveProperty('labels');
    expect(res).toHaveProperty('datasets');
    for (let i = 0; i < res.labels.length - 1; i++) {
      const date1 = new Date(res.labels[i]);
      const date2 = new Date(res.labels[i + 1]);
      date1.setHours(date1.getHours() + 4);
      expect(date1).toEqual(date2);
      const found = dates.indexOf(res.labels[i]);
      if (found > -1) {
        expect(res.datasets[0].data[i]).toBe(values[found]);
      } else {
        expect(res.datasets[0].data[i]).toBe(0);
      }
    }
  });

  test('getChartData D1', () => {
    const dates = [
      ...new Set(
        Array(50)
          .fill(0)
          .map(() =>
            String(
              dateRange1Day(
                faker.date
                  .between(
                    '2021-12-17T23:00:00.000Z',
                    '2022-01-13T23:00:00.000Z'
                  )
                  .toISOString()
              )
            )
          )
      ),
    ];
    const values = Array(dates.length)
      .fill(0)
      .map(() => faker.datatype.number({ min: 1 }));

    const data = dates.reduce((acc: Record<string, number>, key, i) => {
      acc[key] = values[i];
      return acc;
    }, {});
    const res = getChartData(data, 'd1');
    expect(res).toHaveProperty('labels');
    expect(res).toHaveProperty('datasets');
    for (let i = 0; i < res.labels.length - 1; i++) {
      const date1 = new Date(res.labels[i]);
      const date2 = new Date(res.labels[i + 1]);
      date1.setDate(date1.getDate() + 1);
      expect(date1).toEqual(date2);
      const found = dates.indexOf(res.labels[i]);
      if (found > -1) {
        expect(res.datasets[0].data[i]).toBe(values[found]);
      } else {
        expect(res.datasets[0].data[i]).toBe(0);
      }
    }
  });
});

describe('formatChartData', () => {
  test('formatChartData one parameter', () => {
    const d1 = faker.date
      .between('2021-12-17T12:00:00.000Z', '2021-12-17T17:00:00.000Z')
      .toISOString();
    const d2 = faker.date
      .between('2021-12-17T18:00:00.000Z', '2021-12-17T23:00:00.000Z')
      .toISOString();
    const d3 = faker.date
      .between('2021-12-18T00:00:00.000Z', '2021-12-18T12:00:00.000Z')
      .toISOString();
    const randomData = [d1, d2, d1, d1, d1, d1, d1, d1, d2, d1, d1, d3];
    const res = formatChartData(randomData);
    // console.log('%o', res);

    for (const [timeframe, data] of Object.entries(res)) {
      switch (timeframe as TimeFrame) {
        case 'm5': {
          const d1count = randomData.filter(
            (d) => dateRange5min(d) === dateRange5min(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange5min(d) === dateRange5min(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange5min(d) === dateRange5min(d3)
          ).length;
          const dates = [
            dateRange5min(d1),
            dateRange5min(d2),
            dateRange5min(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 5);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'm15': {
          const d1count = randomData.filter(
            (d) => dateRange15min(d) === dateRange15min(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange15min(d) === dateRange15min(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange15min(d) === dateRange15min(d3)
          ).length;
          const dates = [
            dateRange15min(d1),
            dateRange15min(d2),
            dateRange15min(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 15);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'm30': {
          const d1count = randomData.filter(
            (d) => dateRange30min(d) === dateRange30min(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange30min(d) === dateRange30min(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange30min(d) === dateRange30min(d3)
          ).length;
          const dates = [
            dateRange30min(d1),
            dateRange30min(d2),
            dateRange30min(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 30);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'h1': {
          const d1count = randomData.filter(
            (d) => dateRange1hour(d) === dateRange1hour(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange1hour(d) === dateRange1hour(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange1hour(d) === dateRange1hour(d3)
          ).length;
          const dates = [
            dateRange1hour(d1),
            dateRange1hour(d2),
            dateRange1hour(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setHours(date1.getHours() + 1);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'h4': {
          const d1count = randomData.filter(
            (d) => dateRange4hour(d) === dateRange4hour(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange4hour(d) === dateRange4hour(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange4hour(d) === dateRange4hour(d3)
          ).length;
          const dates = [
            dateRange4hour(d1),
            dateRange4hour(d2),
            dateRange4hour(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setHours(date1.getHours() + 4);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);

            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }

          break;
        }
        case 'd1': {
          const d1count = randomData.filter(
            (d) => dateRange1Day(d) === dateRange1Day(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange1Day(d) === dateRange1Day(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange1Day(d) === dateRange1Day(d3)
          ).length;
          const dates = [
            dateRange1Day(d1),
            dateRange1Day(d2),
            dateRange1Day(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setDate(date1.getDate() + 1);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);

            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
      }
    }
  });

  test('formatChartData two parameter', () => {
    const d1 = faker.date
      .between('2021-12-17T12:00:00.000Z', '2021-12-17T17:00:00.000Z')
      .toISOString();
    const d2 = faker.date
      .between('2021-12-17T18:00:00.000Z', '2021-12-17T23:00:00.000Z')
      .toISOString();
    const d3 = faker.date
      .between('2021-12-18T00:00:00.000Z', '2021-12-18T12:00:00.000Z')
      .toISOString();
    const randomData = [d1, d2, d1, d1, d1, d1, d1, d1, d2, d1, d1, d3];
    const oldDataLasDate = faker.date
      .between('2021-12-18T13:00:00.000Z', '2021-12-18T23:00:00.000Z')
      .toISOString();
    const res = formatChartData(randomData, {
      m5: String(dateRange5min(oldDataLasDate)),
      m15: String(dateRange15min(oldDataLasDate)),
      m30: String(dateRange30min(oldDataLasDate)),
      h1: String(dateRange1hour(oldDataLasDate)),
      h4: String(dateRange4hour(oldDataLasDate)),
      d1: String(dateRange1Day(oldDataLasDate)),
    });
    //console.log(res);

    for (const [timeframe, data] of Object.entries(res)) {
      switch (timeframe as TimeFrame) {
        case 'm5': {
          const d1count = randomData.filter(
            (d) => dateRange5min(d) === dateRange5min(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange5min(d) === dateRange5min(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange5min(d) === dateRange5min(d3)
          ).length;
          const dates = [
            dateRange5min(d1),
            dateRange5min(d2),
            dateRange5min(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 5);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'm15': {
          const d1count = randomData.filter(
            (d) => dateRange15min(d) === dateRange15min(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange15min(d) === dateRange15min(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange15min(d) === dateRange15min(d3)
          ).length;
          const dates = [
            dateRange15min(d1),
            dateRange15min(d2),
            dateRange15min(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 15);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'm30': {
          const d1count = randomData.filter(
            (d) => dateRange30min(d) === dateRange30min(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange30min(d) === dateRange30min(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange30min(d) === dateRange30min(d3)
          ).length;
          const dates = [
            dateRange30min(d1),
            dateRange30min(d2),
            dateRange30min(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 30);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'h1': {
          const d1count = randomData.filter(
            (d) => dateRange1hour(d) === dateRange1hour(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange1hour(d) === dateRange1hour(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange1hour(d) === dateRange1hour(d3)
          ).length;
          const dates = [
            dateRange1hour(d1),
            dateRange1hour(d2),
            dateRange1hour(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setHours(date1.getHours() + 1);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);
            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
        case 'h4': {
          const d1count = randomData.filter(
            (d) => dateRange4hour(d) === dateRange4hour(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange4hour(d) === dateRange4hour(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange4hour(d) === dateRange4hour(d3)
          ).length;
          const dates = [
            dateRange4hour(d1),
            dateRange4hour(d2),
            dateRange4hour(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setHours(date1.getHours() + 4);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);

            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }

          break;
        }
        case 'd1': {
          const d1count = randomData.filter(
            (d) => dateRange1Day(d) === dateRange1Day(d1)
          ).length;
          const d2count = randomData.filter(
            (d) => dateRange1Day(d) === dateRange1Day(d2)
          ).length;
          const d3count = randomData.filter(
            (d) => dateRange1Day(d) === dateRange1Day(d3)
          ).length;
          const dates = [
            dateRange1Day(d1),
            dateRange1Day(d2),
            dateRange1Day(d3),
          ];
          const values = [d1count, d2count, d3count];
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setDate(date1.getDate() + 1);
            expect(date1).toEqual(date2);
            const found = dates.indexOf(data.labels[i]);

            if (found > -1) {
              expect(data.datasets[0].data[i]).toBe(values[found]);
            } else {
              expect(data.datasets[0].data[i]).toBe(0);
            }
          }
          break;
        }
      }
    }
  });
});

describe('combineChartData', () => {
  test('it combines old data with new data', () => {
    const startDate = new Date('2021-12-18T13:00:00.000Z');
    const endDate = new Date('2021-12-18T15:00:00.000Z');
    const m5labels: Array<string> = [];
    const d5 = startDate;
    while (d5.getTime() < endDate.getTime()) {
      m5labels.push(d5.toLocaleString());
      d5.setMinutes(d5.getMinutes() + 5);
    }
    const hashSet = new Set();
    const m15labels = m5labels.reduce((acc: Array<string>, curr) => {
      const d = dateRange15min(curr);
      if (d && !hashSet.has(d)) {
        hashSet.add(d);
        acc.push(d);
      }
      return acc;
    }, []);
    hashSet.clear();
    const m30labels = m5labels.reduce((acc: Array<string>, curr) => {
      const d = dateRange30min(curr);
      if (d && !hashSet.has(d)) {
        hashSet.add(d);
        acc.push(d);
      }
      return acc;
    }, []);
    hashSet.clear();
    const h1labels = m5labels.reduce((acc: Array<string>, curr) => {
      const d = dateRange1hour(curr);
      if (d && !hashSet.has(d)) {
        hashSet.add(d);
        acc.push(d);
      }
      return acc;
    }, []);
    hashSet.clear();
    const h4labels = m5labels.reduce((acc: Array<string>, curr) => {
      const d = dateRange4hour(curr);
      if (d && !hashSet.has(d)) {
        hashSet.add(d);
        acc.push(d);
      }
      return acc;
    }, []);
    hashSet.clear();
    const d1labels = m5labels.reduce((acc: Array<string>, curr) => {
      const d = dateRange1Day(curr);
      if (d && !hashSet.has(d)) {
        hashSet.add(d);
        acc.push(d);
      }
      return acc;
    }, []);
    const oldData: Record<TimeFrame, ChartDataLine> = {
      m5: {
        labels: m5labels,
        datasets: [
          {
            data: m5labels.map((_, i) => i + 1),
          },
        ],
      },
      m15: {
        labels: m15labels,
        datasets: [
          {
            data: m15labels.map((_, i) => (i + 1) * 3),
          },
        ],
      },
      m30: {
        labels: m30labels,
        datasets: [
          {
            data: m30labels.map((_, i) => (i + 1) * 6),
          },
        ],
      },
      h1: {
        labels: h1labels,
        datasets: [
          {
            data: h1labels.map((_, i) => (i + 1) * 12),
          },
        ],
      },
      h4: {
        labels: h4labels,
        datasets: [
          {
            data: h4labels.map((_, i) => (i + 1) * 12 * 4),
          },
        ],
      },
      d1: {
        labels: d1labels,
        datasets: [
          {
            data: d1labels.map((_, i) => (i + 1) * 12 * 24),
          },
        ],
      },
    };
    // console.log('%o', oldData);
    const newDataEndDate = new Date(m5labels[0]);
    newDataEndDate.setHours(newDataEndDate.getHours() - 2);
    const newDataStartDate = new Date(newDataEndDate);
    newDataStartDate.setHours(newDataStartDate.getHours() - 4);

    const newData = Array(50)
      .fill(0)
      .map(() =>
        faker.date.between(newDataStartDate, newDataEndDate).toISOString()
      );

    newData.push(m5labels[0]);
    newData.push(m15labels[0]);
    newData.push(m30labels[0]);
    newData.push(h1labels[0]);
    newData.push(h4labels[0]);
    newData.push(d1labels[0]);

    const res = combineChartData(oldData, newData);
    // console.log('%o', res);
    // console.log({ newDataEndDate });
    for (const [timeframe, data] of Object.entries(res)) {
      switch (timeframe as TimeFrame) {
        case 'm5': {
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 5);
            expect(date1).toEqual(date2);
            if (data.labels[i] === m5labels[0]) {
              console.log('found m5label');
              expect(data.datasets[0].data[i]).toBeGreaterThanOrEqual(2);
            }
          }
          break;
        }
        case 'm15': {
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 15);
            expect(date1).toEqual(date2);
            if (data.labels[i] === m15labels[0]) {
              console.log('found m15label');
              expect(data.datasets[0].data[i]).toBeGreaterThanOrEqual(2);
            }
          }
          break;
        }
        case 'm30': {
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setMinutes(date1.getMinutes() + 30);
            expect(date1).toEqual(date2);
            if (data.labels[i] === m30labels[0]) {
              console.log('found m30label');
              expect(data.datasets[0].data[i]).toBeGreaterThanOrEqual(2);
            }
          }
          break;
        }
        case 'h1': {
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setHours(date1.getHours() + 1);
            expect(date1).toEqual(date2);
            if (data.labels[i] === h1labels[0]) {
              console.log('found h1label');
              expect(data.datasets[0].data[i]).toBeGreaterThanOrEqual(2);
            }
          }
          break;
        }
        case 'h4': {
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setHours(date1.getHours() + 4);
            expect(date1).toEqual(date2);
            if (data.labels[i] === h4labels[0]) {
              console.log('found h4label');
              expect(data.datasets[0].data[i]).toBeGreaterThanOrEqual(2);
            }
          }
          break;
        }
        case 'd1': {
          for (let i = 0; i < data.labels.length - 1; i++) {
            const date1 = new Date(data.labels[i]);
            const date2 = new Date(data.labels[i + 1]);
            date1.setDate(date1.getDate() + 1);
            expect(date1).toEqual(date2);
            if (data.labels[i] === d1labels[0]) {
              console.log('found d1label');
              expect(data.datasets[0].data[i]).toBeGreaterThanOrEqual(2);
            }
          }
          break;
        }
      }
    }

    // expect(combineChartData(oldData, newData)).toEqual(expected);
  });
});
