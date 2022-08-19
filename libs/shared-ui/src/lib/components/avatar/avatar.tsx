import { MdOutlineAccountCircle } from 'react-icons/md';
import styles from './avatar.module.css';

export interface AvatarProps {
  src?: string;
}

export function Avatar({ src }: AvatarProps) {
  return (
    <div className={styles['container']}>
      {src ? (
        <img src={src} alt="user avatar" />
      ) : (
        <MdOutlineAccountCircle className={styles['icon']} />
      )}
    </div>
  );
}

export default Avatar;
