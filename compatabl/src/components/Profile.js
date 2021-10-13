import React, { useState } from 'react'
import styles from '../css/Profile.module.css'
import { Card, Form, Button, Row, Label, Col } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import FormEdit from './FormEdit'
import ProfileBar from './ProfileBar'



export default function Profile({ user }) {
    const [renderFormEdit, setRenderFormEdit] = useState(false)
    const [userQuiz, setUserQuiz] = useState()
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const renderMatches = (match, key) => {
        return (

            <Image key={key} src={match.photo} roundedCircle style={{ height: '100px', width: '100px', display: 'inline-block', marginLeft: '1%' }} />

        )
    }
    
    const retrieveExistingForm = () => {
        fetch('http://localhost:4000/users')
        .then(resp => resp.json())
        .then(data => {
            let existingForm = data.map((each, index) => {
                 if (each.email === user.email) {
                    return each
                 }
            })

            existingForm = existingForm.filter(each => each !== undefined)
            console.log('existingForm', existingForm)
            if (existingForm.length > 0) {
                setUserQuiz(existingForm[0].userQuiz)
            } else {
                setUserQuiz([])
            }
            setRenderFormEdit(true)
        })
    }

    return (
        <div style={{height: '100%'}}>
            <Container fluid>
                <Row>
                    <Col lg={3}>
                        <ProfileBar user={user} activities={user.activities}/>
                    </Col>
                    <Col style={{borderRadius: '25px', background: 'lightgrey', marginRight: '10px' }}>
                        {!renderFormEdit && <Button onClick={() => {
                            retrieveExistingForm()
                            
                            }} style={{ float: 'left', marginTop: '20px' }}>Add/Edit quiz</Button>}
                        {renderFormEdit && <FormEdit existingQuiz={userQuiz} user={user}/>}
                        <Button style={{ position: 'absolute', bottom: '60px', right: '-39px', fontSize: '30px',transform: 'rotate(270deg)'}} variant='primary' onClick={handleShow}>Matches</Button>
                        <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Matches: </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {user.matches.length > 0 ? user.matches.map((match, index) => renderMatches(match, index)): <p style={{color: 'grey', textAlign: 'center'}}>No matches yet...</p>}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Col>


                </Row>


            </Container>
        </div>
    )
}