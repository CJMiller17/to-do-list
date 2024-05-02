
function Button(props) {
    // console.log(props)
    // console.log(props.children)
    return (
      <button
        className={props.class}
            onClick={props.handleAction}
            id={props.id}
      >
       {props.buttonText}
      </button>
    );
}

export default Button
