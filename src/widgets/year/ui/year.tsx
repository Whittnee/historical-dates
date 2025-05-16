import { FC, memo, useEffect, useRef } from "react";
import { TYearProps } from "./year-types";
import styles from "./year.module.scss";
import clsx from "clsx";
import gsap from "gsap";

export const Year: FC<TYearProps> = memo(({ year, color = "blue" }) => {
  const yearRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!yearRef.current) return;

    gsap.to(yearRef.current, {
      innerText: year,
      duration: 0.5,
      snap: {
        innerText: 1,
      },
      ease: "power1.out",
    });
  }, [year]);
  return (
    <span ref={yearRef} className={clsx(styles.year, styles[color])}>
      0
    </span>
  );
});
