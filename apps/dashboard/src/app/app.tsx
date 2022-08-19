import { AppDataProvider, ThemeProvider } from '@yak-twitter-app/context';
import { Dashboard } from '@yak-twitter-app/shared-ui';

export function App() {
  return (
    <ThemeProvider>
      <AppDataProvider>
        <Dashboard />
      </AppDataProvider>
    </ThemeProvider>
  );
}

export default App;
