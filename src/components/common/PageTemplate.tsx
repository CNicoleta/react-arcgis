import { observer } from "mobx-react";
import styles from "styles/PageTemplate.module.css";

const PageTemplate = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default observer(PageTemplate);
