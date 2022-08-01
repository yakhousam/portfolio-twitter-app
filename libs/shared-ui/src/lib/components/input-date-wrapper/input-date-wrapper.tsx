import {
  getDefaultEndDate,
  getDefaultStartDate,
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
  return (
    <>
      <InputDate
        label="start date"
        value={startDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: 'set_startDate', value: e.target.value })
        }
        {...{ name: 'startDate', min: getDefaultStartDate(), max: endDate }}
      />
      <InputDate
        label="end date"
        value={endDate}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: 'set_endDate', value: e.target.value })
        }
        {...{ name: 'endDate', min: startDate, max: getDefaultEndDate() }}
      />
    </>
  );
}

export default InputDateWrapper;
