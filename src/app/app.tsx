import { FC, useCallback, useState } from "react";
import styles from "./app.module.scss";
import clsx from "clsx";
import { data } from "@/shared/assets/data";
import { HistoricalDates } from "@/widgets/historical-dates";
import { CircleHistory } from "@/widgets/circle-history";
import { Year } from "@/widgets/year";
import { EventBar } from "@/widgets/event-bar";
import { Controller } from "@/shared/ui/controller";
import { useMediaQuery } from "react-responsive";

const App: FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const handleChangePeriod = useCallback((id: number) => {
    setIsChanging(true);
    setTimeout(() => {
      setSelectedCategoryId(id);
      setIsChanging(false);
    }, 500);
  }, []);

  return (
    <div className={styles.app}>
      <div className={clsx(styles.border, styles.horizontal)}></div>
      <div className={clsx(styles.border, styles.vertical)}></div>
      <HistoricalDates />
      <CircleHistory
        data={data}
        selectedCategoryId={selectedCategoryId}
        handleChangePeriod={handleChangePeriod}
      />
      <div className={styles.years}>
        <Year year={data[selectedCategoryId - 1].startYear} color="blue" />{" "}
        <Year year={data[selectedCategoryId - 1].endYear} color="pink" />
      </div>
      {!isTablet && (
        <div className={styles.controllers}>
          <h2
            className={styles.quantity}
          >{`0${selectedCategoryId}/0${data.length}`}</h2>
          <div className={styles.controller}>
            <Controller
              handleChangePeriod={handleChangePeriod}
              selectedCategoryId={selectedCategoryId}
              length={data.length}
            />
            <Controller
              handleChangePeriod={handleChangePeriod}
              selectedCategoryId={selectedCategoryId}
              length={data.length}
              reverse
            />
          </div>
        </div>
      )}
      {isTablet && (
        <span className={clsx(styles.category, isChanging && styles.hidden)}>
          {data[selectedCategoryId - 1].category}
        </span>
      )}
      <EventBar
        isChanging={isChanging}
        selectedCategoryId={selectedCategoryId}
        data={data}
        isMobile={isMobile}
        childern={
          isTablet && (
            <div className={styles.controllers}>
              <h2
                className={styles.quantity}
              >{`0${selectedCategoryId}/0${data.length}`}</h2>
              <div className={styles.controller}>
                <Controller
                  handleChangePeriod={handleChangePeriod}
                  selectedCategoryId={selectedCategoryId}
                  length={data.length}
                />
                <Controller
                  handleChangePeriod={handleChangePeriod}
                  selectedCategoryId={selectedCategoryId}
                  length={data.length}
                  reverse
                />
              </div>
            </div>
          )
        }
      />
    </div>
  );
};

export default App;
