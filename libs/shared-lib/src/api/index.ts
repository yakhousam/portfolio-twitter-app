import { Dispatch } from 'react';
import { ActionType } from '../hooks';

export async function searchHashtag(hashtag: string, signal: AbortSignal) {
  try {
    const response = await fetch('api/search/' + hashtag, { signal });
    const reader = response?.body?.getReader();

    return reader;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getData(
  hashtag: string,
  dispatch: Dispatch<ActionType>,
  signal: AbortSignal
) {
  try {
    dispatch({ type: 'search_start' });
    const reader = await searchHashtag(hashtag, signal);
    while (reader) {
      // eslint-disable-next-line no-await-in-loop
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      // console.log({ value });
      const tweets = new TextDecoder().decode(value);
      // console.log({ tweets });
      const response = JSON.parse(tweets);
      // console.log('response', response);
      if (response.status >= 300 || response.errors) {
        dispatch({ type: 'search_error', error: 'streaming data error' });

        console.log('something went wrong');
        console.log('received value=', JSON.parse(tweets));
      } else {
        dispatch({ type: 'update_data', data: JSON.parse(tweets) });
      }
    }
    console.log('Response fully received');
    dispatch({ type: 'search_success' });
  } catch (error) {
    dispatch({ type: 'search_error', error: 'streaming data error' });
    console.error(error);
  }
}
