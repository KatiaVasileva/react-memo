import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { useSimpleModeContext } from "../../hooks/useSimpleModeContext";
import { useLeaderContext } from "../../hooks/useLeaderContext";
import { LeaderboardModal } from "../LeaderboardModalWindow/LeaderboardModal";
// import { useLevelContext } from "../../hooks/useLevelContext";
import insighttUrl from "./images/eye.png";
import alohomoraUrl from "./images/cards.png";
import { TooltipModal } from "../TooltipModal/TooltipModal";
import { useSuperPowerContext } from "../../hooks/useSuperPowerContext";

// Игра закончилась
const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW";
const STATUS_PAUSE = "STATUS_PAUSE";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW);

  // Дата начала игры
  // eslint-disable-next-line no-unused-vars
  const [gameStartDate, setGameStartDate] = useState(null);
  // Дата конца игры
  // eslint-disable-next-line no-unused-vars
  const [gameEndDate, setGameEndDate] = useState(null);

  // Состояние, определящие открытие/закрытие модального окна подсказки
  const [isOpen, setIsOpen] = useState(false);

  // Состояние, определяющее, на какой значок суперсилы наведена мышь
  const [isInsightSelected, setIsInsightSelected] = useState(false);
  const [isAlohomoraSelected, setIsAlohomoraSelected] = useState(false);

  // Счетчик ошибок (в упрощенном режиме игры)
  const [errCounter, setErrorCounter] = useState(0);

  const { leaders } = useLeaderContext();
  // const { level } = useLevelContext();
  const { setIsInsightUsed } = useSuperPowerContext();

  // Стейт для таймера, высчитывается в setInterval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  // Состояние, определяющее включен ли упрощенный режим игры
  const { isSimple } = useSimpleModeContext();

  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
  }
  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
    setIsInsightUsed(false);
  }
  function resetGame() {
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
    setErrorCounter(0);
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return;
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }

      return {
        ...card,
        open: true,
      };
    });

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);

    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }

    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open);

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);

      if (sameCards.length < 2) {
        return true;
      }

      return false;
    });

    // Определяет, програл ли игрок
    let playerLost;
    const isWrongCard = openCardsWithoutPair.length >= 2;

    // Упрощенный режим игры (игрок проиграл, если сделал три ошибки)
    if (isSimple) {
      setCards(nextCards);
      if (isWrongCard && errCounter < 2) {
        setErrorCounter(prevState => prevState + 1);
        setTimeout(() => {
          setCards(
            cards.reduce((acc, card) => {
              if (card.id === clickedCard.id) {
                return [...acc, { ...card, open: false }];
              }
              return [...acc, card];
            }, []),
          );
        }, 500);
      } else {
        playerLost = isWrongCard;
      }
    }

    // Обычный режим игры (игрок проиграл, если сделал ошибку)
    if (!isSimple) {
      playerLost = isWrongCard;
    }

    // "Игрок проиграл", т.к на поле есть две открытые карты без пары
    if (playerLost) {
      finishGame(STATUS_LOST);
      return;
    }

    // ... игра продолжается
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return;
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  // Обновляем значение таймера в интервале
  useEffect(() => {
    if (status !== STATUS_PAUSE) {
      if (status === STATUS_LOST || status === STATUS_WON) {
        return;
      }
      const intervalId = setInterval(() => {
        setTimer(
          timer.seconds !== 59
            ? timer => ({
                ...timer,
                seconds: timer.seconds + 1,
              })
            : timer => ({
                seconds: 0,
                minutes: timer.minutes + 1,
              }),
        );
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [status, timer, setTimer]);

  // Сохраняет продолжительность игры игрока
  let gameDuration = timer.minutes * 60 + timer.seconds;
  // Определяет, попдает ли игрок на лидерборд по времени игры
  // const isLeaderboard = gameDuration < leaders[2].time && status === STATUS_WON && level === 3;
  const isLeaderboard = gameDuration < leaders[2].time && status === STATUS_WON;

  // При нажатии на иконку силы "Прозрение" все карты открываются на 5 секунд, а таймер останавливается
  const handleInsightPowerClick = () => {
    setIsInsightUsed(true);
    setIsOpen(false);
    const currentTimer = timer;
    const currentCards = cards;
    const openCards = cards.map(card => ({
      ...card,
      open: true,
    }));

    setCards(openCards);
    setStatus(STATUS_PAUSE);

    setTimeout(() => {
      setStatus(STATUS_IN_PROGRESS);
      setTimer(currentTimer);
      setCards(currentCards);
    }, 5000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS || status === STATUS_PAUSE ? (
          <div className={styles.powerBox}>
            <img
              className={styles.power}
              onMouseOver={() => {
                setIsOpen(true);
                setIsInsightSelected(true);
              }}
              onMouseOut={() => {
                setIsOpen(false);
                setIsInsightSelected(false);
              }}
              onClick={handleInsightPowerClick}
              src={insighttUrl}
              alt="insight-power"
            />
            <img
              className={styles.power}
              onMouseOver={() => {
                setIsOpen(true);
                setIsAlohomoraSelected(true);
              }}
              onMouseOut={() => {
                setIsOpen(false);
                setIsAlohomoraSelected(false);
              }}
              src={alohomoraUrl}
              alt="alohomora-power"
            />
          </div>
        ) : null}
        {status === STATUS_IN_PROGRESS || status === STATUS_PAUSE ? (
          <Button onClick={resetGame}>Начать заново</Button>
        ) : null}
      </div>

      <div className={styles.cardBox}>
        <div className={styles.cards}>
          {cards.map(card => (
            <Card
              key={card.id}
              onClick={() => openCard(card)}
              open={status !== STATUS_IN_PROGRESS ? true : card.open}
              suit={card.suit}
              rank={card.rank}
            />
          ))}
        </div>
      </div>

      {/* Счетчик ошибок появляется только в упрощенном режиме игры */}
      {isSimple && (
        <div className={styles.counter}>
          <p>Счетчик ошибок: {errCounter}</p>
        </div>
      )}

      {/* Открытие подсказки при наведении мыши на значок суперсилы */}
      {isOpen && (
        <div className={styles.tooltipModalContainer}>
          <div className={styles.tooltipModalWindow}>
            {isInsightSelected && (
              <div className={styles.insightTooltip}>
                <TooltipModal
                  title="Прозрение"
                  text="На 5 секунд показываются все карты. Таймер длительности игры на это время останавливается."
                />
              </div>
            )}
            {isAlohomoraSelected && (
              <div className={styles.alohomoraTooltip}>
                <TooltipModal title="Алохомора" text="Открывается случайная пара карт." />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Открытие модального окна лидерборда */}
      {isGameEnded && isLeaderboard && (
        <div className={styles.modalContainer}>
          <LeaderboardModal gameDurationSeconds={timer.seconds} gameDurationMinutes={timer.minutes} />
        </div>
      )}

      {/* Открытие модального окна победы/проигрыша */}
      {isGameEnded && !isLeaderboard ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}
    </div>
  );
}
