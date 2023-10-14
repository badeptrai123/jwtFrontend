import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Nav.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.svg";
import { logout } from "../../services/userService";
import { toast } from "react-toastify";

export default function NavHeader() {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logout();
    localStorage.removeItem("jwt");
    logoutContext();
    if (res && +res.EC === 0) {
      toast.success("Logout succeed...");
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      {(user && user.isAuthenticated) || location.pathname === "/" ? (
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="/">
                <img src={logo} width="20" height="20" alt="" />
                <span className="title">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink className="nav-link" to="/" exact="true">
                    Home
                  </NavLink>
                  {user && user.isAuthenticated && (
                    <>
                      <NavLink className="nav-link" to="/users">
                        User
                      </NavLink>
                      <NavLink className="nav-link" to="/roles">
                        Roles
                      </NavLink>
                      <NavLink className="nav-link" to="/group-role">
                        Group-Role
                      </NavLink>
                    </>
                  )}
                </Nav>
                <Nav>
                  {user && user.isAuthenticated ? (
                    <>
                      <Nav.Link>Welcome {user.account.username} !</Nav.Link>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>
                          <span onClick={handleLogout}>Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
