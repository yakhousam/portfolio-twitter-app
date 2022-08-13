import {
  AppDataProvider,
  Dashboard,
  ThemeProvider,
} from '@yak-twitter-app/shared-ui';

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
