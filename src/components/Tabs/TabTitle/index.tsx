import { useCallback } from "react";

import styles from "./tabTitle.module.css";
import { DisplayType } from "../../../constants";

export type Props = {
  title: DisplayType;
  setSelectedTab: (index: DisplayType) => void;
  isActive?: boolean;
};

const TabTitle = (props: Props): JSX.Element => {
  const { title, setSelectedTab, isActive } = props;

  const handleOnClick = useCallback(() => {
    setSelectedTab(title);
  }, [setSelectedTab, title]);

  return (
    <li className={`${styles.title} ${isActive ? "active" : ""}`}>
      <button onClick={handleOnClick}>{title}</button>
    </li>
  );
};

export default TabTitle;
