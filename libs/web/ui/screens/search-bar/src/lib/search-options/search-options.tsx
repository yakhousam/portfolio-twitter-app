import {
  formatDateYYYMMDD,
  getDefaultEndDate,
  getDefaultStartDate,
  isDateValid,
} from '@yak-twitter-app/shared-lib';
import { InputDate } from '@yak-twitter-app/web/ui/components';
import React, { useState } from 'react';
import styles from './search-options.module.css';

const defaultStartDate = getDefaultStartDate();
const defaultEndDate = getDefaultEndDate();

export function SearchOptions() {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!isDateValid(value)) {
      return;
    }
    if (new Date(value).getTime() < new Date(defaultStartDate).getTime()) {
      return setStartDate(defaultStartDate);
    }
    if (new Date(value).getTime() > new Date(defaultEndDate).getTime()) {
      const d = new Date(defaultEndDate);
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

    if (new Date(value).getTime() < new Date(defaultStartDate).getTime()) {
      const d = new Date(defaultStartDate);
      d.setDate(d.getDate() + 1);
      return setEndDate(formatDateYYYMMDD(d));
    }
    if (new Date(value).getTime() > new Date(defaultEndDate).getTime()) {
      return setEndDate(defaultEndDate);
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
        min={defaultStartDate}
        max={formatDateYYYMMDD(maxStartDate)}
      />
      <InputDate
        label="end date"
        value={endDate}
        onChange={handleChangeEndDate}
        name="endDate"
        min={formatDateYYYMMDD(minEndDate)}
        max={defaultEndDate}
      />
    </div>
  );
}
