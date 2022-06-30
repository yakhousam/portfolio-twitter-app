import styles from './info.module.css';

export interface InfoProps {
  title: string;
  text: string;
}

export function Info({ title, text }: InfoProps) {
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['text']}>{text}</p>
    </div>
  );
}

export default Info;
