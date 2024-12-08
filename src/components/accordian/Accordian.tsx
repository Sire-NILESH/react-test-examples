import { ChevronDown } from "lucide-react";
import { ComponentPropsWithRef, memo, useCallback, useState } from "react";
import styles from "./Accordian.module.css";

export type AccordianItemType = {
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

type AccordianProps = ComponentPropsWithRef<"div"> & {
  items: AccordianItemType[];
};

const Accordian = ({ items, ...props }: AccordianProps) => {
  const [activeItemId, setActiveItemId] = useState<
    null | AccordianItemType["id"]
  >(null);

  const setActiveItemHandler = useCallback(
    (itemId: AccordianItemType["id"]) => {
      setActiveItemId((prev) => (prev === itemId ? null : itemId));
    },
    []
  );

  return (
    <div className={styles.accordian__container} {...props}>
      {items.map((item) => (
        <AccordianItem
          key={item.id}
          item={item}
          activeItemId={activeItemId}
          setActiveItemHandler={setActiveItemHandler}
        />
      ))}
    </div>
  );
};

type AcordianItemProps = ComponentPropsWithRef<"div"> & {
  item: AccordianItemType;
  activeItemId: null | AccordianItemType["id"];
  setActiveItemHandler: (itemId: AccordianItemType["id"]) => void;
};

const AccordianItem = memo(
  ({
    item,
    activeItemId,
    setActiveItemHandler,
    ...props
  }: AcordianItemProps) => {
    return (
      <div
        key={item.id}
        className={`${styles.accordian__item} ${
          activeItemId === item.id ? styles.open : ""
        }`}
        {...props}
      >
        <span className={styles.accordian__header__number}>{item.id}</span>
        <span className={styles.accordian__header__title}>{item.title}</span>
        <button
          className={styles.accordian__header_control}
          onClick={() => setActiveItemHandler(item.id)}
        >
          <ChevronDown className={styles["accordian__header__icon"]} />
        </button>

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
    );
  }
);

export default Accordian;
