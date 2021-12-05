import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import editIcon from '../images/editIcon.png'


export default function ProfileBar({ updateMatchRemoved, updateUserProfileInfo, updateUserMatches, matchProfileUpdate, loggedInUser, userId, removeFromMatches, updateLoggedInUser, user, hideEdit }) {
    const history = useHistory()
    const { activities = [] } = user
    const [show, setShow] = useState(false)
    const [userObject, setUserObject] = useState(user)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const fallBackPhoto = 'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-0.jpg'


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
        
        setUserObject({ ...userObject, [key]: value })
        console.log('user', userObject)


    }
    const handleRemove = () => {


        // fetch(`http://localhost:4000/users/${userId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         ...loggedInUser,
        //         matches: loggedInUser.matches.filter(each => {
        //             if (user.id !== each.id) {
        //                 return each
        //             }
        //         })
        //     })
        // })
        // .then(resp => resp.json())
        // .then(data => {
        //     matchProfileUpdate(false)
        //     updateUserMatches(data.matches)
        //     updateMatchRemoved()
        //     history.push('/profile')
        // })
    }
    const updateUserProfile = () => {
        // fetch(`http://localhost:4000/users/${user.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         firstName: userObject.firstName,
        //         lastName: userObject.lastName,
        //         photo: userObject.photo,
        //         age: userObject.age,
        //         bio: userObject.bio,
        //         activities: userObject.activities,
        //         preference: userObject.preference
        //     })
        // })
        //     .then(resp => resp.json())
        //     .then(data => updateLoggedInUser(userObject))
        //     .catch(err => console.error(err))

    }
    console.log('userObject', userObject)
    return (
        <div>
            <Image src={userObject.photo} rounded style={{ border: '3px solid black', maxWidth: '400px' }} />
            <div style={{ backgroundColor: 'red' }}>
                <Card bg={'dark'} text={'light'} style={{}}>
                    { removeFromMatches && <Button onClick={handleRemove} style={{display: 'inline-block', width: '20%', margin: '1%'}} variant='danger'>Remove From Matches</Button>}
                    <Card.Body  as='h3'>{userObject.firstName} {userObject.lastName}</Card.Body>
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
                        {!hideEdit && <Image onClick={handleShow} style={{ position: 'absolute', right: '5px', bottom: '5px', fontSize: '5px', width: '20px', cursor: 'pointer' }} src={editIcon} alt='edit profile button' />}
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
                            updateUserProfileInfo()
                            handleClose()

                        }}>
                            <Form.Group>
                            <Form.Label >First Name</Form.Label>
                                
                                <Form.Control onChange={(e) => handleChange(e.target.name, e.target.value)} as='textarea' rows={1} name='firstName' placeholder='first name'>{user.firstName}</Form.Control>
                            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Last Name</Form.Label>
                                
                                <Form.Control onChange={(e) => handleChange(e.target.name, e.target.value)} as='textarea' rows={1} name='lastName' placeholder='last name'>{user.lastName}</Form.Control>
                            
                        </Form.Group>
                        <Form.Group>
                                <Form.Label >User Bio</Form.Label>
                                
                                    <Form.Control onChange={(e) => handleChange(e.target.name, e.target.value)} as='textarea' name='bio' placeholder='Enter your biography...'>{user.bio}</Form.Control>
                                
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Select onChange={(e) => handleChange(e.target.name, e.target.value)} name='age'>
                                    <option value={user.age}>{user.age}</option>
                                    {renderAge()}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control onChange={(e) => handleChange(e.target.name, e.target.value.trim() === '' ? fallBackPhoto : e.target.value)} name='photo'></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Activities</Form.Label>
                                <Form.Control onChange={(e) => handleChange(e.target.name, e.target.value)} as='textarea' placeholder={userObject.activities.toString()} name='activities' >{userObject.activities.toString()}</Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Preference</Form.Label>
                                <Form.Select onChange={(e) => handleChange(e.target.name, e.target.value)} name='preference' >
                                <option value={user.preference}>{user.preference}</option>
                                <option value='Female'>Female</option>
                                <option value='Male'>Male</option>
                                <option value='Both'>Both</option>
                                </Form.Select>
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
