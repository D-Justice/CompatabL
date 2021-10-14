import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Row, Label, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Profile from './Profile'
import Modal from 'react-bootstrap/Modal'


export default function ProfileBar({ updateLoggedInUser, user }) {
    console.log('user', user)
    const { activities = [] } = user
    const [show, setShow] = useState(false)
    const [wasSubmitted, setWasSubmitted] = useState(false)
    const [userObject, setUserObject] = useState(user)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    useEffect(() => {
        setUserObject(user)
    }, [user])
    const renderAge = () => {
        let oneHundredArray = [30, ...Array(100).keys()]

        return oneHundredArray.map(((each, i) => {
            if (i > 18) {
                return <option value={each}>{each}</option>
            }

        }))

    }
    const handleChange = (key, value) => {
        if (key === 'activities') {
            value = value.split(',')
            console.log(value)
        }
        
        setUserObject({...userObject, [key] : value})
        console.log('user', userObject)
        

        }
    const updateUserProfile = () => {
        fetch(`http://localhost:4000/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                age: userObject.age,
                bio: userObject.bio,
                activities: userObject.activities
            })
        })
        .then(resp => resp.json())
        .then(data => updateLoggedInUser(userObject))
    }
    console.log('userObject', userObject)
    return (
        <div>
            <Image src={userObject.photo} rounded style={{ border: '3px solid black', maxWidth: '400px' }} />
            <div style={{ backgroundColor: 'red' }}>
                <Card bg={'dark'} text={'light'} style={{}}>
                    <Card.Body as='h3'>{userObject.firstName}</Card.Body>
                    <hr />
                    <Card.Body >
                        <>
                            <b>Bio:</b><br />
                            {userObject.bio}<br /><hr />
                            Age: {userObject.age} <br />
                            Gender: {userObject.gender} <br />
                            Favourite Activities:
                            <ul style={{ listStyle: 'none', marginLeft: '40%' }}>
                                {activities.map((each, index) => {
                                    return <li style={{ textAlign: 'left' }}>- {each}</li>
                                })}
                            </ul>
                        </>
                        <Button onClick={handleShow} style={{ position: 'absolute', right: '5px', bottom: '5px', fontSize: '5px', width: '5px' }}>+</Button>
                    </Card.Body>


                </Card>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit profile information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            updateUserProfile()
                        }}>
                            <Form.Group>
                                <Form.Label column sm='2'>User Bio</Form.Label>
                                <Col sm='12'>
                                    <Form.Control onChange={(e)=> handleChange(e.target.name, e.target.value)} as='textarea' name='bio' placeholder='Enter your biography...'>{user.bio}</Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Select onChange={(e)=> handleChange(e.target.name, e.target.value)} name='age'>
                                    <option value={user.age}>{user.age}</option>
                                    {renderAge()}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Activities</Form.Label>
                                <Form.Control  onChange={(e)=> handleChange(e.target.name, e.target.value)} name='activities' ></Form.Control>
                            </Form.Group>
                            <Modal.Footer>
                            <Button onClick={handleClose} variant="secondary">Close</Button>
                            <Button type='submit' variant="primary">Save changes</Button>
                        </Modal.Footer>
                            
                        </Form>
                        
                    </Modal.Body>
                </Modal>
            </div>

        </div>
    )
}
