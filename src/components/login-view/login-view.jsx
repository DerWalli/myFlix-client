import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import React from "react";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favorites, setFavorites] = useState("");
 
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
          localStorage.setItem("favorites", JSON.stringify(data.user.Favorites));
          localStorage.setItem("user", JSON.stringify(data.user.Username));
          localStorage.setItem("token", data.token);
          console.log("data.user.Favorites: ", data.user.Favorites);
          setFavorites(data.user.Favorites);
          console.log("favs:", favorites);
          setUsername(data.user.Username);
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="1"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  );
};