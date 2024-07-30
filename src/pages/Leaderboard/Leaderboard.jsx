import { Link } from "react-router-dom";
import styles from "./Leaderboard.module.css";
import { useLeaderContext } from "../../hooks/useLeaderContext";

export function Leaderboard() {
  const { leaders } = useLeaderContext();

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
        {leaders.map(leader => (
          <div className={styles.line} key={leader.id}>
            <div className={styles.position}>{leaders.indexOf(leader) + 1}</div>
            <div className={styles.user}>{leader.name}</div>
            <div className={styles.time}>{leader.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
