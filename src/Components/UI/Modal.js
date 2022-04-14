import ReactDOM from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";

function Modal(props) {
  const ModalOverlay = (props) => {
    return (
      <>
        <div onClick={props.onCartClose} className={classes.overlay}></div>
        <Card className={classes.modal}>{props.children}</Card>
      </>
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          children={props.children}
          onCartClose={props.onCartClose}
        />,
        document.getElementById("modal-overlay")
      )}
    </>
  );
}
export default Modal;
