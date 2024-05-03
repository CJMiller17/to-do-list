import React, { useEffect, useState } from "react";
import Button from "./Button";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";
import "./index.css";

function ToDoList() {
  
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [currentTasks, setCurrentTasks] = useState(
    // Utilizing the Nullish operator to implement local storage on load.
    JSON.parse(localStorage.getItem("currentTasks")) ?? []);
  // const totalRows = currentTasks.length
  const columns = [
    {
      field: "priority",
      headerName: "Priority",
      editable: false,
      flex: .22,
      sortable: false,
      display: "flex",
      align: "right",
      headerAlign: "right",
    },
    {
      field: "col2",
      headerName: "Task Desc.",
      editable: true,
      flex: 1,
      sortable: false,
      renderCell: (x) => (
        <Task
          task={x.row}
        />
      ),
    },
    {
      field: "dueDate",
      headerName: "Complete By",
      editable: true,
      flex: .4,
      sortable: false,
    },
    {
      field: "buttons",
      headerName: "",
      editable: false,
      flex: .6,
      sortable: false,
      display: "flex",
      renderCell: (x) => (
        <div>
          <Button
            class={"delete-button"}
            buttonText={"Delete"}
            handleAction={() => deleteTask(x.row.id)}
          />
          <Button
            class={"move-button"}
            buttonText={"Up"}
            handleAction={() => moveTaskUp(x.row.id)}
          />
          <Button
            class={"move-button"}
            buttonText={"Down"}
            handleAction={() => moveTaskDown(x.row.id)}
          />
        </div>
      ),
    },
  ];

  // Should update local storage anytime the current task array is updated
  useEffect(() => {
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
  }, [currentTasks]);
  
  function formatDate(date) {
    // This makes it so that when a date isn't entered, 'Invalid Date' doesn't appear
    if (!date || isNaN(new Date(date))) {
      return "";
    }
    // Built in object to the toLocaleDateString method
    const mmDDYY = { month: "long", day: "numeric", year: "numeric" };
    const selectedDate = new Date(date);
    // This fixed a timezone bug where the date always showed the previous day
    selectedDate.setDate(selectedDate.getDate() + 1);
    const formattedDate = selectedDate.toLocaleDateString("en-US", mmDDYY);
    return formattedDate;
  }

  function handleTaskInput(event) {
    setNewTaskDescription(event.target.value);
  }

  function handleTaskDueDate(event) {
    const selectedDate = event.target.value;
    setNewTaskDate(selectedDate);
  }
  
  function addTask() {
    // Prevents empty task submissions
    if (newTaskDescription.trim() !== "") {
      // Creates standard task object
      const newTaskObject = {
        // Gives each task a unique id so they can move around without errors
        id: uuidv4(),
        description: newTaskDescription,
        dueDate: formatDate(newTaskDate),
      }
      setCurrentTasks([...currentTasks, newTaskObject]);
      // Clears the input field
      setNewTaskDescription("");
      // Clears calendar
      setNewTaskDate("");
    }
  }
  
  function deleteTask(id) {
    // The item with the current index doesn't pass the test so doesn't appear 
    // in the new array.It doesn't move, it stays behind. Fun mind experiment.
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    setCurrentTasks(updatedTasks);
  }
  
  function moveTaskUp(id) {
    // If element is at the top, it can't be moved higher, 
    // ie.BUGS!! You can push stuff up and off the screen
    const index = currentTasks.findIndex((task) => task.id === id);
    if (index > 0) {
      const updatedTasks = [...currentTasks];
      // Swapping places in the index
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setCurrentTasks(updatedTasks);
    }
  }
  
  function moveTaskDown(id) {
    const index = currentTasks.findIndex((task) => task.id === id);
    if (index < currentTasks.length - 1) {
      const updatedTasks = [...currentTasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setCurrentTasks(updatedTasks);
    }
  }

  // This function doesnt work. Tried to fix edit box bug
  /*
  function updateTask(id, description) {
    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: description } : task
      )
    );
  }
  */

  // This fixed the bug where the numbers would get out of order
  const rowsWithPriority = currentTasks.map((task, i) => ({
    ...task, priority: i + 1,
  }))
  
  return (
    <>
      <div className="to-do-list">
        <h1> Honey-Do List</h1>
        <div>
          <input
            type="text"
            placeholder="Before I forget..."
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
          {/* This is for accessibility reasons */}
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
          ></Button>
        </div>

        <div>
          <DataGrid
            rows={rowsWithPriority}
            columns={columns}
            // Disables some built in visibility features that I don't want the user to have
            disableColumnMenu
            hideFooter={true}
            // Populates the tasks into the grid
            components={{
              Cell: ({ row }) => (
                <Task
                  task={row}
                  updateTask={updateTask}
                />
              ) 
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ToDoList;