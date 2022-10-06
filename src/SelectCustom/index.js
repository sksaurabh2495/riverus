import React from 'react';
import Select from "react-select";

const SelectCustom = ({ options, onChange, value, error }) => {
  return (
    <div className="w-full">
      <Select
        className={`${error ? "border-red-500 border-2 rounded-lg" : ""}`}
        options={options}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
export default SelectCustom;
