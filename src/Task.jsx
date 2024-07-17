import React, { useState } from "react";
import moment from 'moment';
import "./index.css";

function Task({ task, updateTask }) {
  
  console.log("updateTask: ", updateTask)
  // Calc the diff between current date and due date
  const dueDateDiff = moment(task.dueDate).diff(moment(), "days");
  const dueDateTest = moment(task.dueDate);

  
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
            <div>
              <span className="status" style={{ backgroundColor: dotColor }}>||||</span>
              <span className="text">{task.description}</span>
            </div>
        </div>
      </>
    );

}

export default Task