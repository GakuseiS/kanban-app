import { ChangeEvent, FC } from 'react';

import { SearchIcon } from '@/ui/icons';

import styles from './search.module.scss';

type Props = {
  /** Значение поля */
  value?: string;
  /** Плейсхолдер */
  placeholder?: string;
  /** Обработчик изменения значения */
  onValueChange?: (value: string) => void;
};

/** Поле поиска */
export const InputSearch: FC<Props> = ({ value, onValueChange, placeholder }) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    onValueChange?.(target.value);
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} value={value} onChange={handleChange} placeholder={placeholder} />
      <span className={styles.icon}>
        <SearchIcon />
      </span>
    </div>
  );
};
