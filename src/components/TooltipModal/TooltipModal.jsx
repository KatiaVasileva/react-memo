import styles from "./TooltipModal.module.css";

export function TooltipModal({ title, text }) {
  return (
    <div className={styles.tooltip}>
      <h3 className={styles.tooltipTitle}>{title}</h3>
      <p className={styles.tooltipText}>{text}</p>
    </div>
  );
}
