import { Button } from '@material-ui/core'
import { dblClick } from '@testing-library/user-event/dist/click';
import React, { useState } from 'react'
import { storage, db } from "./firebase;"
import classes from './ImageUpload.module.css'

function ImageUpload(props) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snampshot) => {
                //progress function...
                const progress = Math.round(
                    (snampshot.bytesTransgerred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        dblClick.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        );
    };
  return (
    <div className={classes.imageupload}>
        <progress value={progress} max="100"/>
        <input type="text" placeholder='Enter a caption..' onChange={event => setCaption(event.target.value)} value={caption} />
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>
            Upload
        </Button>
    </div>
  )
}

export default ImageUpload