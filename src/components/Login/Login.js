import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import classNames from "classnames";
import { UserContext } from "../../context/UserContext";
export default function Login() {
  const { loginContext, user } = useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    valueLogin: "",
    password: "",
  });
  const defaultValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleOnChange = (name) => (e) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };
  const isValidInputs = () => {
    setObjectCheckInput(defaultValidInput);
    if (!formData.valueLogin) {
      toast.error("Email or phone is required");
      setObjectCheckInput({ ...defaultValidInput, isValidValueLogin: false });
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      setObjectCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    return true;
  };
  const handleNavigateRegister = () => {
    navigate("/register");
  };
  const handleLogin = async () => {
    const check = isValidInputs();
    if (check) {
      const res = await loginUser(formData);
      if (res && +res.EC === 0) {
        const groupWithRoles = res.DT.groupWithRoles;
        let email = res.DT.email;
        let username = res.DT.username;
        let token = res.DT.access_token;
        const data = {
          isAuthenticated: true,
          token: token,
          account: {
            groupWithRoles,
            email,
            username,
          },
        };
        loginContext(data);
        localStorage.setItem("jwt", token);
        // sessionStorage.setItem("account", JSON.stringify(data));
        navigate("/users");
      }
      if (res && +res.EC !== 0) {
        toast.error(res.EM);
      }
    }
  };
  const handlePressEnter = (e) => {
    if (e.key === "Enter" && e.keyCode === 13) {
      handleLogin();
    }
  };
  const handleNavigateHomePage = () => {
    navigate("/");
  };
  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="left col-12 col-md-7">
            <div className="brand fw-bold mb-3 text-center text-md-start">
              <Link to="/"> Duc Ba IT</Link>
            </div>
            <p className="description fw-normal text-center text-md-start">
              Duc ba IT helps you connect and share with the people in your life
            </p>
          </div>
          <div className="right col-12 col-md-5">
            <div className="flex flex-col p-3">
              <input
                type="text"
                className={classNames("form-control px-2 py-3 mb-3", {
                  "is-invalid": !objectCheckInput.isValidValueLogin,
                })}
                placeholder="Email address or phone number"
                value={formData.valueLogin}
                onChange={handleOnChange("valueLogin")}
              />
              <input
                type="password"
                className={classNames("form-control px-2 py-3 mb-3", {
                  "is-invalid": !objectCheckInput.isValidPassword,
                })}
                placeholder="Password"
                value={formData.password}
                onChange={handleOnChange("password")}
                onKeyDown={handlePressEnter}
              />
              <button
                className="w-100 btn-login btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
              <div className="text-center wrap-forgot-password mb-4">
                <Link className="forgot-password" to="#">
                  Forgot your password
                </Link>
              </div>
              <hr />
              <div className="text-center">
                <button
                  className="btn btn-success btn-create-account py-2 px-4 my-3"
                  onClick={handleNavigateRegister}
                >
                  Create new account
                </button>
                <div className="mt-3 return" onClick={handleNavigateHomePage}>
                  <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                  <span>Return to home page</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
