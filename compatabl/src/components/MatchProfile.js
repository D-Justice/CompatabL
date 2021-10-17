import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import ProfileBar from './ProfileBar'




export default function MatchProfile({updateMatchRemoved, updateUserMatches, matchProfileUpdate, loggedInUser, userId, user }) {

    

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <ProfileBar updateMatchRemoved={updateMatchRemoved} updateUserMatches={updateUserMatches} matchProfileUpdate={matchProfileUpdate} loggedInUser={loggedInUser} userId={userId} removeFromMatches={true} user={user} hideEdit={true}/>
                    </Col>
                    


                </Row>


            </Container>
        </div>
    )
}