import { AppDataProvider } from '@yak-twitter-app/context/use-app-data';
import { ThemeProvider } from '@yak-twitter-app/context/use-theme';
import { ErrorBoundaries } from '@yak-twitter-app/web/ui/error-boundaries';
import { Dashboard } from '@yak-twitter-app/web/ui/pages/dashboard';

export function App() {
  return (
    <ThemeProvider>
      <ErrorBoundaries>
        <AppDataProvider>
          <Dashboard />
        </AppDataProvider>
      </ErrorBoundaries>
    </ThemeProvider>
  );
}

export default App;
