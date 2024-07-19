import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  useEditableControls,
  ButtonGroup
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, DeleteIcon } from "@chakra-ui/icons"


function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls() // Circle back to this syntax

  return isEditing ? (
    <ButtonGroup>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()}/>
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()}/>
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton icon={<EditIcon />} {...getEditButtonProps()}/>
    </Flex>
  )
}

function ToDoList() {
  
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskRecurring, setNewTaskRecurring] = useState(false)
  const [newTaskFrequency, setNewTaskFrequency] = useState("")
  const [currentTasks, setCurrentTasks] = useState(
    // Utilizing the Nullish operator to implement local storage on load.
    JSON.parse(localStorage.getItem("currentTasks")) ?? []);
  // const totalRows = currentTasks.length
  

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
    return selectedDate.toLocaleDateString("en-US", mmDDYY);
  }

  function handleTaskInput(event) {
    setNewTaskDescription(event.target.value);
  }

  function handleTaskDueDate(event) {
    const selectedDate = event.target.value;
    setNewTaskDate(selectedDate);
  }

  function handleTaskRecurring(even) {
    setNewTaskRecurring(event.target.checked)
  }

  function handleTaskFrequency(event) {
    setNewTaskFrequency(event.target.value)
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
        recurring: newTaskRecurring,
        frequency: newTaskFrequency
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
    setCurrentTasks(currentTasks.filter((task) => task.id !== id));
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

  // This fixed the bug where the numbers would get out of order
  function updateTask(id, description) {
    setCurrentTasks(currentTasks.map((task) => (task.id === id ? { ...task, description } : task)))
  }
  
  return (
    <>
      <Box className="to-do-list" p={4}>
        <Text as="h1" mb={4}>
          {" "}
          Honey-Do List
        </Text>
        <Flex mb={4} alignItems="center">
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
          <label
            htmlFor="dueDate"
            style={{ marginLeft: "8px", marginRight: "8px" }}
          >
            Due date:
          </label>

          <input
            type="date"
            id="dueDate"
            name="taskDueDate"
            value={newTaskDate}
            min="2024-01-01"
            onChange={handleTaskDueDate}
          />
          <label>
            <input
              type="checkbox"
              checked={newTaskRecurring}
              onChange={handleTaskRecurring}
            />
            Recurring?
          </label>

          {newTaskRecurring && (
            <select value={newTaskFrequency} onChange={handleTaskFrequency}>
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biWeekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          )}

          <Button ml={2} onClick={addTask} colorScheme="teal">
            Add
          </Button>
        </Flex>

        <SimpleGrid columns={1} spacing={4}>
          {currentTasks.map((task, index) => (
            <Flex
              key={task.id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box flex="1">
                <Editable
                  defaultValue={task.description}
                  onSubmit={(value) => updateTask(task.id, value)}
                >
                  <EditablePreview />
                  <EditableInput />
                  <EditableControls />
                </Editable>
              </Box>

              <Box flex=".3" textAlign="right">
                <Text>{task.dueDate}</Text>
              </Box>

              <Box>
                <IconButton
                  icon={<ArrowUpIcon />}
                  onClick={() => moveTaskUp(task.id)}
                  mr={2}
                />
                <IconButton
                  icon={<ArrowDownIcon />}
                  onClick={() => moveTaskDown(task.id)}
                  mr={2}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => deleteTask(task.id)}
                  colorScheme="red"
                />
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default ToDoList;