import React, { useState, useEffect } from 'react'
import '../css/Profile.module.css'
import { Alert, Button, Row, Col } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import FormEdit from './FormEdit'
import ProfileBar from './ProfileBar'
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import MatchProfile from './MatchProfile';


export default function Profile({ updateLoggedInUser, user, match, matchProfileUpdate }) {
    const [renderFormEdit, setRenderFormEdit] = useState(false)
    const [userQuiz, setUserQuiz] = useState()
    const [show, setShow] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [userProfileUpdated, setUserProfileUpdated] = useState(false)
    const [matchRemoved, setMatchRemoved] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const renderMatches = (match, key) => {
        return (
            <>

                <Link to={'/profile/' + match.id}>

                    <Image key={key} src={match.photo} onClick={() => matchProfileUpdate(match)} roundedCircle style={{ height: '100px', width: '100px', display: 'inline-block', marginLeft: '1%' }} />
                </Link>

            </>

        )
    }
    const updateUserMatches = (matches) => {
        user.matches = matches
    }
    const updateUserProfileInfo = () => {
        setUserProfileUpdated(true)
        setTimeout(() => setUserProfileUpdated(false), 3000)

    }
    const updateMatchRemoved = () => {
        setMatchRemoved(true)
        setTimeout(() => setMatchRemoved(false), 3000)
    }
    function fetchForm() {
        fetch('http://localhost:4000/users')
            .then(resp => resp.json())
            .then(data => {
                let existingForm = data.map((each, index) => {
                    if (each.email === user.email) {
                        return each
                    }
                })

                existingForm = existingForm.filter(each => each !== undefined)
                if (existingForm.length > 0) {
                    setUserQuiz(existingForm[0].userQuiz)
                } else {
                    setUserQuiz([])
                }
                
            })
            .catch(err => console.error(err))

    }
    useEffect(() => {
        fetchForm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderFormEdit])
    const retrieveExistingForm = () => {
            
            setRenderFormEdit(true)
    }
    const hideFormEdit = () => {
        setRenderFormEdit(false)
    }
    const renderSavedQuiz = () => {
        
        return userQuiz.map((each, index) => {
            return <li>{each.question}</li>
        })


    }
    const updateRenderFormEdit = () => {
        setRenderFormEdit(false)
        setSubmitSuccess(true)
        setTimeout(() => setSubmitSuccess(false), 4000)
    }
    return (
        <div style={{ height: '100%' }}>
            {submitSuccess && <Alert variant='success'>Quiz successfully submitted!</Alert>}
            {userProfileUpdated && <Alert variant='success'>Profile information successfully updated</Alert>}
            {matchRemoved && <Alert variant='danger'>User has been removed from matches</Alert> }

            <Router>
                <Container fluid>
                    <Row>
                        {!match && <Col lg={3}>
                            <ProfileBar updateUserProfileInfo={updateUserProfileInfo} matchProfileUpdate={matchProfileUpdate} removeFromMatches={false} updateLoggedInUser={updateLoggedInUser} fetchForm={fetchForm} user={user} hideEdit={false}/>
                        </Col>}
                        {!match && <Col style={{ position: 'relative', borderRadius: '25px', background: 'lightgrey', marginRight: '10px' }}>


                            {!renderFormEdit && userQuiz && <div style={{backgroundColor: 'darkgrey', marginTop: '10px', width: '60%', borderRadius: '25px', padding: '5px'}}><h2>Current User Questions</h2>
                                <ul style={{ textAlign: 'left' , }}>
                                    {renderSavedQuiz()}
                                </ul></div>}
                            {!renderFormEdit && !match && <Button onClick={() => {
                                retrieveExistingForm()

                            }} style={{ fontSize: '40px', marginTop: '10%' }}>Add/Edit Quiz</Button>}

                            {renderFormEdit && !match && <FormEdit hideFormEdit={hideFormEdit} updateRenderFormEdit={updateRenderFormEdit} existingQuiz={userQuiz} user={user} />}




                        </Col>}
                        {match && <Col lg={8} style={{ margin: 'auto' }}>
                            <Route exact path="/profile/:id"><MatchProfile updateMatchRemoved={updateMatchRemoved} updateUserMatches={updateUserMatches} matchProfileUpdate={matchProfileUpdate} loggedInUser={user} userId={user.id} user={match} /></Route>

                        </Col>}


                    </Row>


                    <Row>
                        <Col lg={9}>
                        </Col>
                        <Col lg={3}>
                            <Button style={{ width: '10%', position: 'absolute', bottom: '100px', right: '-66.5px', fontSize: '30px', transform: 'rotate(270deg)' }} variant='primary' onClick={handleShow}>Matches</Button>
                            <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Matches: </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>

                                    {user.matches.length > 0 ? user.matches.map((match, index) => renderMatches(match, index)) : <p style={{ color: 'grey', textAlign: 'center' }}>No matches yet...</p>}




                                </Offcanvas.Body>
                            </Offcanvas>
                        </Col>
                    </Row>



                </Container>
            </Router>
        </div>
    )
}