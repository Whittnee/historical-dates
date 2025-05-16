import { FC, memo, useMemo, useRef } from "react";
import { TCircleHistoryProps } from "./circle-history-types";
import styles from "./circle-history.module.scss";
import clsx from "clsx";

const circleDegrees = 360;
const angleStart = 120;

export const CircleHistory: FC<TCircleHistoryProps> = memo(
  ({ data, selectedCategoryId, handleChangePeriod }) => {
    const segmentDeg = useMemo(
      () => circleDegrees / data.length,
      [data.length]
    );

    const currentId = useRef<number>(0);
    const currentAngle = useRef<number>(angleStart);

    const { angle, transitionSpeed } = useMemo(() => {
      const halfLength = Math.ceil(data.length / 2);

      let offset = selectedCategoryId - currentId.current;
      if (offset >= halfLength) {
        offset = offset - data.length;
      }
      if (offset <- halfLength) {
        offset = offset + data.length;
      }
      const result = {
        angle: currentAngle.current - offset * segmentDeg,
        transitionSpeed: Math.abs(offset) * 1000,
      };
      currentId.current = selectedCategoryId;
      currentAngle.current = result.angle;

      return result;
    }, [selectedCategoryId, segmentDeg, data]);

    return (
      <div className={styles.circleHistory}>
        <div className={styles.circle}>
          {data.map((item) => (
            <div
              className={styles.element}
              key={item.id}
              style={{
                transform: `rotateZ(${angle + segmentDeg * item.id}deg)`,
                transition: `transform ${transitionSpeed}ms`,
              }}
            >
              <button
                className={clsx(
                  styles.button,
                  item.id === selectedCategoryId && styles.active
                )}
                style={{
                  transform: `rotateZ(${-angle - segmentDeg * item.id}deg)`,
                  transition: `transform ${transitionSpeed}ms`,
                }}
                onClick={() => handleChangePeriod(item.id)}
              >
                <span className={styles.buttonId}>{item.id}</span>
                <span
                  className={styles.buttonCategory}
                  style={{
                    transition: `transform ${transitionSpeed}ms, opacity ${transitionSpeed}ms`,
                  }}
                >
                  {item.category}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
