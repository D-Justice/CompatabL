import React, {useState} from 'react'
import styles from '../css/Quiz.module.css'
import { Alert, Card, Form, Button, Row, Label, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ProfileBar from './ProfileBar';



export default function Signup({submitUserSignup}) {
    const history = useHistory()
    const [userObject, setUserObject] = useState()
    const [error, setError] = useState(false)
    const handleSubmit = () => {
        const {
            email,
            username,
            password,
            profilePicture,
            userBio,
            age,
            gender,
            favouriteActivities
        } = userObject
        if (email && username && password && profilePicture) {
            submitUserSignup(email, username, password, profilePicture, userBio, age, gender, favouriteActivities)
            history.push('/login')
            setError(false)
        } else {
            setError(true)
        }
        
    }
    const renderAge = () => {
        let oneHundredArray = [...Array(100).keys()]
        
        return oneHundredArray.map(((each, i) => {
                return <option value={each}>{each}</option>
        }))
             
    }
    const handleChange = (key, value) => {
        if (key === 'favouriteActivities') {
            value = value.split(',')
            console.log(value)
        }

        setUserObject({...userObject, [key] : value})
        console.log(userObject)

        }
        
    return (
        <div>
            <h1>Signup page</h1>
            <Container>
                <Row>
                    <Col lg={7}>

                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}>
                            {error && <Alert variant='danger'>Please fill in all boxes with an '*' next to them </Alert>}
                            <Form.Group className="mb-3">
                                <Form.Label>Email address *</Form.Label>
                                <Form.Control onChange={(e)=> handleChange(e.target.name, e.target.value)} name='email' type="text" placeholder="yourname@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username *</Form.Label>
                                <Form.Control onChange={(e)=> handleChange(e.target.name, e.target.value)} name='username' type="text" placeholder="username"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control onChange={(e)=> handleChange(e.target.name, e.target.value)} name='password' type="password" placeholder="password"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Profile picture *</Form.Label>
                                <Form.Control onChange={(e)=> handleChange(e.target.name, e.target.value)} name='profilePicture' type="text" placeholder="image URL"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control onChange={(e)=> handleChange(e.target.name, e.target.value)} name='userBio' as="textarea" rows={3} placeholder="biography -- can be edited later"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Select onChange={(e)=> handleChange(e.target.name, e.target.value)} name='age'>
                                    <option value='default'>Please select your age </option>
                                    {renderAge()}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select onChange={(e)=> handleChange(e.target.name, e.target.value)} name='gender'>
                                    <option value='N/A'>Please select your gender</option>
                                    <option value='Female'>Female</option>
                                    <option value='Male'>Male</option>
                                    <option value='Other'>Other</option>
                                    <option value='N/A'>Rather Not Say</option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Favourite Activities</Form.Label>
                                <Form.Control onChange={(e)=> handleChange(e.target.name, e.target.value)} name='favouriteActivities' type="text" placeholder="favourite activities (seperated by a ',')"></Form.Control>
                            </Form.Group>

                            <Button type='submit' onSubmit={(e)=>e.preventDefault()} variant="danger">Create</Button>
                        </Form>

                    </Col>
                    <Col lg={5}>
                        {!!userObject && <ProfileBar user={userObject} /> }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}





