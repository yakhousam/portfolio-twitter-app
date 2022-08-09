import {
  formatDateYYYMMDD,
  getDefaultEndDate,
  getDefaultStartDate,
  isDateValid,
  SearchForm,
} from '@yak-twitter-app/shared-lib';
import { useReducer } from 'react';
import { MdSearch } from 'react-icons/md';
import BtnSearch from '../../components/btn-search/btn-search';
import InputDate from '../../components/input-date/input-date';

import InputSearch from '../../components/input-search/input-search';

import styles from './search-bar.module.css';

export type ActionType =
  | { type: 'set_hashtag'; value: string }
  | { type: 'set_hashtag_error' }
  | { type: 'set_startDate'; value: string }
  | { type: 'set_endDate'; value: string };

const intialState: SearchForm = {
  hashtag: '',
  startDate: getDefaultStartDate(),
  endDate: getDefaultEndDate(),
  errors: {
    hashtag: false,
  },
};

function reducer(state: SearchForm, action: ActionType): SearchForm {
  const { type } = action;
  const defaultStartDate = getDefaultStartDate();
  const defaultEndDate = getDefaultEndDate();
  switch (type) {
    case 'set_hashtag': {
      return {
        ...state,
        hashtag: action.value,
        errors: { ...state.errors, hashtag: false },
      };
    }
    case 'set_startDate': {
      if (!isDateValid(action.value)) {
        return { ...state };
      }
      if (
        new Date(action.value).getTime() < new Date(defaultStartDate).getTime()
      ) {
        return { ...state, startDate: defaultStartDate };
      }
      if (
        new Date(action.value).getTime() > new Date(defaultEndDate).getTime()
      ) {
        const d = new Date(defaultEndDate);
        d.setDate(d.getDate() - 1);
        return { ...state, startDate: formatDateYYYMMDD(d) };
      }
      return { ...state, startDate: action.value };
    }
    case 'set_endDate': {
      if (!isDateValid(action.value)) {
        return { ...state };
      }
      if (
        new Date(action.value).getTime() < new Date(defaultStartDate).getTime()
      ) {
        const d = new Date(defaultStartDate);
        d.setDate(d.getDate() + 1);
        return { ...state, endDate: formatDateYYYMMDD(d) };
      }
      if (
        new Date(action.value).getTime() > new Date(defaultEndDate).getTime()
      ) {
        return { ...state, endDate: defaultEndDate };
      }
      return { ...state, endDate: action.value };
    }
    case 'set_hashtag_error': {
      return { ...state, errors: { ...state.errors, hashtag: true } };
    }
    default:
      throw new Error(`action type "${type}" doesn't exist`);
  }
}

export interface SearchBarProps {
  onSubmit: (data: Omit<SearchForm, 'errors'>) => void;
  isFetching: boolean;
}

export function SearchBar({ isFetching, onSubmit }: SearchBarProps) {
  const [{ hashtag, startDate, endDate, errors }, dispatch] = useReducer(
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
        if (!hashtag) {
          return dispatch({ type: 'set_hashtag_error' });
        }
        onSubmit({ hashtag, startDate, endDate });
      }}
    >
      <div className={styles['wrapper-search']}>
        <InputSearch
          value={hashtag}
          error={errors.hashtag}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: 'set_startDate', value: e.currentTarget.value })
          }
          name="startDate"
          min={getDefaultStartDate()}
          max={formatDateYYYMMDD(maxStartDate)}
        />
        <InputDate
          label="end date"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: 'set_endDate', value: e.currentTarget.value })
          }
          name="endDate"
          min={formatDateYYYMMDD(minEndDate)}
          max={getDefaultEndDate()}
        />
      </div>
    </form>
  );
}

export default SearchBar;
