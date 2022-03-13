import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const Post = (props) => {

  const [comments, setComments] = useState([]);  

  const postId = props.postId
  useEffect(() => {

    let unsubscribe;

    if (postId) {
      unsubscribe = onSnapshot(query(collection(doc(db, 'posts', postId), 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
  
      });
    }
    return () => {
      unsubscribe();
    };

  }, [postId]);




  const [comment, setComment] = useState('');

  const user=props.user;

  const postComment = async (event) => {
    event.preventDefault();

    const docRef = await addDoc(collection(doc(db, 'posts', postId), 'comments'), {
      text: comment,
      username: user.displayName,
      timestamp: serverTimestamp()
    });

    setComment('');   

  };



  return (
    <div className='post'>

        {/* header -> avatar + username */}
        <div className="post__header">
            <Avatar 
                className='post__avatar'
                alt='RafehQazi'
                src='/static/images/avatar/1.jpg'
            />
            <h3>{props.username}</h3>        
        </div>


        {/* image */}
        <img className='post__image' src={props.imageUrl} alt="" />


        {/* username + caption */}
        <h4 className='post__text'><strong>{props.username}</strong> {props.caption}</h4>


        {/* post comments */}
        <div className="post__comments">
          {comments.map((comment) => (
            <p>
              <b>{comment.username}</b> {comment.text}
            </p>
          ))}
        </div>


        {/* post commentBox */}
        {user && (
          <form className='post__commentBox'>
            <input 
              className='post__input'
              type="text"
              placeholder="댓글을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className='post__button'
              disabled={!comment}
              type='submit'
              onClick={postComment}
            >
              입력
            </button>
          </form>
        )}
    </div>
  )
}

export default Post