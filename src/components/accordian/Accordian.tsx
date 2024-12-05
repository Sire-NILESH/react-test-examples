import { ChevronDown } from "lucide-react";
import React, { ComponentPropsWithRef } from "react";
import styles from "./Accordian.module.css";

export type AccordianItem = {
  id: number;
  title: string;
  content: {
    description: string;
    points: {
      id: number;
      label: string;
    }[];
  };
};

type Props = {
  items: AccordianItem[];
} & ComponentPropsWithRef<"div">;

const Accordian = ({ items, ...props }: Props) => {
  return (
    <div className={styles.accordian__container} {...props}>
      {items.map((item) => (
        <div key={item.id} className={styles.accordian__item}>
          {/* <div className={styles.accordian__header}> */}
          {/* <div> */}
          <span className={styles.accordian__header__number}>{item.id}</span>
          <span className={styles.accordian__header__title}>{item.title}</span>
          {/* </div> */}

          {/* <div> */}
          <ChevronDown className={styles["accordian__header__icon"]} />
          {/* </div> */}
          {/* </div> */}
          <div className={styles.accordian__content}>
            <p className={styles.accordian__content__description}>
              {item.content.description}
            </p>
            <ul className={styles.accordian_content__points}>
              {item.content.points.map((point) => (
                <li key={point.id} className={styles.accordian__content__point}>
                  {point.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordian;
