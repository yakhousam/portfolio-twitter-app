import {
  formatDateYYYMMDD,
  getDefaultEndDate,
  getDefaultStartDate,
  isDateValid,
  SearchForm,
} from '@yak-twitter-app/shared-lib';
import { ChangeEvent, memo, useReducer } from 'react';
import { MdSearch } from 'react-icons/md';
import BtnSearch from '../../components/btn-search/btn-search';
import InputDate from '../../components/input-date/input-date';

import InputSearch from '../../components/input-search/input-search';

import styles from './search-bar.module.css';

export type ActionType =
  | { type: 'set_hashtag'; value: string }
  | { type: 'set_startDate'; value: string }
  | { type: 'set_endDate'; value: string };

const intialState = {
  hashtag: 'node',
  startDate: getDefaultStartDate(),
  endDate: getDefaultEndDate(),
};

function reducer(state: SearchForm, action: ActionType): SearchForm {
  const { type, value } = action;
  const defaultStartDate = getDefaultStartDate();
  const defaultEndDate = getDefaultEndDate();
  switch (type) {
    case 'set_hashtag': {
      return { ...state, hashtag: value };
    }
    case 'set_startDate': {
      if (!isDateValid(value)) {
        return { ...state };
      }
      if (new Date(value).getTime() < new Date(defaultStartDate).getTime()) {
        return { ...state, startDate: defaultStartDate };
      }
      if (new Date(value).getTime() > new Date(defaultEndDate).getTime()) {
        return { ...state, startDate: defaultEndDate };
      }
      return { ...state, startDate: value };
    }
    case 'set_endDate': {
      if (!isDateValid(value)) {
        return { ...state };
      }
      if (new Date(value).getTime() < new Date(defaultStartDate).getTime()) {
        return { ...state, endDate: defaultStartDate };
      }
      if (new Date(value).getTime() > new Date(defaultEndDate).getTime()) {
        return { ...state, endDate: defaultEndDate };
      }
      return { ...state, endDate: value };
    }
    default:
      throw new Error(`action type "${type}" doesn't exist`);
  }
}

export interface SearchBarProps {
  onSubmit: (data: SearchForm) => void;
  isFetching: boolean;
}

export const SearchBar = memo(
  function SearchBar({ isFetching, onSubmit }: SearchBarProps) {
    const [{ hashtag, startDate, endDate }, dispatch] = useReducer(
      reducer,
      intialState
    );

    const maxStartDate = new Date(endDate);
    maxStartDate.setDate(maxStartDate.getDate() - 1);
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);

    return (
      <form
        className={styles['container']}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ hashtag, startDate, endDate });
        }}
      >
        <div className={styles['wrapper-search']}>
          <InputSearch
            name="hashtag"
            value={hashtag}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: 'set_hashtag', value: e.target.value })
            }
          />
          <BtnSearch>
            {isFetching ? 'CANCEL' : <MdSearch className={styles['icon']} />}
          </BtnSearch>
        </div>
        <div className={styles['wrapper-options']}>
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
        </div>
      </form>
    );
  },
  (prevprops, nextprops) => prevprops.isFetching === nextprops.isFetching
);

export default SearchBar;
