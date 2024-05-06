import { ReactElement } from "react";

import styles from "./tabs.module.css";
import TabTitle, { Props as TabTitleProps } from "./TabTitle";
import { DisplayType } from "../../constants";

type Props = {
  children: ReactElement<TabTitleProps>[];
  selectedTabIndex: DisplayType;
  setSelectedTabIndex: (index: DisplayType) => void;
};

const Tabs = (props: Props): JSX.Element => {
  const { children, selectedTabIndex, setSelectedTabIndex } = props;

  const selectedTab = selectedTabIndex === DisplayType.Movies ? 0 : 1;

  return (
    <div className={styles.tabs}>
      <ul>
        {children.map((item, index) => (
          <TabTitle
            key={item.props.title}
            title={item.props.title}
            isActive={index === selectedTab}
            setSelectedTab={setSelectedTabIndex}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
