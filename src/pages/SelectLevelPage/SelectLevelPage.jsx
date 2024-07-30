import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useSimpleModeContext } from "../../hooks/useSimpleModeContext";
import { useLevelContext } from "../../hooks/useLevelContext";
import { useState } from "react";
import { getLeaders } from "../../api";
import { useLeaderContext } from "../../hooks/useLeaderContext";
import { Button } from "../../components/Button/Button";

export function SelectLevelPage() {
  const { setIsSimple } = useSimpleModeContext();
  const { level, setLevel } = useLevelContext();
  const { setLeaders } = useLeaderContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [getLeadersError, setGetLeadersError] = useState(false);
  const navigate = useNavigate();

  const handleCheckbox = () => {
    setIsSimple(prevState => !prevState);
  };

  const handlePlayButton = () => {
    if (level === 1) {
      navigate("/game/3");
    }
    if (level === 2) {
      navigate("/game/6");
    }
    if (level === 3) {
      navigate("/game/9");
    }
  };

  getLeaders()
    .then(leaders => {
      setLeaders(leaders.leaders);
    })
    .catch(() => {
      setGetLeadersError("Не удалось загрузить данные, попробуйте позже.");
    });

  return (
    <>
      {getLeadersError && <p className={styles.errorMessage}>{getLeadersError}</p>}
      {!getLeadersError && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <h1 className={styles.title}>Выбери сложность</h1>
            <ul className={styles.levels}>
              <li className={activeIndex === 0 ? styles.levelActive : styles.level}>
                <Link
                  className={styles.levelLink}
                  onClick={() => {
                    setLevel(1);
                    setActiveIndex(0);
                  }}
                >
                  1
                </Link>
              </li>
              <li className={activeIndex === 1 ? styles.levelActive : styles.level}>
                <Link
                  className={styles.levelLink}
                  onClick={() => {
                    setLevel(2);
                    setActiveIndex(1);
                  }}
                >
                  2
                </Link>
              </li>
              <li className={activeIndex === 2 ? styles.levelActive : styles.level}>
                <Link
                  className={styles.levelLink}
                  onClick={() => {
                    setLevel(3);
                    setActiveIndex(2);
                  }}
                >
                  3
                </Link>
              </li>
            </ul>
            <div className={styles.box}>
              <input type="checkbox" id="simple" className={styles.checkbox} onClick={handleCheckbox} />
              <label htmlFor="simple" className={styles.label}>
                {" "}
                Легкий режим (3 жизни)
              </label>
            </div>
            <Button className={styles.button} onClick={handlePlayButton}>
              Играть
            </Button>
            <div className={styles.leaderboard}>
              <Link className={styles.leaderboardLink} to="/leaderboard">
                Перейти к лидерборду
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
