import { Dispatch } from 'react';
import { ActionType } from '../hooks';
import { SearchForm, SearchHashtagReturnData } from '../interfaces';

export async function searchHashtag(data: SearchForm, signal: AbortSignal) {
  try {
    const { hashtag, endDate, startDate } = data;
    const today = new Date();
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);
    startTime.setHours(today.getHours());
    startTime.setMinutes(today.getMinutes());
    startTime.setSeconds(today.getSeconds());
    endTime.setHours(today.getHours());
    endTime.setMinutes(today.getMinutes());
    endTime.setSeconds(today.getSeconds() - 30);
    const response = await fetch(
      `api/search/${hashtag}?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`,
      { signal }
    );
    const reader = response?.body?.getReader();
    return reader;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getData(
  data: SearchForm,
  dispatch: Dispatch<ActionType>,
  signal: AbortSignal
) {
  try {
    dispatch({ type: 'search_start' });
    const reader = await searchHashtag(data, signal);
    let strResponse = '';
    let response:
      | SearchHashtagReturnData
      | { status: number; errors: string }
      | null = null;
    while (reader) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      // console.log({ value });
      const tweets = new TextDecoder().decode(value);
      // console.log({ tweets });
      //TODO: find better way to write this code
      if (tweets.endsWith('}]}') && strResponse === '') {
        response = JSON.parse(tweets);
      } else {
        strResponse += tweets;
        if (strResponse.endsWith('}]}')) {
          response = JSON.parse(strResponse);
          strResponse = '';
        }
      }
      if (response !== null) {
        // console.log('response', response);
        if (
          ('status' in response && response.status >= 300) ||
          ('errors' in response && response.errors)
        ) {
          dispatch({ type: 'search_error', error: 'streaming data error' });

          console.log('something went wrong');
          console.log('received value=', response);
        } else if ('original' in response) {
          dispatch({ type: 'update_data', data: response });
        }
        response = null;
      }
    }
    console.log('Response fully received');
    dispatch({ type: 'search_success' });
  } catch (error) {
    dispatch({ type: 'search_error', error: 'streaming data error' });
    console.error(error);
  }
}
