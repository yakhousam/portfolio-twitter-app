import { act, renderHook } from '@testing-library/react';

import { useTheme } from './use-theme';

describe('useTheme', () => {
  test('it sets the default thme to "light" ', () => {
    const { result } = renderHook(useTheme);
    const [theme] = result.current;
    expect(theme).toBe('light');
    expect(document.body.dataset['theme']).toBe('light');
  });
  test("it set the theme to dark when we passe parameter 'dark'", () => {
    const { result } = renderHook(useTheme, { initialProps: 'dark' });
    const [theme] = result.current;
    expect(theme).toBe('dark');
    expect(document.body.dataset['theme']).toBe('dark');
  });
  test("it set the theme to light when we passe parameter 'light'", () => {
    const { result } = renderHook(useTheme, { initialProps: 'light' });
    const [theme] = result.current;
    expect(theme).toBe('light');
    expect(document.body.dataset['theme']).toBe('light');
  });
  test('it change the theme when we call setTheme', () => {
    const { result } = renderHook(useTheme, { initialProps: 'light' });
    const [theme, setTheme] = result.current;
    expect(theme).toBe('light');

    act(() => setTheme('dark'));
    expect(result.current[0]).toBe('dark');
    expect(document.body.dataset['theme']).toBe('dark');

    act(() => setTheme('light'));
    expect(result.current[0]).toBe('light');
    expect(document.body.dataset['theme']).toBe('light');
  });
});
