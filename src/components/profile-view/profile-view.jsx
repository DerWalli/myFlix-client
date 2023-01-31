import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({ user, movies }) => {
    // Martin: Lot of cleanup needed, I think we can do it together, this part!
    const storedToken = localStorage.getItem("token");
    const storedMovies = localStorage.getItem("movies");
    const storedId = localStorage.getItem("UId");
    const storedUser = localStorage.getItem("user");
    
    
    const [allMovies] = useState(storedMovies ? storedMovies: movies);
    const [token] = useState(storedToken ? storedToken : null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const storedFav = localStorage.getItem("favorites");
    //const [user, setUser] = useState(storedUser ? storedUser : null);
    const [filteredMovies, setFilteredMovies] = useState(allMovies);
    let hasMovieId = localStorage.getItem("favorites");


    

     const favoriteMovieList = movies.filter((m) => {
           return storedFav.includes(m.id);
           /*storedFav.includes(m.id);*/

    })
  

   
    const updateUser = (user) => {
        fetch("https://myflix-api-3dxz.onrender.com/users/"+cleanUser, {
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
   
        fetch("https://myflix-api-3dxz.onrender.com/users/"+cleanUser, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"},
        })
          .then((response) => {
            if (response.ok) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Changes saved");
            updateUser(user);
            localStorage.clear();
            window.location.reload();
          } else {
            alert("Something went wrong");
          }
          });
      };
   
      const handleDeregister = () => {
        fetch("https://myflix-api-3dxz.onrender.com/users/"+cleanId, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
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
                <span className="value">{localStorage.getItem("user")}</span>
              </div>
              <div className="user-info">
                <span className="label">Email: </span>
                <span className="value">{localStorage.getItem("email")}</span>
              </div>
              <div className="user-info">
                <span className="label">Birthday: </span>
                <span className="value">{localStorage.getItem("birthday")}</span>
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
                placeholder={localStorage.getItem("email")}
                value={email}
                onChange={e => setEmail(e.target.value)}
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