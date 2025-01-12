import { ChangeEvent, FC } from 'react';
import { InputText } from '../text';

type InputDateProps = {
  value?: string;
  onValueChange?: (date: string) => void;
  placeholder?: string;
  error?: boolean;
  setError?: (valid: boolean) => void;
};

export const DateInput: FC<InputDateProps> = (props) => {
  const { value, onValueChange, setError, error, placeholder = 'дд.мм.гггг' } = props;

  const onBlur = () => {
    setError?.(value?.length !== 10);
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.replaceAll(/[\D]/g, '');
    const groups = [value.substring(0, 2), value.substring(2, 4), value.substring(4, 8)];
    const filteredGroups: string[] = [];
    groups.forEach((group, idx) => {
      if (group) {
        if (idx === 0) {
          let date = group;
          if (+group > 31) {
            date = '31';
          }
          if (group === '00') {
            date = '01';
          }
          filteredGroups.push(date);
        }
        if (idx === 1) {
          let month = group;
          if (+group > 12) {
            month = '12';
          }
          if (group === '00') {
            month = '01';
          }
          filteredGroups.push(month);
        }
        if (idx === 2) {
          const year = group;
          filteredGroups.push(year);
        }
      }
    });
    const resDate = filteredGroups.join('.');
    onValueChange?.(resDate);
  };

  return (
    <InputText
      type='tel'
      value={value}
      onChange={onInputChange}
      error={error}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};
