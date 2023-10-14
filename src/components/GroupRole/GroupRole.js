import { useState, useEffect } from "react";
import "./GroupRole.scss";
import { getAllGroup } from "../../services/userService";
import { toast } from "react-toastify";
import {
  assignRoleToGroup,
  getAllRole,
  getRoleByGroup,
} from "../../services/roleService";
import _ from "lodash";

export default function GroupRole() {
  const [listGroup, setListGroup] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  const [assignRoleByGroup, setAssignRoleByGroup] = useState([]);
  useEffect(() => {
    fetAllGroup();
    fetAllRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetAllGroup = async () => {
    let res = await getAllGroup();
    if (res && +res.EC === 0) {
      setListGroup(res.DT);
    } else {
      toast.error(res.EM);
    }
  };
  const fetAllRole = async () => {
    let res = await getAllRole();
    if (res && +res.EC === 0) {
      setListRole(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnChangeGroup = async (e) => {
    const value = e.target.value;
    setSelectGroup(value);
    if (value) {
      let data = await getRoleByGroup(value);
      let result = buildDataRoleByGroup(data.DT.Roles, listRole);
      setAssignRoleByGroup(result);
    }
  };
  const buildDataRoleByGroup = (listRoleByGroup, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        const object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isChecked = false;
        if (listRoleByGroup && listRoleByGroup.length > 0) {
          object.isChecked = listRoleByGroup.some(
            (item) => item.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };
  const handleChangeSelectRole = (e) => {
    const value = e.target.value;
    const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup);
    const findIndex = _assignRoleByGroup.findIndex(
      (role) => +role.id === +value
    );
    if (findIndex > -1) {
      _assignRoleByGroup[findIndex].isChecked =
        !_assignRoleByGroup[findIndex].isChecked;
    }
    setAssignRoleByGroup(_assignRoleByGroup);
  };
  const buildDataToSave = () => {
    let result = {};
    let roleChecks = assignRoleByGroup.filter((role) => role.isChecked);
    let groupRoleToSave = roleChecks.map((item) => {
      let data = { groupId: selectGroup, roleId: item.id };
      return data;
    });
    result.groupId = +selectGroup;
    result.groupRoles = groupRoleToSave;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRoleToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="group-role-container">
      <div className="container">
        <div className="mt-3">
          <h4>Group Role:</h4>
          <div className="assign-group-role">
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="group">
                Select Group: <span className="red">(*)</span>
              </label>
              <select
                id="group"
                className="form-select mt-1"
                onChange={handleOnChangeGroup}
              >
                <option value="">Please select group</option>
                {listGroup &&
                  listGroup.length > 0 &&
                  listGroup.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
              </select>
            </div>
            <hr />
            {selectGroup && (
              <div className="roles">
                <h5>Assign Role:</h5>
                {assignRoleByGroup &&
                  assignRoleByGroup.length > 0 &&
                  assignRoleByGroup.map((role, index) => {
                    return (
                      <div className="form-check" key={role.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={role.id}
                          id={`list-role-${index}`}
                          checked={role.isChecked}
                          onChange={handleChangeSelectRole}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`list-role-${index}`}
                        >
                          {role.url}
                        </label>
                      </div>
                    );
                  })}
                <div className="mt-3">
                  <button className="btn btn-warning" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
