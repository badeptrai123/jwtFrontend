import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import classnames from "classnames";
import { registerNewUser } from "../../services/userService";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);
  const handleOnChange = (name) => (e) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };
  const isValidInputs = () => {
    setObjectCheckInput(defaultValidInput);
    if (!formData.email) {
      toast.error("Email is required");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(formData.email)) {
      toast.error("Please enter the valid email address");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!formData.phone) {
      toast.error("Phone is required");
      setObjectCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      setObjectCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (!formData.confirm_password) {
      toast.error("Confirm Password is required");
      return false;
    }
    if (formData.password !== formData.confirm_password) {
      toast.error("Your password is not the same");
      setObjectCheckInput({
        ...objectCheckInput,
        isValidConfirmPassword: false,
      });
      return false;
    }

    return true;
  };
  const handleRegister = async () => {
    let check = isValidInputs();
    if (check) {
      const res = await registerNewUser(formData);
      if (+res.EC === 0) {
        toast.success(res.EM);
        navigate("/login");
      } else {
        toast.error(res.EM);
      }
    }
  };
  const handlePressEnter = (e) => {
    if (e.key === "Enter" && e.keyCode === 13) {
      handleRegister();
    }
  };
  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleNavigateHomePage = () => {
    navigate("/");
  };
  return (
    <div className="register-container d-flex justify-content-center align-items-center">
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
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={classnames("form-control px-2 py-3 mb-3", {
                    "is-invalid": !objectCheckInput.isValidEmail,
                  })}
                  id="email"
                  value={formData.email}
                  onChange={handleOnChange("email")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone number
                </label>
                <input
                  type="text"
                  className={classnames("form-control px-2 py-3 mb-3", {
                    "is-invalid": !objectCheckInput.isValidPhone,
                  })}
                  id="phone"
                  value={formData.phone}
                  onChange={handleOnChange("phone")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control px-2 py-3 mb-3"
                  id="username"
                  value={formData.username}
                  onChange={handleOnChange("username")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={classnames("form-control px-2 py-3 mb-3", {
                    "is-invalid": !objectCheckInput.isValidPassword,
                  })}
                  id="password"
                  value={formData.password}
                  onChange={handleOnChange("password")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className={classnames("form-control px-2 py-3 mb-3", {
                    "is-invalid": !objectCheckInput.isValidConfirmPassword,
                  })}
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleOnChange("confirm_password")}
                  onKeyDown={handlePressEnter}
                />
              </div>
              <button
                className="w-100 btn-register btn btn-primary mb-1"
                onClick={handleRegister}
              >
                Register
              </button>
              <hr />
              <div className="text-center">
                <span>Have an account? </span>
                <Link className="" to="/login">
                  Login
                </Link>
              </div>
              <div className="mt-3 return" onClick={handleNavigateHomePage}>
                <i class="fa fa-arrow-circle-left" aria-hidden="true"></i>
                <span>Return to home page</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
