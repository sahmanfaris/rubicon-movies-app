import { ReactElement } from "react";

type Props = {
  title: string;
  children: ReactElement | ReactElement[];
};

const TabContent = ({ children }: Props): JSX.Element => <div>{children}</div>;

export default TabContent;
