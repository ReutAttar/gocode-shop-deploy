import React, { useState } from "react";
import "./LoginPopup.css";
import { CloseOutlined } from "@ant-design/icons";
// import AdminContext from "../../contexts/AdminContext";

const LoginPopup = ({ setAdmin, closePopup }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [admin, setAdmin] = useContext(AdminContext);

  const login = async (email, password, close) => {
    const res = await fetch("/api/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await res.json();
    if (data) {
      if (data.errorMessage) {
        setErrorMessage(data.errorMessage);
        setIsError(true);
      } else {
        setAdmin(true);
        setIsError(false);
        setTimeout(close(), 60000);
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup_inner">
        <button className="close" onClick={closePopup}>
          <CloseOutlined />
        </button>
        <div className="login">
          <h1>Login As Admin</h1>
          <div>
            <input
              type="text"
              name="Email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="submitDiv">
              <button
                className="submit"
                onClick={() => {
                  login(inputEmail, inputPassword, closePopup);
                  //   setInputEmail("");
                  //   setInputPassword("");
                }}
              >
                Login
              </button>
            </div>
            {isError && <h3 style={{ color: "red" }}>{errorMessage}</h3>}
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default LoginPopup;
