import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@mui/material/Modal';
import { Avatar, Button, Input } from '@material-ui/core';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import ImageUpload from './ImageUpload';

// ------------------------------------------------------------

// Modal Style 관련
const getModalStyle= () => {
  const top = 50;
  const left = 50;

  return ({
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  });
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// --------------------------------------------------------------


const App = () => {

  // ----------------------------------------------------------

  // firebase 관련
  const [posts, setPosts] = useState([]);
  
  // useEffect : Runs a piece of code based on a specific condition
  useEffect(() => {
    
    const unsub = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
      
    });
  }, []);
  console.log(posts)
  
  // -------------------------------------------------------------
  
  // Modal style 관련
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ------------------------------------------------------------

  // Login 여부 관련
  const [user, setUser] = useState(null);  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {

      if (authUser) {
        // user has logged in...
        setUser(authUser);
        console.log(authUser);
      } else {
        // user has logged out...
        setUser(null)
      }

    });

    return () => {
      // perform some clean up action
      unsubscribe();
    };

  }, [user, username]);


  // --------------------------------------------------------------

  // Sign up Modal 관련
  const [open, setOpen] = useState(false);  
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const signUp = async (event) => {

    // refresh 방지
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      return (updateProfile(authUser.user, {
        displayName: username
      }))      
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  };
 

  // ----------------------------------------------------------

  // Sign In Modal 관련 부분  
  const [openSignIn, setOpenSignIn] = useState('');

  const signIn = (event) => {
    // Refresh 방지
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  // -----------------------------------------------------------

  return (    

    <div className="app">

      {/* SignUp Modal (회원가입 Modal)*/}
      <Modal
        open={open}
        onClose={() => {setOpen(false)}}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img 
                className='app__headerImage'
                src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt="" 
              />
            </center>

            <Input 
              placeholder="username"
              type="text"
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
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit' onClick={signUp}>회원가입</Button>
          </form>

        </div>
      </Modal>

      {/* SignIn Modal (로그인 Modal)*/}
      <Modal
        open={openSignIn}
        onClose={() => {setOpenSignIn(false)}}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img 
                className='app__headerImage'
                src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                alt="" 
              />
            </center>

            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit' onClick={signIn}>로그인</Button>
          </form>

        </div>
      </Modal>


      {/* Header */}
      <div className='app__header'>
        
        <img 
          className='app__headerImage'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt=''
        />

        {/* Signin Signup Logout Button */}
        {user ? (
          <Button onClick={() => signOut(auth)}>로그아웃</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>로그인</Button>
            <Button onClick={() => setOpen(true)}>회원가입</Button>
          </div>
        )}

      </div>



      {/* <h1>React를 이용한 인스타그램 따라하기🚀!</h1> */}



      {/* Posts */}
      <div className="app__posts">
        <div className="app__postsLeft">

          {/* 1. 하드코딩 */}
          {/* <Post username='wooooo_ji94' caption='인스타 따라하기 시작!' imageUrl='https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png' />
          <Post username='minkibbb' caption='안뇽~~~' imageUrl='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*'/>
          <Post username='amaanth' caption='보고시펑!' imageUrl='https://newsimg.sedaily.com/2021/04/21/22L657OAYV_1.jpg'/> */}
          
          {/* 2. useState 이용 */}
          {
            posts.map(({id, post}) => (
              <Post 
                key={id} 
                postId={id}
                user={user}
                username={post.username} 
                caption={post.caption} 
                imageUrl={post.imageUrl}
              />
            ))
          }

        </div>

        {user?.displayName ? (
          <div className="app__postsRight">
            <div className='app__postsRight__header'>
              <Avatar
                className='app__postsRight__header__avatar'
                src="/static/images/avatar/1.jpg"
              />
              <h2>{user.displayName}</h2>
            </div>
            <div className='app__postsRight__body'>
              <h4>회원님을 위한 추천</h4>
              <ul className='app__postsRight__body__content'>
                <li>
                  <Avatar
                    className='app__postsRight__body__avatar'
                    src="/static/images/avatar/1.jpg"
                  />
                  <h5>cristiano</h5>
                  <h6>팔로우</h6>
                </li>
                <li>
                  <Avatar
                    className='app__postsRight__body__avatar'
                    src="/static/images/avatar/1.jpg"
                  />
                  <h5>leomessi</h5>
                  <h6>팔로우</h6>
                </li>
                <li>
                  <Avatar
                    className='app__postsRight__body__avatar'
                    src="/static/images/avatar/1.jpg"
                  />
                  <h5>beyonce </h5>
                  <h6>팔로우</h6>
                </li>
              </ul>
            </div>
            <div className='app__postsRight__footer'>
              <h6>소개 도움말 홍보 센터 API 채용 정보</h6>
              <h6>개인정보처리방침 약관 위치 인기계정 해시태그 언어</h6>
              <h6>© 2022 INSTAGRAM FROM META</h6>
            </div>
          </div>
        ) : (
        <div/>
        )}

      </div>      



      {/* ImageUpload (게시물 올리기)*/}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <div className="app_imageUpload__no">
          <h3>죄송합니다. 업로드를 하기위해서는 로그인해주세요.</h3>
        </div>
      )}


    </div>
  );
}

export default App;