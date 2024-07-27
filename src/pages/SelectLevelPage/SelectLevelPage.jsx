import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useSimpleModeContext } from "../../hooks/useSimpleModeContext";

export function SelectLevelPage() {
  const { setIsSimple } = useSimpleModeContext();

  const handleCheckbox = () => {
    setIsSimple(prevState => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <div>
          <input type="checkbox" id="simple" className={styles.checkbox} onClick={handleCheckbox} />
          <label htmlFor="simple" className={styles.label}>
            {" "}
            Упрощенный режим (игра до трех ошибок)
          </label>
        </div>
      </div>
    </div>
  );
}
