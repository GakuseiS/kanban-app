import { ChangeEvent, FC } from 'react';
import { InputText } from '../text';

type Props = {
  /** Значение */
  value?: string;
  /** Плейсхолдер */
  placeholder?: string;
  /** Есть ли ошибка */
  hasError?: boolean;
  /** Сеттер ошибки */
  setError?: (valid: boolean) => void;
  /** Обработчик изменения значения */
  onValueChange?: (date: string) => void;
};

/** Поле с датой */
export const InputDate: FC<Props> = (props) => {
  const { value, onValueChange, setError, hasError, placeholder = 'дд.мм.гггг' } = props;

  const handleBlur = () => {
    setError?.(value?.length !== 10);
  };

  const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const value = target.value.replaceAll(/[\D]/g, '');
    const groups = [value.substring(0, 2), value.substring(2, 4), value.substring(4, 8)];
    const filteredGroups: string[] = [];

    groups.forEach((group, index) => {
      if (!group) {
        return;
      }

      if (index === 0) {
        let day = group;

        if (Number(day) > 31) {
          day = '31';
        }

        if (day === '00') {
          day = '01';
        }

        filteredGroups.push(day);
      }

      if (index === 1) {
        let month = group;

        if (Number(month) > 12) {
          month = '12';
        }

        if (month === '00') {
          month = '01';
        }

        filteredGroups.push(month);
      }

      if (index === 2) {
        filteredGroups.push(group);
      }
    });

    const resultDate = filteredGroups.join('.');

    onValueChange?.(resultDate);
  };

  return (
    <InputText
      type='tel'
      value={value}
      onChange={handleChangeInput}
      hasError={hasError}
      placeholder={placeholder}
      onBlur={handleBlur}
    />
  );
};
