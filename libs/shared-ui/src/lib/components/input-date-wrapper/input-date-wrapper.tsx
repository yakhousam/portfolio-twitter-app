import {
  getDefaultEndDate,
  getDefaultStartDate,
  formatDateYYYMMDD,
} from '@yak-twitter-app/shared-lib';
import { ChangeEvent } from 'react';
import { ActionType } from '../../screens/search-bar/search-bar';
import InputDate from '../input-date/input-date';

interface InputDateWrapperPops {
  startDate: string;
  endDate: string;
  dispatch: React.Dispatch<ActionType>;
}

export function InputDateWrapper({
  startDate,
  endDate,
  dispatch,
}: InputDateWrapperPops) {
  const maxStartDate = new Date(endDate);
  maxStartDate.setDate(maxStartDate.getDate() - 1);
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 1);
  return (
    <>
      <InputDate
        label="start date"
        value={startDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: 'set_startDate', value: e.target.value })
        }
        {...{
          name: 'startDate',
          min: getDefaultStartDate(),
          max: formatDateYYYMMDD(maxStartDate),
        }}
      />
      <InputDate
        label="end date"
        value={endDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: 'set_endDate', value: e.target.value })
        }
        {...{
          name: 'endDate',
          min: formatDateYYYMMDD(minEndDate),
          max: getDefaultEndDate(),
        }}
      />
    </>
  );
}

export default InputDateWrapper;
