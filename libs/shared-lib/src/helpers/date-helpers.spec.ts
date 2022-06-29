import {
  dateRange30min,
  dateRange1hour,
  dateRange1Day,
  dateRange15min,
  dateRange5min,
  dateRange4hour,
} from './date-helpers';

describe('helpers', () => {
  describe('dateRange5min', () => {
    // prettier-ignore
    const minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    // prettier-ignore
    const expected = ['00', '00', '00', '00', '00', '05', '05', '05', '05', '05', '10', '10', '10', '10', '10', '15', '15', '15', '15', '15', '20', '20', '20', '20', '20', '25', '25', '25', '25', '25', '30', '30', '30', '30', '30', '35', '35', '35', '35', '35', '40', '40', '40', '40', '40', '45', '45', '45', '45', '45', '50', '50', '50', '50', '50', '55', '55', '55', '55', '55']

    for (let i = 0, max = minutes.length; i < max; i += 1) {
      test(`dateRange5min should return ${expected[i]} when passed date minutes equal to ${minutes[i]}`, () => {
        const date = `2022-04-24T17:${minutes[i]}:42.000Z`;
        const expectedDate = `2022-04-24T17:${expected[i]}:00.000Z`;
        expect(dateRange5min(date)).toBe(expectedDate);
      });
    }
    test('dateRange5min should return null if invalide date', () => {
      const date = 'this is not a valide date';
      expect(dateRange5min(date)).toBeNull();
    });
  });
  describe('dateRange15min', () => {
    // prettier-ignore
    const minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    // prettier-ignore
    const expected = ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '15', '15', '15', '15', '15', '15', '15', '15', '15', '15', '15', '15', '15', '15', '15', '30', '30', '30', '30', '30', '30', '30', '30', '30', '30', '30', '30', '30', '30', '30', '45', '45', '45', '45', '45', '45', '45', '45', '45', '45', '45', '45', '45', '45', '45']
    for (let i = 0, max = minutes.length; i < max; i += 1) {
      test(`dateRange15min should return ${expected[i]} when passed date minutes equal to ${minutes[i]}`, () => {
        const date = `2022-04-24T17:${minutes[i]}:42.000Z`;
        const expectedDate = `2022-04-24T17:${expected[i]}:00.000Z`;
        expect(dateRange15min(date)).toBe(expectedDate);
      });
    }
    test('dateRange15min should return null if invalide date', () => {
      const date = 'this is not a valide date';
      expect(dateRange15min(date)).toBeNull();
    });
  });

  describe('dateRange30min', () => {
    // prettier-ignore
    const minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    // prettier-ignore
    const expected = ['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','30','30','30','30', '30','30','30','30','30', '30','30','30','30','30', '30','30','30','30','30', '30','30','30','30','30', '30','30','30','30','30', '30']
    for (let i = 0, max = minutes.length; i < max; i += 1) {
      test(`dateRange30min should return ${expected[i]} when passed date minutes equal to ${minutes[i]}`, () => {
        const date = `2022-04-24T17:${minutes[i]}:42.000Z`;
        const expectedDate = `2022-04-24T17:${expected[i]}:00.000Z`;
        expect(dateRange30min(date)).toBe(expectedDate);
      });
    }
    test('dateRange30min should return null if invalide date', () => {
      const date = 'this is not a valide date';
      expect(dateRange30min(date)).toBeNull();
    });
  });

  describe('dateRange1hour', () => {
    test('dateRange1hour should return date with all minute, seconds,  miliseconds set to 0 ', () => {
      let date = '2022-04-24T17:36:42.000Z';
      let expectedDate = '2022-04-24T17:00:00.000Z';
      expect(dateRange1hour(date)).toEqual(expectedDate);
      date = '2022-04-24T11:36:42.000Z';
      expectedDate = '2022-04-24T11:00:00.000Z';
      expect(dateRange1hour(date)).toEqual(expectedDate);
    });

    test('dateRange1hour should return null if invalide date', () => {
      const date = 'this is not a valide date';
      expect(dateRange1hour(date)).toBeNull();
    });
  });

  describe('dateRange4Hour', () => {
    // prettier-ignore
    const hours = ['00','01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
    // prettier-ignore
    const expected = ['00','00','00','00','04','04','04','04','08','08','08','08','12','12','12','12','16','16','16','16','20','20','20','20']
    for (let i = 0, max = hours.length; i < max; i += 1) {
      test(`dateRange4Hour should return ${expected[i]} when passed date hour equal to ${hours[i]}`, () => {
        const date = `2022-04-24T${hours[i]}:11:42.000Z`;
        const expectedDate = `2022-04-24T${expected[i]}:00:00.000Z`;
        expect(dateRange4hour(date)).toBe(expectedDate);
      });
    }
    test('dateRange4hour should return null if invalide date', () => {
      const date = 'this is not a valide date';
      expect(dateRange4hour(date)).toBeNull();
    });
  });

  describe('dateRange1Day', () => {
    test('dateRange1Day should return a date with all hour, minutes, seconds, milliseconds set to 0', () => {
      const date = '2022-04-24T17:36:42.000Z';
      const expectedDate = '2022-04-24T00:00:00.000Z';
      expect(dateRange1Day(date)).toEqual(expectedDate);
    });

    test('dateRange1Day should return null if date is invalide', () => {
      const date = 'this is not a valide date';
      expect(dateRange1Day(date)).toBeNull();
    });
  });
});
