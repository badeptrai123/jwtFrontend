import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  getAllGroup,
  createNewUser,
  updateUser,
} from "../../services/userService";
import { toast } from "react-toastify";
import classNames from "classnames";

function ModalUser(props) {
  const { onHide, isShowModal, action, dataModalUser } = props;
  const [listGroup, setListGroup] = useState([]);
  const initialUserData = {
    email: "",
    username: "",
    phone: "",
    password: "",
    sex: "",
    group: "",
    address: "",
  };
  const [userData, setUserData] = useState(initialUserData);
  useEffect(() => {
    fetAllGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser, action]);
  useEffect(() => {
    if (action === "CREATE") {
      if (listGroup && listGroup.length > 0) {
        setUserData({
          ...userData,
          group: listGroup[0].id,
          sex: "Male",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);
  const fetAllGroup = async () => {
    let res = await getAllGroup();
    if (res && +res.EC === 0) {
      setListGroup(res.DT);
      // if (res.DT && res.DT.length > 0) {
      //   setUserData({ ...userData, group: res.DT[0].id });
      // }
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnChange = (name) => (e) => {
    setUserData({
      ...userData,
      [name]: e.target.value,
    });
  };
  const defaultValidInput = {
    email: true,
    phone: true,
    password: true,
  };
  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);
  const checkValueInputs = () => {
    if (action === "UPDATE") return true;
    setObjectCheckInput(defaultValidInput);
    if (!userData.email) {
      toast.error("Email is required");
      setObjectCheckInput({ ...defaultValidInput, email: false });
      return false;
    }
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(userData.email)) {
      toast.error("Please enter the valid email address");
      setObjectCheckInput({ ...defaultValidInput, email: false });
      return false;
    }
    if (!userData.phone) {
      toast.error("Phone is required");
      setObjectCheckInput({ ...defaultValidInput, phone: false });
      return false;
    }
    if (!userData.password) {
      toast.error("Password is required");
      setObjectCheckInput({ ...defaultValidInput, password: false });
      return false;
    }
    return true;
  };
  const handleConfirm = async () => {
    console.log(userData);
    let check = checkValueInputs();
    if (check) {
      let res =
        action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData.group,
            })
          : await updateUser({ ...userData, groupId: userData.group });
      if (res && res.EC === 0) {
        onHide();
        setUserData({
          ...initialUserData,
          group: listGroup && listGroup.length > 0 ? listGroup[0].id : "",
        });
        toast.success(res.EM);
      }
      if (res && res.EC !== 0) {
        setObjectCheckInput({ ...defaultValidInput, [res.DT]: false });
        toast.error(res.EM);
      }
    }
  };
  const handleOnHide = () => {
    onHide();
    setUserData(initialUserData);
    setObjectCheckInput(defaultValidInput);
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
          <Modal.Title>
            {action === "CREATE" ? "Create new user" : "Update a user"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content-body row">
            <div className="col-12 col-sm-6 form-group mb-2">
              <label htmlFor="email">
                Email address: <span className="red">(*)</span>
              </label>
              <input
                type="email"
                id="email"
                disabled={action === "CREATE" ? false : true}
                className={classNames("form-control", {
                  "is-invalid": !objectCheckInput.email,
                })}
                onChange={handleOnChange("email")}
                value={userData.email || ""}
              />
            </div>
            <div className="col-12 col-sm-6 form-group mb-2">
              <label htmlFor="phone">
                Phone number: <span className="red">(*)</span>
              </label>
              <input
                type="text"
                id="phone"
                disabled={action === "CREATE" ? false : true}
                onChange={handleOnChange("phone")}
                className={classNames("form-control", {
                  "is-invalid": !objectCheckInput.phone,
                })}
                value={userData.phone || ""}
              />
            </div>
            <div className="col-12 col-sm-6 form-group mb-2">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="form-control"
                onChange={handleOnChange("username")}
                value={userData.username || ""}
              />
            </div>
            <div className="col-12 col-sm-6 form-group mb-2">
              {action === "CREATE" && (
                <>
                  <label htmlFor="password">
                    Password: <span className="red">(*)</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={handleOnChange("password")}
                    className={classNames("form-control", {
                      "is-invalid": !objectCheckInput.password,
                    })}
                    value={userData.password || ""}
                  />
                </>
              )}
            </div>
            <div className="col-12 form-group mb-2">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                onChange={handleOnChange("address")}
                value={userData.address || ""}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                className="form-select"
                onChange={handleOnChange("sex")}
                value={userData.sex || ""}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="group">
                Group: <span className="red">(*)</span>
              </label>
              <select
                id="group"
                className="form-select"
                onChange={handleOnChange("group")}
                value={userData.group || ""}
              >
                {listGroup &&
                  listGroup.length > 0 &&
                  listGroup.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOnHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUser;
