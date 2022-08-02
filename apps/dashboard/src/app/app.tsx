import { SearchForm, useAppState } from '@yak-twitter-app/shared-lib';
import { Dashboard } from '@yak-twitter-app/shared-ui';

export function App() {
  const { cancelSearch, searchHashtag, state, dispatch } = useAppState();

  const { status } = state;
  const isFetching = status === 'pending' || status === 'receiving';

  // console.log(data.rankedAccounts.map(({ id }) => id));

  const onSubmit = (data: SearchForm) => {
    isFetching ? cancelSearch() : searchHashtag(data);
  };

  return <Dashboard onSubmit={onSubmit} state={state} dispatch={dispatch} />;
}

export default App;
