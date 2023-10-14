import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { updateRole } from "../../services/roleService";

function ModalUpdateRole(props) {
  const { onHide, isShowModal, dataModalRole } = props;
  console.log(dataModalRole);
  const initialRoleData = {
    url: "",
    description: "",
  };
  const [roleData, setRoleData] = useState(initialRoleData);
  useEffect(() => {
    setRoleData(dataModalRole);
  }, [dataModalRole]);
  const handleOnChange = (name) => (e) => {
    setRoleData({
      ...roleData,
      [name]: e.target.value,
    });
  };

  const handleConfirm = async () => {
    let res = await updateRole(roleData);
    if (res && res.EC === 0) {
      onHide();
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  const handleOnHide = () => {
    onHide();
    setRoleData(initialRoleData);
  };
  return (
    <>
      <Modal
        show={isShowModal}
        onHide={handleOnHide}
        size="lg"
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content-body row">
            <div className="col-6 form-group">
              <label>URL:</label>
              <input
                type="text"
                className="form-control"
                value={roleData.url || ""}
                onChange={handleOnChange("url")}
              />
            </div>
            <div className="col-6 form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                value={roleData.description || ""}
                onChange={handleOnChange("description")}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOnHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateRole;
