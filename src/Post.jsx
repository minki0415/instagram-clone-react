import React from 'react'
import classes from './Post.module.css'
import { Avatar } from '@material-ui/core'

function Post() {
  return (
    <div className={classes.post}>
      <div className={classes.post__header}>        
        <Avatar
          className={classes.post__avatar}
          alt='mimamong_ki'
          src="/static/images/avatar/1.jpg"
        />
        <h3>Username</h3>
      </div>
        {/* header -> avatar +username */}

      <img 
          className={classes.post__image} 
          src="https://placeimg.com/300/300/animal"
          alt="" 
      />

        <h4 className={classes.post__text}><strong>mimamong_ki</strong> WoW Amazing!</h4>
    </div>
  )
}

export default Post