import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateView = ({handleSubmit}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  return (
    <>
    
        <h4>Update your Profile</h4>
        <Form onSubmit={ (e) => handleSubmit(e)}>
            <Form.Group>
                <Form.Label className="m-1">Username</Form.Label>
                <Form.Control
                    type = "text"
                    value = {username}
                    onChange = {(e)=>{setUsername(e.target.value)}} 
                />
                    
            </Form.Group>
            <Form.Group>
                <Form.Label className="m-1">Email</Form.Label>
                <Form.Control
                    type = "text"
                    value = {email}
                    onChange = {(e)=>{setEmail(e.target.value)}} 
                />
                
            </Form.Group>
            <Form.Group>
                <Form.Label className="m-1">Password</Form.Label>
                <Form.Control
                    type = "password"
                    value = {password}
                    onChange = {(e)=>{setPassword(e.target.value)}} 
                    min = "8"
                />
                
            </Form.Group>
            <Form.Group>
                <Form.Label className="m-1">Birthday</Form.Label>
                <Form.Control
                    type = "date"
                    value = {birthdate}
                    onChange = {(e)=>{setBirthdate(e.target.value)}} 
                />
                
            </Form.Group>
            <Button type="submit" variant="info" className ="mt-2">Update</Button>
        </Form>
    </>
)
}

  /* const handleSubmit = (event) => {
    
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://myflix-api-3dxz.onrender.com/users/", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Update successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

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
      <Form.Group controlId="Password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="Email-">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">Update User Info</Button>
    </Form>
  );
}; */