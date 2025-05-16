import "swiper/swiper-bundle.css";
import { FC, memo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import styles from "./event-bar.module.scss";
import { Navigation, Pagination } from "swiper/modules";
import { TEventBarProps } from "./event-bar-types";
import { CardDate } from "@/entities/date";

export const EventBar: FC<TEventBarProps> = memo(
  ({ selectedCategoryId, isChanging, data, isMobile, childern }) => {
    const leftArrow = useRef<HTMLButtonElement>(null);
    const rightArrow = useRef<HTMLButtonElement>(null);
    const [isBeginning, setIsBeggining] = useState<boolean>(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    return (
      <section className={clsx(styles.events, isChanging && styles.hidden)}>
        <Swiper
          direction="horizontal"
          slidesPerView="auto"
          breakpoints={{
            1025: {
              slidesPerView: 3,
            },
            426: {
              slidesPerView: 2,
            },
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              // @ts-expect-error/the property exists
              swiper.params.navigation.prevEl = leftArrow.current;
              // @ts-expect-error/the property exists
              swiper.params.navigation.nextEl = rightArrow.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });

            setIsBeggining(swiper.isBeginning);
            setIsEnd(swiper.isEnd);

            swiper.on("slideChange", () => {
              setIsBeggining(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            });
          }}
          navigation={{
            nextEl: rightArrow.current,
            prevEl: leftArrow.current,
          }}
          spaceBetween={isMobile ? 25 : 80}
          modules={[Navigation, Pagination]}
          pagination={{
            el: "#pagination",
            clickable: true,
            type: "bullets",
            bulletClass: styles.bullet,
            bulletActiveClass: styles.active,
          }}
        >
          {data[selectedCategoryId - 1].events.map((item) => (
            <SwiperSlide className={styles.swiperSlide} key={item.id}>
              <CardDate year={item.year} description={item.description} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={leftArrow}
          className={clsx(
            styles.arrow,
            styles.reverse,
            isBeginning && styles.hidden
          )}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2" />
          </svg>
        </button>
        <button
          ref={rightArrow}
          className={clsx(styles.arrow, isEnd && styles.hidden)}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#3877EE" stroke-width="2" />
          </svg>
        </button>
        <div className={styles.wrapper}>
          {childern}
          <div id="pagination" className={styles.pagination}></div>
        </div>
      </section>
    );
  }
);
