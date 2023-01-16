import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (event) => {
    
    event.preventDefault(); 
  
    const data = {
      Username: username,
      Password: password
    };
 
    fetch("https://myflix-api-3dxz.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user.Username));
          localStorage.setItem("token", data.token);
          setUsername(data.user.Username)
          onLoggedIn(username, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.log(e)
        alert("Something went wrong");
      });
    }
  
  return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
          type="text"
          value= {username}
          onChange={(e) => setUsername(e.target.value)}
           />
        </label>
        <label>
          Password:
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };