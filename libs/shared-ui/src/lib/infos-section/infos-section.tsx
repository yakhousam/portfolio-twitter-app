import Info, { InfoProps } from '../info/info';
import styles from './infos-section.module.css';

export interface InfoSectionProps {
  title: string;
  infos: InfoProps[];
}

export function InfoSection({ title, infos }: InfoSectionProps) {
  return (
    <section className={styles['container']}>
      <h1 className={styles['h1']}>{title}</h1>
      <div className={styles['wrapper']}>
        {infos.map((data, i) => (
          <Info key={i} {...data} />
        ))}
      </div>
    </section>
  );
}

export default InfoSection;
