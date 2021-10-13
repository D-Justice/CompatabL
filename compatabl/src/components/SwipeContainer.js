import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import ReactCardFlip from 'react-card-flip'
import styles from '../css/SwipeContainer.module.css'


function SwipeContainer({loading, randomiseUser, photo, userInfo, userBio, activities}) {
    useEffect(() => {
        randomiseUser()
    
      }, [])
    
    const [isFlipped, setFlipped] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        setFlipped(!isFlipped)

    }
    const cleanWord = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const renderActivities = () => {
        let splitActivities = activities.join(', ')
        
        return(splitActivities)
    }

    
    let user = userInfo.results[0]
    return(
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card className={styles.img} onClick={handleClick} style={{ border: '2px solid black', margin: 'auto'}}>
                <Card.Img  src={photo} />
                <Card.Title as='h2'>{user.name.first} {user.name.last}</Card.Title>
                <Card.Text>{cleanWord(user.gender)} {user.dob.age}</Card.Text>
                <Card.Text as='small'>{renderActivities()}</Card.Text>
            </Card>
            <Card onClick={handleClick} style={{ border: '2px solid black', width: '50%', margin: 'auto'}}> 
                <Card.Title as='h1'>Biography</Card.Title>
                <Card.Text style={{fontSize: '30px'}}>{userBio}</Card.Text>
                
            </Card>
            </ReactCardFlip>
        </div>
    )
}


export default SwipeContainer