import { combineChartData, fillEmptyDate, getMostEngagedTweets } from './util';
import { faker } from '@faker-js/faker';
import {
  dateRange15min,
  dateRange1Day,
  dateRange1hour,
  dateRange30min,
  dateRange4hour,
  dateRange5min,
} from '../helpers/date-helpers';
import { Data } from '../interfaces';

describe('fillEmptyData', () => {
  test('should fill between empty date, m5', () => {
    const startDate = new Date('12/28/2021').toISOString();
    const endDate = new Date('01/02/2022').toISOString();
    const uniqueDates = new Set();
    const data = Array(100)
      .fill('')
      .map(() => {
        let d = dateRange5min(
          faker.date.between(startDate, endDate).toISOString()
        );
        while (!d || uniqueDates.has(d)) {
          d = d = dateRange5min(
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

    fillEmptyDate(data, 'm5');
    for (let i = 0; i < data.length - 1; i++) {
      const date1 = new Date(data[i]['x']);
      const date2 = new Date(data[i + 1]['x']);
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
    fillEmptyDate(data, 'm15');
    for (let i = 0; i < data.length - 1; i++) {
      const date1 = new Date(data[i]['x']);
      const date2 = new Date(data[i + 1]['x']);
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
    fillEmptyDate(data, 'm30');
    for (let i = 0; i < data.length - 1; i++) {
      const date1 = new Date(data[i]['x']);
      const date2 = new Date(data[i + 1]['x']);
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
    fillEmptyDate(data, 'h1');
    for (let i = 0; i < data.length - 1; i++) {
      const date1 = new Date(data[i]['x']);
      const date2 = new Date(data[i + 1]['x']);
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
    fillEmptyDate(data, 'h4');
    for (let i = 0; i < data.length - 1; i++) {
      const date1 = new Date(data[i]['x']);
      const date2 = new Date(data[i + 1]['x']);
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
    fillEmptyDate(data, 'd1');
    for (let i = 0; i < data.length - 1; i++) {
      const date1 = new Date(data[i]['x']);
      const date2 = new Date(data[i + 1]['x']);
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

describe('combineChartData', () => {
  test('it combines old data with new data', () => {
    const oldData: Array<Data> = [
      { x: '1', y: 5 },
      { x: '2', y: 5 },
      { x: '3', y: 5 },
      { x: '4', y: 5 },
    ];
    const newData: Array<Data> = [
      { x: '7', y: 5 },
      { x: '4', y: 5 },
      { x: '6', y: 5 },
      { x: '5', y: 5 },
    ];
    const expected: Array<Data> = [
      { x: '1', y: 5 },
      { x: '2', y: 5 },
      { x: '3', y: 5 },
      { x: '4', y: 10 },
      { x: '5', y: 5 },
      { x: '6', y: 5 },
      { x: '7', y: 5 },
    ];
    expect(combineChartData(oldData, newData)).toEqual(expected);
  });
});
