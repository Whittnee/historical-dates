import { FC, memo } from "react";
import styles from "./controller.module.scss";
import clsx from "clsx";
import { TControllerProps } from "./controller-types";
export const Controller: FC<TControllerProps> = memo(
  ({ reverse, handleChangePeriod, selectedCategoryId, length }) => {
    return (
      <button
        type="button"
        className={clsx(styles.controller, reverse && styles.reverse)}
        onClick={() =>
          handleChangePeriod(
            reverse ? selectedCategoryId + 1 : selectedCategoryId - 1
          )
        }
        disabled={
          reverse ? selectedCategoryId === length : selectedCategoryId === 1
        }
      >
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
            stroke="#42567A"
            stroke-width="2"
          />
        </svg>
      </button>
    );
  }
);
