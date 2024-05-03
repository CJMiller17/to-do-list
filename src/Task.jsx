import React from "react";
import moment from 'moment';
import Button from "./Button";

function Task({ task, deleteTask, moveTaskUp, moveTaskDown }) {
    // Calc the diff between current date and due date
    const dueDateDiff = moment(task.dueDate, "YYYY-MM-DD").diff(moment(), "days");
    const dueDateTest = moment(task.dueDate, "YYYY-MM-DD");
    console.log("Moment: ", dueDateTest)
    console.log("Due Date Diff: ", dueDateDiff);
    console.log(task.dueDate)

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
        {/* {tasks.map((task, index) => ( */}
        <div key={task.id}>
          <span className="status" style={{ backgroundColor: dotColor }}> ** </span>
          <span className="text">{task.description}</span>
          {/* // This creates a condition that prevents 'due:'' from appearing on tasks without a due date
          {task.dueDate && (
            <span className="due-date"> due: {task.dueDate}</span>
          )} */}

          {/* <Button
            class={"delete-button"}
            // The arrow fn has to be used to prevent the natural behavior of calling a function immediately with a parameter.
            buttonText={"Delete"}
            handleAction={deleteTask}
          />

          <Button
            class={"move-button"}
            buttonText={"Up"}
            handleAction={moveTaskUp}
          />

          <Button
            class={"move-button"}
            buttonText={"Down"}
            handleAction={moveTaskDown}
          /> */}
        </div>
      </>
    );

}

export default Task