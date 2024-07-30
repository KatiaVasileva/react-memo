import { Link, useNavigate } from "react-router-dom";
import styles from "./LeaderboardModal.module.css";
import celebrationImageUrl from "./images/celebration.png";
import { useState } from "react";
import { addLeader } from "../../api";
import { useLeaderContext } from "../../hooks/useLeaderContext";

export function LeaderboardModal({ gameDurationSeconds, gameDurationMinutes }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState("");
  const { setLeaders } = useLeaderContext();
  const navigate = useNavigate();

  const handleInput = event => {
    setUser(event.target.value);
  };

  const handleSubmitButton = async () => {
    const newLeaders = await addLeader({ name: user, time: gameDurationMinutes * 60 + gameDurationSeconds });
    setLeaders(newLeaders.leaders);
    setIsSubmit(true);
  };

  const handlePlayButton = () => {
    navigate("/");
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={celebrationImageUrl} alt="celebration emodji" />
      <h2 className={styles.title}>Вы попали на лидерборд!</h2>
      <input className={styles.input} name="user" value={user} onChange={handleInput} placeholder="Введите имя"></input>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>
      {!isSubmit && (
        <button className={styles.button} onClick={handleSubmitButton}>
          Отправить
        </button>
      )}
      {isSubmit && (
        <button className={styles.button} onClick={handlePlayButton}>
          Играть снова
        </button>
      )}
      <div className={styles.leaderboard}>
        <Link className={styles.leaderboardLink} to="/leaderboard">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
