import React, { ChangeEvent } from "react";
import { FilterProps } from "../interface/addToDoProps.interface";

const Filter: React.FC<FilterProps> = ({ checked, onSelect }) => {
  // make useEffect make request to get all tasks or get completed only
  const handleSelectChange = (event: string) => {
    onSelect(event);
  };
  const options = ["All", "Completed"];
  return (
    <div className="select-container">
      <select
        className="select-box"
        value={checked}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleSelectChange(e.target.value)
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="select-arrow">&#9660;</div>
    </div>
  );
};

export default Filter;
