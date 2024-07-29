import { Link } from "react-router-dom";
import styles from "./LeaderboardModal.module.css";
import celebrationImageUrl from "./images/celebration.png";

export function LeaderboardModal() {
  return (
    <div className={styles.modal}>
      <img className={styles.image} src={celebrationImageUrl} alt="celebration emodji" />
      <h2 className={styles.title}>Вы попали на лидерборд!</h2>
      <input className={styles.input} placeholder="Введите имя"></input>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>1.20</div>
      <button className={styles.button}>Играть снова</button>
      <div className={styles.leaderboard}>
        <Link className={styles.leaderboardLink} to="/leaderboard">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
