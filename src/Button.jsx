import "./index.css";

function Button(props) {
  return (
    <button className={props.class} onClick={props.handleAction} id={props.id}>
      {props.buttonText}
    </button>
  );
}
export default Button;
