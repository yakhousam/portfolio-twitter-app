import { AppDataProvider } from '@yak-twitter-app/context/use-app-data';
import { ThemeProvider } from '@yak-twitter-app/context/use-theme';
import { Dashboard } from '@yak-twitter-app/web/ui/pages/dashboard';

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
