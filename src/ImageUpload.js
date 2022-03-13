import { Button } from '@material-ui/core';
import { getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import React, { useState } from 'react'
import { storage, db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import './ImageUpload.css'

const ImageUpload = ({username}) => {

    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    };

    const handleUpload = () => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        // console.log(image.name);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error function...
                console.log(error);
                alert(error.message)
            },
            () => {
                // complete funtion...
                getDownloadURL(uploadTask.snapshot.ref)
                .then(async url => {
                    // post image inside db
                    await addDoc(collection(db, "posts"), {
                        timestamp: serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username,
                    });

                    // console.log(docRefAdd);
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
                
            }
        )

    };


  return (
    <div className='imageupload'> 

        {/* Progress (진행창) */}
        <progress 
            className='imageupload__progress'
            value={progress} 
            max="100" 
        />
        
        {/* Caption input (글쓰는 창)*/}
        <input 
            type="text" 
            placeholder='텍스트를 입력하세요.' 
            onChange={event => setCaption(event.target.value)} 
            value={caption} 
        />

        {/* File picker (내컴퓨터에서 이미지 불러와서 넣기)*/}
        <input 
            type="file" 
            onChange={handleChange} 
        />

        {/* Post button (포스팅 버튼)*/}
        <Button onClick={handleUpload}>
            Upload
        </Button>
    </div>
  )
}

export default ImageUpload