import React, { useState } from "react";
import { TaskUpdatePopupProps } from "../interface/addToDoProps.interface";

const TaskUpdatePopup: React.FC<TaskUpdatePopupProps> = ({
  task,
  onUpdate,
  onCancel,
}) => {
  const [updatedText, setUpdatedText] = useState(task.text);

  // function send data to parent component to send request to update data
  const handleSave = () => {
    onUpdate(task.id, updatedText);
  };

  return (
    <div className="popup">
      <input
        type="text"
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default TaskUpdatePopup;
