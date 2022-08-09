import {
  formatDateYYYMMDD,
  getDefaultEndDate,
  getDefaultStartDate,
  isDateValid,
  SearchForm,
  useSearchHashtag,
} from '@yak-twitter-app/shared-lib';
import { useReducer } from 'react';
import { MdSearch } from 'react-icons/md';
import BtnSearch from '../../components/btn-search/btn-search';
import InputDate from '../../components/input-date/input-date';

import InputSearch from '../../components/input-search/input-search';
import { useAppData } from '../../context/use-app-data/use-app-data';

import styles from './search-bar.module.css';

type Action =
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

function reducer(state: SearchForm, action: Action): SearchForm {
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

export function SearchBar() {
  const [{ hashtag, startDate, endDate, errors }, formDispatch] = useReducer(
    reducer,
    intialState
  );
  const { isLoading, error, cancelSearch, searchHashtag } = useSearchHashtag();

  const { dispatch: appDataDispatch } = useAppData();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!hashtag) {
      return formDispatch({ type: 'set_hashtag_error' });
    }
    if (isLoading) {
      return cancelSearch();
    }
    if (error) {
      // TODO: Dispatch error global state
      return console.error(error);
    }
    const reader = await searchHashtag({ hashtag, startDate, endDate });
    let chunks = '';
    // TODO: handle parsing possible errors
    while (reader) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const chunk = new TextDecoder().decode(value);
      if (chunk.endsWith('}]}')) {
        appDataDispatch({
          type: 'update_data',
          data: await JSON.parse(chunks + chunk),
        });
        chunks = '';
      } else {
        chunks += chunk;
      }
    }
  };

  const maxStartDate = new Date(endDate);
  maxStartDate.setDate(maxStartDate.getDate() - 1);
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 1);

  return (
    <form className={styles['container']} onSubmit={onSubmit}>
      <div className={styles['wrapper-search']}>
        <InputSearch
          value={hashtag}
          error={errors.hashtag}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formDispatch({ type: 'set_hashtag', value: e.target.value })
          }
        />
        <BtnSearch>
          {isLoading ? 'CANCEL' : <MdSearch className={styles['icon']} />}
        </BtnSearch>
      </div>
      <div className={styles['wrapper-options']}>
        <InputDate
          label="start date"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formDispatch({
              type: 'set_startDate',
              value: e.currentTarget.value,
            })
          }
          name="startDate"
          min={getDefaultStartDate()}
          max={formatDateYYYMMDD(maxStartDate)}
        />
        <InputDate
          label="end date"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formDispatch({ type: 'set_endDate', value: e.currentTarget.value })
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
