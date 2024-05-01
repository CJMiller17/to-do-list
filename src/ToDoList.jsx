import React, { useState } from 'react'

function ToDoList() {
    // Array of Strings
    const [currentTasks, setCurrentTasks] = useState(["Procrastinate", "Push things off", "Wait til tomorrow"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value)
    };

    function addTask() {
        // Prevents empty task submissions
        if(newTask.trim() !== "") {
        setCurrentTasks([...currentTasks, newTask]);
        // Clears the input field
        setNewTask("");    
        }
    };

    function deleteTask(index) {
        // The item with the current index doesn't pass the test so doesn't appear in the new array. It doesn't move, it stays behind. Fun mind experiment.
        const updatedTasks = currentTasks.filter((element, i) => i !== index)
        setCurrentTasks(updatedTasks);
    };

    function moveTaskUp(index) {
        // If element is at the top, it can't be moved higher, ie. BUGS!! You can push stuff up and off the screen
        if (index > 0) {
            const updatedTasks = [...currentTasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setCurrentTasks(updatedTasks);
        }
    };

    function moveTaskDown(index) {
        if (index < currentTasks.length - 1) {
          const updatedTasks = [...currentTasks];
          [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
          setCurrentTasks(updatedTasks);
        }
    };

    return (
      <>
        <div className="to-do-list">
          <h1> To-Do List</h1>
          <div>
            <input
              type="text"
              placeholder="Thing to do"
              value={newTask}
              onChange={handleInputChange}
              // You can press enter to submit task
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTask();
                }
              }}
            />
            <button className="add-button" onClick={addTask}>
              Add
            </button>
          </div>

          <ul>
            {currentTasks.map((task, index) => (
              <li key={index}>
                <span className="text">{task}</span>
                <button
                  className="delete-button"
                  // The arrow fn has to be used to prevent the natural behavior of calling a function immediately with a parameter.
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskUp(index)}
                >
                  Up
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskDown(index)}
                >
                  Down
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
    
};

export default ToDoList