import * as React from 'react';
import { ErrorMessage } from '@yak-twitter-app/web-ui-components-error-message';

export interface WebUiErrorBoundariesProps {
  children: React.ReactNode;
}
export interface myState {
  hasError: boolean;
}

export class WebUiErrorBoundaries extends React.Component<
  WebUiErrorBoundariesProps,
  myState
> {
  override state: myState = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  override componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorMessage error="Something went wrong" />;
    }

    return this.props.children;
  }
}

export default WebUiErrorBoundaries;
