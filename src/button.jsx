

function Button(className, onClick, text) {


    return (
      <>
        <button
          className="delete-button"
          // The arrow fn has to be used to prevent the natural behavior of calling a function immediately with a parameter.
          onClick={() => deleteTask(index)}
        >
          Delete
        </button>
        <button className="move-button" onClick={() => moveTaskUp(index)}>
          Up
        </button>
        <button className="move-button" onClick={() => moveTaskDown(index)}>
          Down
        </button>
      </>
    );
}