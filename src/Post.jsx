import React from 'react'
import classes from './Post.module.css'
import { Avatar } from '@material-ui/core'

function Post(props) {
  return (
    <div className={classes.post}>
      <div className={classes.post__header}>        
        <Avatar
          className={classes.post__avatar}
          alt='mimamong_ki'
          src="/static/images/avatar/1.jpg"
        />
        <h3>{props.username}</h3>
      </div>
        {/* header -> avatar +username */}

      <img 
          className={classes.post__image} 
          src={props.imageUrl}
          alt="Post image" 
      />

        <h4 className={classes.post__text}><strong>{props.username}</strong>  {props.caption}</h4>
    </div>
  )
}

export default Post