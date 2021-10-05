import React from 'react'
import {Button} from 'react-bootstrap'
import styles from '../css/LikeDislikeContainer.module.css'
import { useHistory } from 'react-router-dom'


function LikeDislikeContainer({retrieveOnReload, saveSelectedUser, randomiseUser}) {
        let history = useHistory();

        function handleClick() {
            saveSelectedUser()
            
            history.push("/quiz")
        }
    return(
        <div className={styles.likedislikecontainer}>
            <Button onClick={() => randomiseUser()} variant="danger">👎</Button>
            <Button onClick={handleClick} variant="success">👍</Button>
            
        </div>
    )
}


export default LikeDislikeContainer