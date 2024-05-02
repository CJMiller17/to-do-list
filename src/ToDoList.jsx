import React, { useEffect, useState } from "react";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";

function ToDoList() {
  
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  console.log(newTaskDate);

  const [currentTasks, setCurrentTasks] = useState(
    // Utilizing the Nullish operator to implement local storage on load.
    JSON.parse(localStorage.getItem("currentTasks")) ?? []);

  // Should update local storage anytime the current task array is updated
  useEffect(() => {
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
  }, [currentTasks]);
  
  function formatDate(date) {
    const mmDDYY = { month: "long", day: "numeric", year: "2-digit" };
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    const formattedDate = selectedDate.toLocaleDateString("en-US", mmDDYY);
    return formattedDate;
  }
  //export formatDate

  function handleTaskInput(event) {
    setNewTaskDescription(event.target.value);
  }

  function handleTaskDueDate(event) {
    const selectedDate = event.target.value;
    setNewTaskDate(selectedDate);
  }
  

  function addTask() {
    // Prevents empty task submissions
    console.log("here!")
    if (newTaskDescription.trim() !== "") {
      const newTaskObject = {
        id: uuidv4(),
        description: newTaskDescription,
        dueDate: formatDate(newTaskDate),
      }
      setCurrentTasks([...currentTasks, newTaskObject]);
      // Clears the input field
      setNewTaskDescription("");
    }
  }
  
  
  function deleteTask(index) {
    // The item with the current index doesn't pass the test so doesn't appear in the new array. It doesn't move, it stays behind. Fun mind experiment.
    const updatedTasks = currentTasks.filter((element, i) => i !== index);
    setCurrentTasks(updatedTasks);
  }
  

  function moveTaskUp(index) {
    // If element is at the top, it can't be moved higher, ie. BUGS!! You can push stuff up and off the screen
    if (index > 0) {
      const updatedTasks = [...currentTasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setCurrentTasks(updatedTasks);
    }
  }
  

  function moveTaskDown(index) {
    if (index < currentTasks.length - 1) {
      const updatedTasks = [...currentTasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setCurrentTasks(updatedTasks);
    }
  }
  
  return (
    <>
      <div className="to-do-list">
        <h1> Honey-Do List</h1>
        <div>
          <input
            type="text"
            placeholder="Thing to do"
            value={newTaskDescription}
            onChange={handleTaskInput}
            // You can press enter to submit task
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTask();
              }
            }}
          />

          <label htmlFor="dueDate">Due date:</label>

          <input
            type="date"
            id="dueDate"
            name="taskDueDate"
            value={newTaskDate}
            min="2024-01-01"
            onChange={handleTaskDueDate}
          />
          <Button
            class={"add-button"}
            handleAction={addTask}
            buttonText={"Add"}
            // id={() => uuidv4}
          >
            {" "}
            I am a child
          </Button>
          {/* <button className="add-button" onClick={addTask}>
            Add
          </button> */}
        </div>

        <ul>
          {currentTasks.map((task, index) => (
            <li key={task.id}>
              <span className="status"> dot </span>
              <span className="text">{task.description}</span>
              <span className="due-date"> due: {task.dueDate}</span>

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
        </ul>
      </div>
    </>
  );
}

export default ToDoList;