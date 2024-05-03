import React, { useState } from "react";
import moment from 'moment';
import "./index.css";

function Task({ task, updateTask }) {
  
  console.log("updateTask: ", updateTask)
  // Calc the diff between current date and due date
  const dueDateDiff = moment(task.dueDate).diff(moment(), "days");
  const dueDateTest = moment(task.dueDate);
  // This was an attempt to fix the editing issue where the edits aren't retained
  
  // This code isn't working

/*  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = () => {
    setEditedDescription(event.target.value);
  };

  const handleSave = () => {
    console.log("taskId: ", task.id)
    console.log("EditDesc: ", editedDescription)
    updateTask(task.id, editedDescription);
    setIsEditing(false);
  }
*/
  
    let dotColor = "";
    if (dueDateDiff >= "5") {
      dotColor = "green";
    } else if (dueDateDiff >= 2) {
      dotColor = "orange";
    } else if (dueDateDiff >= 0) {
      dotColor = "red";
    } else {
      dotColor = "lightgray";
    }

    return (
      <>
        <div key={task.id}>
          {/* // This code also isn't working. I will come back to it later */}
          {/* {isEditing ? (
            <input
              type="text"
              value={editedDescription}
              onChange={handleInputChange}
              onBlur={handleSave}
              autoFocus
            />
          ) : ( */}
            <div>
              <span className="status" style={{ backgroundColor: dotColor }}>||||</span>
              <span className="text">{task.description}</span>
            </div>
        </div>
      </>
    );

}

export default Task