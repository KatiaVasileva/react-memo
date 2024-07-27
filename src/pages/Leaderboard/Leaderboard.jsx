import styles from "./Leaderboard.module.css";

export function Leaderboard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Лидерборд</h1>
        <button className={styles.button}>Начать игру</button>
      </div>
    </div>
  );
}
