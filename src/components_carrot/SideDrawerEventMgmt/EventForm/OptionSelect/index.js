import React from 'react';
import { components } from 'react-select';

const OptionSelect = (props) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
      />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};

export default OptionSelect;