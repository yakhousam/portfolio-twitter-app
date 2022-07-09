import { useEffect, useState } from 'react';
import styles from './info.module.css';

export interface InfoProps {
  title: string;
  info: number;
}

export function Info({ title, info }: InfoProps) {
  const [cinfo, setCinfo] = useState(0);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (cinfo < info) {
          setCinfo((c) => c + 1);
        }
      },
      info - cinfo > 20 ? 10 : 100
    );
    return () => clearTimeout(timer);
  }, [cinfo, info]);
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['text']}>{cinfo}</p>
    </div>
  );
}

export default Info;
