import styles from './info-message.module.css';

export interface InfoMessageProps {
  title: string;
  message: string;
}

export function InfoMessage({ title, message }: InfoMessageProps) {
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['message']}>{message}</p>
    </div>
  );
}

export default InfoMessage;
