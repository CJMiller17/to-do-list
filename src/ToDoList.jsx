import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { DataGrid } from "@mui/x-data-grid";



function ToDoList() {
  
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  console.log(newTaskDate);

  const [currentTasks, setCurrentTasks] = useState(
    // Utilizing the Nullish operator to implement local storage on load.
    JSON.parse(localStorage.getItem("currentTasks")) ?? []);
  
  const rows = [
    { id: 1, col1: "A", col2: "World" },
    { id: 2, col1: "B", col2: "is Awesomevzdfvxdftbxftbxfbxfybxfyb ", noWrap: true },
    { id: 3, col1: "C", col2: "is Amazing", col3: "May 25, 24" },
    { id: 4, col1: "D", col2: "is Amazing" },
    { id: 5, col1: "E", col2: "is Amazing" },
  ];

  const columns = [
    { field: "col1", headerName: "Priority", flex: .3, sortable: false, display: "flex", align: "right", headerAlign: "right" },
    { field: "col2", headerName: "Task Desc.", flex: 2, sortable: false },
    { field: "col3", headerName: "Complete By", flex: 1, sortable: false },
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
          ></Button>
        </div>

        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            // Disables some built in visibility features that I don't want the user to have
            disableColumnMenu
          />
        </div>
      </div>
    </>
  );
}

export default ToDoList;