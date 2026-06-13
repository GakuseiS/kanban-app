import { FC, PropsWithChildren } from 'react';

import styles from './container.module.scss';

type Props = PropsWithChildren;

/** Контейнер страницы */
export const Container: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
