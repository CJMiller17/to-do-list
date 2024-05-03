import React from "react";
import Button from "./Button";

function Task({tasks, deleteTask, moveTaskUp, MoveTaskDown}) {

    return (
      <ol>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span className="status"> dot </span>
            <span className="text">{task.description}</span>
            {/* // This creates a condition that prevents 'due:'' from appearing on tasks without a due date */}
            {task.dueDate && (
              <span className="due-date"> due: {task.dueDate}</span>
            )}

            <Button
              class={"delete-button"}
              // The arrow fn has to be used to prevent the natural behavior of calling a function immediately with a parameter.
              handleAction={() => deleteTask(index)}
              buttonText={"Delete"}
            />

            <Button
              class={"move-button"}
              buttonText={"Up"}
              handleAction={() => moveTaskUp(index)}
            />

            <Button
              class={"move-button"}
              buttonText={"Down"}
              handleAction={() => moveTaskDown(index)}
            />
          </li>
        ))}
      </ol>
    );

}

export default Task