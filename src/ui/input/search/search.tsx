import { ChangeEvent, FC } from 'react';
import { SearchIcon } from '../../icons';
import styles from './search.module.scss';

type InputSearchProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
};

export const InputSearch: FC<InputSearchProps> = ({ value, onValueChange, placeholder }) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.value);
  };

  return (
    <div className={styles.container}>
      <input className={styles.input} value={value} onChange={onInputChange} placeholder={placeholder} />
      <span className={styles.icon}>
        <SearchIcon />
      </span>
    </div>
  );
};
