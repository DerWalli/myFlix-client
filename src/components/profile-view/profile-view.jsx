import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { Button, Container, Form, Row, Col, } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({ user, movies, updateUserState }) => {
    const storedToken = localStorage.getItem("token");
    
    
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

     const favoriteMovieList = movies.filter((m) => {
           return user.Favorites.includes(m.id);
    })

    const handleSubmit = (event) => {
      event.preventDefault();  
  
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      };
  
      fetch("https://myflix-api-3dxz.onrender.com/users/"+user.Username, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json"},
      })
        .then((response) => response.json())
        .then(data => {
          if (data) {
          alert("Changes saved");
          updateUserState(user);
          localStorage.clear();
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      });
    };
   
      const handleDeregister = () => {
        fetch("https://myflix-api-3dxz.onrender.com/users/"+user.Username, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Account successfully deleted");
            localStorage.clear();
            window.location.reload();            
          } else {
            alert("Something went wrong");
          }
        });
      };
   
      return (
      <Container>
        <Row>
          <Col>
            <div className="profile-info">
              <div className="user-info">
                <span className="label">Username: </span>
                <span className="value">{username}</span>
              </div>
              <div className="user-info">
                <span className="label">Email: </span>
                <span className="value">{email}</span>
              </div>
              <div className="user-info">
                <span className="label">Birthday: </span>
                <span className="value">{moment(birthday).format("YYYY-MM-DD")}</span>
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
                placeholder={user}
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                type="text"
                placeholder="Your email id"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                type="date"
                placeholder="Your birthday"
                defaultValue={moment(birthday).format("YYYY-MM-DD")}
                onChange={e => setBirthday(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="button-primary">Save Changes</Button>
            </Form>
            <Button onClick={() => handleDeregister(/*user._id*/)} className="button-delete" type="submit" variant="danger" >Delete Account</Button>
          </Col>
          </Row>
          <Row>
            <h1>Favs: </h1>
            {  favoriteMovieList.length <= 0 ? (
                  <Col>No Favorite Movies Yet!</Col>
                ) : (
                  <>
                    {favoriteMovieList.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
          </Row>
      </Container>
      );
    };