import React, { useState } from 'react'
import styles from '../css/Profile.module.css'
import { Card, Form, Button, Row, Label, Col } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import FormEdit from './FormEdit'
import ProfileBar from './ProfileBar'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



export default function MatchProfile({ originalUser, user }) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const renderMatches = (match, key) => {
        console.log('match', match)
        return (
            <>
            <Router>
            {/* <Link to={'profile/' + match.id}>
                
            <Image key={key} src={match.photo} roundedCircle style={{ height: '100px', width: '100px', display: 'inline-block', marginLeft: '1%' }} />
            </Link>
            <Switch>
            <Route exact path="profile/:id"><MatchProfile user={match} /></Route>
            </Switch> */}
            </Router>
            </>
            

        )
    }
    

    console.log('users', originalUser, user)
    return (
        <div style={{height: '100%'}}>
            <Container fluid>
                <Row>
                    <Col>
                        <ProfileBar user={user}/>
                    </Col>
                    


                </Row>


            </Container>
        </div>
    )
}