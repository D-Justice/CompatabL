import React from 'react'
import { Card, Form, Button, Row, Label, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Profile from './Profile'


export default function ProfileBar({ user, activities = [] }) {
    const { favouriteActivities = []} = user
    
    return (
        <div>
            <Image src={user.profilePicture} rounded style={{ border: '3px solid black', maxWidth: '400px' }} />
            <div style={{backgroundColor: 'red'}}>                        
                <Card bg={'dark'} text={'light'} style={{}}>
                <Card.Body as='h3'>{user.username}</Card.Body>
                <hr />
                <Card.Body>
                <>
                <b>Bio:</b><br/>
                {user.userBio}<br /><hr/>
                Age: {user.age} <br/>
                Gender: {user.gender} <br />
                Favourite Activities: 
                <ul style={{listStyle: 'none', marginLeft: '40%'}}>
                {favouriteActivities.map((each, index) => {
                    return <li style={{textAlign: 'left'}}>- {each}</li>
                })}
                </ul>
                </>
                </Card.Body>
                
                
            </Card>
            </div>

        </div>
    )
}
