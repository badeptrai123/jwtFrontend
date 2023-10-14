import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDeleteRole(props) {
  return (
    <>
      <Modal show={props.isShowDelete} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo,Are you sure to delete this role: {props.roleDelete.url}?
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

export default ModalDeleteRole;
