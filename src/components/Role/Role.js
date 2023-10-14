import { useState } from "react";
import "./Role.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";
import { createRoles } from "../../services/userService";
import TableRole from "./TableRole";
import { useRef } from "react";
export default function Role() {
  const roleRef = useRef();
  const dataChildDefault = {
    url: "",
    description: "",
    isInvalid: true,
  };
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });
  const handleOnchangeInput = (name, value, key) => {
    const _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (name === "url" && value) {
      _listChilds[key]["isInvalid"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    setListChilds({
      ...listChilds,
      [`child - ${uuidv4()}`]: { ...dataChildDefault },
    });
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };
  const handleOnSave = async () => {
    let inValidObject = Object.entries(listChilds).find(([key, child]) => {
      return child && child.url === "";
    });
    if (!inValidObject) {
      let result = [];
      Object.entries(listChilds).find(([_, child]) => {
        result.push({
          url: child.url,
          description: child.description,
        });
      });

      let res = await createRoles(result);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        roleRef.current.refreshAllRole();
        setListChilds({
          child1: dataChildDefault,
        });
      }
    } else {
      toast.error("Input URL must not be empty");
      const _listChilds = _.cloneDeep(listChilds);
      const key = inValidObject[0];
      _listChilds[key]["isInvalid"] = false;
      setListChilds(_listChilds);
    }
  };
  return (
    <div className="role-container">
      <div className="container">
        <div className="adding-role mt-3">
          <div className="title-role">
            <h4>Add a new role</h4>
          </div>
          <div className="role-parent">
            {Object.entries(listChilds).map(([key, child], index) => (
              <div className="row role-child mb-3" key={`child ${key}`}>
                <div className={`col-5 form-group ${key}`}>
                  <label>URL:</label>
                  <input
                    type="text"
                    className={
                      child.isInvalid
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    value={child.url}
                    onChange={(e) =>
                      handleOnchangeInput("url", e.target.value, key)
                    }
                  />
                </div>
                <div className="col-5 form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={child.description}
                    onChange={(e) =>
                      handleOnchangeInput("description", e.target.value, key)
                    }
                  />
                </div>
                <div className="col-2 mt-4 actions">
                  <i
                    className="fa fa-plus-circle add"
                    onClick={handleAddNewInput}
                  ></i>
                  {index > 0 && (
                    <i
                      className="fa fa-trash-o delete"
                      onClick={() => handleDeleteInput(key)}
                    ></i>
                  )}
                </div>
              </div>
            ))}

            <div>
              <button className="btn btn-warning mt-3" onClick={handleOnSave}>
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3 table-role">
          <h4>List current Roles: </h4>
          <TableRole ref={roleRef} />
        </div>
      </div>
    </div>
  );
}
