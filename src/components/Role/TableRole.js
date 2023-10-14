import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { deleteRole, getAllRole } from "../../services/roleService";
import ModalDeleteRole from "./ModalDeleteRole";
import { toast } from "react-toastify";
import ModalUpdateRole from "./ModalUpdateRole";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [roleDelete, setRoleDelete] = useState({});
  const [dataModalRole, setDataModalRole] = useState({});

  useEffect(() => {
    fetchAllRole();
  }, []);

  useImperativeHandle(ref, () => ({
    refreshAllRole() {
      fetchAllRole();
    },
  }));

  const fetchAllRole = async () => {
    const res = await getAllRole();
    if (res && res.EC === 0) {
      setListRoles(res.DT);
    }
  };
  const handleClose = () => {
    setIsShowDelete(false);
  };
  const handleDeleteRole = (role) => {
    setIsShowDelete(true);
    setRoleDelete(role);
  };
  const handleConfirmDelete = async () => {
    let res = await deleteRole(roleDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      await fetchAllRole();
      setIsShowDelete(false);
    } else {
      toast.error(res.EM);
    }
  };
  const handleEditRole = (role) => {
    setIsShowModal(true);
    setDataModalRole(role);
  };
  const onHide = async () => {
    setIsShowModal(false);
    await fetchAllRole();
  };
  return (
    <div>
      <table className="table mt-3 table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Id</th>
            <th scope="col">URL</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ? (
            listRoles.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.url}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ color: "#fff", marginRight: "10px" }}
                      onClick={() => handleEditRole(item)}
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ color: "#fff" }}
                      onClick={() => handleDeleteRole(item)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <span>Not found roles</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalDeleteRole
        isShowDelete={isShowDelete}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        roleDelete={roleDelete}
      />
      <ModalUpdateRole
        isShowModal={isShowModal}
        onHide={onHide}
        dataModalRole={dataModalRole}
      />
    </div>
  );
});

export default TableRole;
