import {
  formatDateYYYMMDD,
  getMinumStartDate,
  isDateValid,
} from '@yak-twitter-app/utility/date';
import { InputDate } from '@yak-twitter-app/web-ui-components-input-date';
import React, { useState } from 'react';
import styles from './search-options.module.css';

export function SearchOptions() {
  const minumStartDate = getMinumStartDate();

  const [startDate, setStartDate] = useState(minumStartDate);
  const [endDate, setEndDate] = useState(formatDateYYYMMDD(new Date()));

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!isDateValid(value)) {
      return;
    }
    if (new Date(value).getTime() < new Date(minumStartDate).getTime()) {
      return setStartDate(minumStartDate);
    }
    if (new Date(value).getTime() > new Date(endDate).getTime()) {
      const d = new Date(endDate);
      d.setDate(d.getDate() - 1);
      return setStartDate(formatDateYYYMMDD(d));
    }
    return setStartDate(value);
  };

  const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!isDateValid(value)) {
      return;
    }

    if (new Date(value).getTime() < new Date(startDate).getTime()) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + 1);
      return setEndDate(formatDateYYYMMDD(d));
    }
    if (new Date(value).getTime() > new Date().getTime()) {
      return setEndDate(formatDateYYYMMDD(new Date()));
    }
    return setEndDate(value);
  };

  const maxStartDate = new Date(endDate);
  maxStartDate.setDate(maxStartDate.getDate() - 1);
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 1);

  return (
    <div className={styles['container']}>
      <InputDate
        label="start date"
        value={startDate}
        onChange={handleChangeStartDate}
        name="startDate"
        min={minumStartDate}
        max={formatDateYYYMMDD(maxStartDate)}
      />
      <InputDate
        label="end date"
        value={endDate}
        onChange={handleChangeEndDate}
        name="endDate"
        min={formatDateYYYMMDD(minEndDate)}
        max={formatDateYYYMMDD(new Date())}
      />
    </div>
  );
}
