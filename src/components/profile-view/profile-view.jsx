import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState(storedUser ? storedUser : null);


    let favoriteMovies = movies.filter((m) =>
        console.log("x"),
          user.Favorites && user.Favorites.includes(m._id) >= 0
        );


    const updateUser = (user) => {
        fetch("https://myflix-api-3dxz.onrender.com/users/"+user, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          });
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();  
    
        const data = {
          Username: username,
          Password: password,
          Email: email,
        };
    
        fetch("https://myflix-api-3dxz.onrender.com/users/"+user, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"},
        })
        .then((response) => {
          if (response.ok) {
            alert("Changes saved");
            updateUser(user).then(() => window.location.reload());
          } else {
            alert("Something went wrong");
          }
        });
      };
    
      const handleDeregister = () => {
    
        fetch("https://myflix-api-3dxz.onrender.com/users/"+user, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Account successfully deleted");
            window.location.reload();
          } else {
            alert("Something went wrong");
          }
        });
      };
    
      return (
        console.log("log: ", user.email),
        <Row>
          <Col>
            <div className="profile-info">
              <div className="user-info">
                <span className="label">Username: </span>
                <span className="value">{user}</span>
              </div>
              <div className="user-info">
                <span className="label">Email: </span>
                <span className="value">{user.email}</span>
              </div>
              <div className="user-info">
                <span className="label">Birthday: </span>
                <span className="value">{user.birthday}</span>
              </div>
            </div>
          </Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <h2>Update info</h2>
              <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                type="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control 
                type="text" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                />
              </Form.Group>
              <Button type="submit" className="button-primary">Save Changes</Button>
            </Form>
            <Button onClick={() => handleDeregister(user._id)} className="button-delete" type="submit" variant="danger" >Delete Account</Button>
          </Col>
          <Row>
            <h1>Favs: </h1>


            {  favoriteMovies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {favoriteMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
          </Row>
        </Row>
      );
    };
          
          