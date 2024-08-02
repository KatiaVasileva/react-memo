import { Link } from "react-router-dom";
import styles from "./Leaderboard.module.css";
import { useLeaderContext } from "../../hooks/useLeaderContext";
import { Button } from "../../components/Button/Button";

export function Leaderboard() {
  const { leaders } = useLeaderContext();

  // Сортирует массив лидеров по времени от наименьшеного к наибольшему
  function compareByTime(leader1, leader2) {
    if (leader1.time > leader2.time) {
      return 1;
    }
    if (leader1.time < leader2.time) {
      return -1;
    }
    return 0;
  }

  leaders.sort(compareByTime);

  // Ограничение лидерборда 10-ю строками
  const leaderboardLength = 10;
  const leaderboard = leaders.slice(0, leaderboardLength);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Лидерборд</h1>
        <Button>
          <Link to="/">Начать игру</Link>
        </Button>
      </div>
      <div className={styles.board}>
        <div className={styles.titleLine}>
          <div className={styles.position}>Позиция</div>
          <div className={styles.user}>Пользователь</div>
          <div className={styles.time}>Время</div>
        </div>
        {leaderboard
          .map(leader => (
            <div className={styles.line} key={leader.id}>
              <div className={styles.position}>{leaderboard.indexOf(leader) + 1}</div>
              <div className={styles.user}>{leader.name}</div>
              <div className={styles.time}>
                {Math.floor(leader.time / 60)
                  .toString()
                  .padStart("1", "0")}
                :
                {Math.floor(leader.time % 60)
                  .toString()
                  .padStart("2", "0")}
              </div>
            </div>
          ))
          .slice(0, 10)}
      </div>
    </div>
  );
}
