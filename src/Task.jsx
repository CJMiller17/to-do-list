import React from "react";
import Button from "./Button";

function Task({task, deleteTask, moveTaskUp, moveTaskDown}) {

    return (
      <>
        {/* {tasks.map((task, index) => ( */}
        <div key={task.id}>
          <span className="status"> dot </span>
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