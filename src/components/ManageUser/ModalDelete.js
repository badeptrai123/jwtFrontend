import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete(props) {
  return (
    <>
      <Modal show={props.isShowDelete} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo,Are you sure to delete this user: {props.userDelete.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
