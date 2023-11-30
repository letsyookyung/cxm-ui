import React from 'react';
import { components } from 'react-select';

const CustomOptionSelect = (props) => {
  const { isSelected, label, value, selectProps } = props;
  const isDisabled = selectProps.isOptionDisabled(value);

  return (
    <components.Option {...props} >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => null}
          disabled={isDisabled}
        />
      <label> {label}</label>
    </components.Option>
  );
};

export default CustomOptionSelect;