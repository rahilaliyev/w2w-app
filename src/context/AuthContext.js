import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const localItem = localStorage.getItem("authToken");
  const [user, setUser] = useState();
  const [authToken, setauthToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localItem) {
      setUser(jwt_decode(JSON.parse(localItem).token));
      setauthToken(JSON.parse(localItem));
    }
  }, [localItem]);

  let loginUser = async (e) => {
    e.preventDefault();

    let response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: e.target.username.value, password: e.target.password.value }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setauthToken(data);
      setUser(jwt_decode(data.token));
      localStorage.setItem("authToken", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = () => {
    setauthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  let updateToken = async () => {
    let response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: "authToken.refresh" }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setauthToken(data);
      setUser(jwt_decode(data.token));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };
  useEffect(() => {
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      } else {
        clearInterval(interval);
      }
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authToken, loading]);

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
