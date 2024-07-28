import { Link } from "react-router-dom";
import styles from "./Leaderboard.module.css";

export function Leaderboard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Лидерборд</h1>
        <button className={styles.button}>
          <Link to="/">Начать игру</Link>
        </button>
      </div>
      <div className={styles.board}>
        <div className={styles.titleLine}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        <div className={styles.line}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        <div className={styles.line}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        <div className={styles.line}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        <div className={styles.line}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        <div className={styles.line}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        <div className={styles.line}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        <div className={styles.line}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
      </div>
    </div>
  );
}
