import { useEffect, useState } from "react";
import "./Users.scss";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import ModalDelete from "./ModalDelete";
import { toast } from "react-toastify";
import ModalUser from "./ModalUser";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Users() {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [userDelete, setUserDelete] = useState({});
  const [action, setAction] = useState("");
  const [dataModalUser, setDataModalUser] = useState({});

  const { user } = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    fetchAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchAllUser = async () => {
    const res = await getAllUser(currentPage, currentLimit);
    if (res && res.EC === 0) {
      setTotalPages(res.DT.totalPages);
      setListUser(res.DT.users);
    }
  };
  const handlePageClick = (e) => {
    setCurrentPage(+e.selected + 1);
  };
  const handleDeleteUser = (user) => {
    setIsShowDelete(true);
    setUserDelete(user);
  };
  const handleClose = () => {
    setIsShowDelete(false);
  };
  const handleConfirmDelete = async () => {
    let res = await deleteUser(userDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      await fetchAllUser();
      setIsShowDelete(false);
    } else {
      toast.error(res.EM);
    }
  };
  const onHide = async () => {
    setIsShowModal(false);
    setDataModalUser({});
    await fetchAllUser();
  };
  const handleAddUser = () => {
    setIsShowModal(true);
    setAction("CREATE");
  };
  const handleEditUser = (user) => {
    setIsShowModal(true);
    setAction("UPDATE");
    setDataModalUser(user);
  };
  const handleRefresh = async () => {
    await fetchAllUser();
  };
  return (
    <>
      <div className="container">
        <div className="user-header">
          <div className="title mt-4">
            <h3>Manage Users</h3>
          </div>
          <div className="actions">
            <button className="btn btn-success" onClick={handleRefresh}>
              <i className="fa fa-refresh" aria-hidden="true"></i>
              <span className="px-2">Refresh</span>
            </button>
            <button className="btn btn-primary mx-2" onClick={handleAddUser}>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              <span className="px-2">Add new user</span>
            </button>
          </div>
        </div>
        <div className="user-body">
          <table className="table mt-3 table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Group</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUser && listUser.length > 0 ? (
                listUser.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">
                        {(currentPage - 1) * currentLimit + index + 1}
                      </th>
                      <th>{item.id}</th>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.Group ? item.Group.name : ""}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          style={{ color: "#fff", marginRight: "10px" }}
                          onClick={() => handleEditUser(item)}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ color: "#fff" }}
                          onClick={() => handleDeleteUser(item)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <span>Not found user</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="user-footer">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
      <ModalDelete
        isShowDelete={isShowDelete}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        userDelete={userDelete}
      />
      <ModalUser
        isShowModal={isShowModal}
        onHide={onHide}
        action={action}
        dataModalUser={dataModalUser}
      />
    </>
  );
}
