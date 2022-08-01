import {
  getDefaultEndDate,
  getDefaultStartDate,
  isDateValid,
} from '@yak-twitter-app/shared-lib';
import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  useReducer,
  useState,
} from 'react';
import { MdSearch } from 'react-icons/md';
import BtnSearch from '../../components/btn-search/btn-search';
import InputDateWrapper from '../../components/input-date-wrapper/input-date-wrapper';

import InputSearch from '../../components/input-search/input-search';

import styles from './search-bar.module.css';

const intialState = {
  hashtag: 'node',
  startDate: getDefaultStartDate(),
  endDate: getDefaultEndDate(),
};

export interface SearchBarProps {
  handleSearch: (hashtag: string) => void;
  handleCancle: () => void;
  isFetching: boolean;
}
export type ActionType =
  | { type: 'set_hashtag'; value: string }
  | { type: 'set_startDate'; value: string }
  | { type: 'set_endDate'; value: string };

type InitialState = typeof intialState;

function reducer(state: InitialState, action: ActionType): InitialState {
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
      throw new Error(`action type "${type}" does't exist`);
  }
}

export const SearchBar = memo(
  function SearchBar({
    handleCancle,
    handleSearch,
    isFetching,
  }: SearchBarProps) {
    const [{ hashtag, startDate, endDate }, dispatch] = useReducer(
      reducer,
      intialState
    );

    return (
      <div className={styles['container']}>
        <div className={styles['wrapper-search']}>
          <InputSearch
            name="hashtag"
            value={hashtag}
            handleChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: 'set_hashtag', value: e.target.value })
            }
          />
          <div className={styles['btn-search-mobile']}>
            <BtnSearch
              size="small"
              handleClick={
                isFetching ? handleCancle : () => handleSearch(hashtag)
              }
            >
              {isFetching ? 'CANCEL' : <MdSearch className={styles['icon']} />}
            </BtnSearch>
          </div>
        </div>
        <div className={styles['wrapper-options']}>
          <InputDateWrapper
            startDate={startDate}
            endDate={endDate}
            dispatch={dispatch}
          />

          <div className={styles['btn-search-desktop']}>
            <BtnSearch
              size="large"
              handleClick={
                isFetching ? handleCancle : () => handleSearch(hashtag)
              }
            >
              {isFetching ? 'CANCEL' : <MdSearch className={styles['icon']} />}
            </BtnSearch>
          </div>
        </div>
      </div>
    );
  },
  (prevprops, nextprops) => prevprops.isFetching === nextprops.isFetching
);

export default SearchBar;
