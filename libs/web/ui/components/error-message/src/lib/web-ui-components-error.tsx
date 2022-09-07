import styles from './web-ui-components-error.module.css';

/* eslint-disable-next-line */
export interface WebUiComponentsErrorProps {
  error: Error | Record<string, unknown> | string;
}

export function WebUiComponentsError({ error }: WebUiComponentsErrorProps) {
  return (
    <div data-testid="error" className={styles['error']}>
      <h2>Error while streaming data!</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

export default WebUiComponentsError;
