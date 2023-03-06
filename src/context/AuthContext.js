import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { api, auth } from "api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const localItem = localStorage.getItem("authToken");
  const [user, setUser] = useState(localItem || null);
  const [authToken, setauthToken] = useState(localItem || null);

  console.log(authToken);
  let loginUser = async (e) => {
    e.preventDefault();

    let response = await auth().post("/login", { email: "rahil.eliyev@gmail.com", password: "123456" });
    if (response.status === 200) {
      setauthToken(response.data.token);
      setUser(response.data);
      localStorage.setItem("authToken", JSON.stringify(response.data.token));
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  };

  let logoutUser = async () => {
    // setauthToken(null);
    // setUser(null);
    // localStorage.removeItem("authToken");
    // navigate("/login");
    // let response = await fetch(`http://127.0.0.1:8000/api/logout/`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + authToken,
    //   },
    // });
    await api.post("/logout");
  };

  // let updateToken = async () => {
  //   let response = await fetch("https://fakestoreapi.com/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refresh: "authToken.refresh" }),
  //   });
  //   let data = await response.json();
  //   if (response.status === 200) {
  //     setauthToken(data);
  //     setUser(jwt_decode(data.token));
  //     localStorage.setItem("authToken", JSON.stringify(data));
  //   } else {
  //     logoutUser();
  //   }
  // };
  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (authToken) {
  //       updateToken();
  //     } else {
  //       clearInterval(interval);
  //     }
  //   });
  //   /* eslint-disable react-hooks/exhaustive-deps */
  // }, [authToken, loading]);

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
