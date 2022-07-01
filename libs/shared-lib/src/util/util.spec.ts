import { fillEmptyDate } from './util';
import { faker } from '@faker-js/faker';
import {
  dateRange15min,
  dateRange1Day,
  dateRange1hour,
  dateRange30min,
  dateRange4hour,
  dateRange5min,
} from '../helpers/date-helpers';

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
