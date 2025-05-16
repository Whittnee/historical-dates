import { FC } from "react";
import styles from "./historical-dates.module.scss";

export const HistoricalDates: FC = () => {
  return (
    <div className={styles.historicalDates}>
      <div className={styles.border}></div>
      <h1 className={styles.title}>
        Исторические <br /> даты
      </h1>
    </div>
  );
};
