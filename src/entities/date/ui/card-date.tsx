import { FC, memo } from "react";
import { TCardDateProps } from "./card-date-types";
import styles from "./card-date.module.scss"
export const CardDate: FC<TCardDateProps> = memo(({ year, description }) => {
  return (
    <div className={styles.card}>
      <span className={styles.year}>{year}</span>
      <span className={styles.description}>{description}</span>
    </div>
  )
})