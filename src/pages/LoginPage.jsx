import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LoginImage from "assets/img/loginImg.png";
import Logo from "assets/img/Logo.png";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  const [selectTab, setSelectTab] = useState();
  useEffect(() => {
    setSelectTab("email");
  }, []);
  return (
    <main className="login">
      <form onSubmit={loginUser}>
        <h1>Login</h1>
        <div className="tabs">
          <button onClick={() => setSelectTab("email")} className={selectTab === "email" ? "active" : ""}>
            Email
          </button>
          <button onClick={() => setSelectTab("phone")} className={selectTab === "phone" ? "active" : ""}>
            Phone number
          </button>
        </div>
        {selectTab === "email" && (
          <div className="email-login">
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter password" />
            </div>
            <Link to="#" className="forget">
              Forgot password
            </Link>
            <button type="submit">Login</button>
            <p>Don’t have account?</p>
            <Link to="/register" className="go-to-register">
              Register
            </Link>{" "}
          </div>
        )}
        {selectTab === "phone" && "Phone"}
      </form>
      <div className="images">
        <img src={LoginImage} alt="Login" />
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    </main>
  );
};

export default LoginPage;
