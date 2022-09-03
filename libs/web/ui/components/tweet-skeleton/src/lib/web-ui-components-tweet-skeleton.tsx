import styles from './web-ui-components-tweet-skeleton.module.css';

/* eslint-disable-next-line */
export interface WebUiComponentsTweetSkeletonProps {}

export function WebUiComponentsTweetSkeleton(
  props: WebUiComponentsTweetSkeletonProps
) {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['avatar']}></div>
        <div className={styles['wrapper-p']}>
          <div className={styles['paragraph']}></div>
          <div className={styles['paragraph']}></div>
        </div>
      </div>
      <div className={styles['body']}>
        <div className={styles['paragraph']}></div>
        <div className={styles['paragraph']}></div>
        <div className={styles['media']}></div>
        <div className={styles['paragraph']}></div>
        <div className={styles['paragraph']}></div>
        <div className={styles['button']}></div>
      </div>
    </div>
  );
}

export default WebUiComponentsTweetSkeleton;
