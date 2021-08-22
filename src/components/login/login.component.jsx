import { SERVER_URL, LOGIN_PATH } from "../../constants/cars.constant";
import CarList from "../car-list/car-list.component";
import "./login.styles.css";

import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [isAuthenticated, setAuth] = useState(false);

  const authenticateToServer = () => {
    axios({
      method: "post",
      url: SERVER_URL + LOGIN_PATH,
      data: user,
    })
      .then((response) => {
        console.log(response);
        const jwtToken = response.headers.authorization;
        // save the token to session storage browser
        console.log(jwtToken);
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch((error) => {
        console.log("Message = " + error);
        toast.warn("Check the username and password", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  const login = () => {
    authenticateToServer();
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    setAuth(false);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  if (isAuthenticated === true) {
    return <CarList logout={logout} />;
  } else {
    return (
      <div className="login-container">
        <TextField name="username" label="Username" onChange={handleChange} />
        <br />
        <br />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="outlined" color="primary" onClick={login}>
          Login
        </Button>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default Login;
