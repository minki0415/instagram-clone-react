import { Modal, makeStyles, Button, Input } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import classes from './App.module.css'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top:`${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor : theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const modalClasses = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://react-instagram-clone-4341d-default-rtdb.firebaseio.com/posts.json");

      // console.log(response.ok);

      const responseData = await response.json();
      // console.log(responseData);

      const postsData = [];
      for (const key in responseData) {
        postsData.push({
          id:key,
          caption: responseData[key].caption,
          imageUrl: responseData[key].imageUrl,
          username: responseData[key].username,
        });
      }
      // console.log(postsData);
      setPosts(postsData);
    };

    fetchPosts().catch(error => console.log(error));
  }, []);

  const signUp = (event) => {

  }

  return (
    <div className={classes.app}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
          <div style={modalClasses.modalStyle} className={modalClasses.paper}>
            <form>

              <center>
                <img
                  className={classes.app__headerImage}
                  src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
                  alt='instagram logo'
                />
              </center>

              <Input
                type="text"
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signUp}>Sign Up</Button>
            </form>
          </div>
      </Modal>

      <div className={classes.app__header}>
        <img
          className={classes.app__headerImage}
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png'
          alt='instagram logo'
        />
      </div>

      <Button onClick={() => setOpen(true)}>Sign up</Button>

      {
        posts.map(post => (
          <Post key={post.id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    </div>
  );
}

export default App;