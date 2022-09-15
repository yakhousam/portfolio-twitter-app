import res_01 from './res_01';
import res_02 from './res_02';
import res_03 from './res_03';
import res_04 from './res_04';
import res_05 from './res_05';

export const dumyData = {
  '0': res_01,
  [res_01.meta.next_token]: res_02,
  [res_02.meta.next_token]: res_03,
  [res_03.meta.next_token]: res_04,
  [res_04.meta.next_token]: res_05,
};

export const page = {
  '0': 1,
  [res_01.meta.next_token]: 2,
  [res_02.meta.next_token]: 3,
  [res_03.meta.next_token]: 4,
  [res_04.meta.next_token]: 5,
};
