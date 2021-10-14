import React, { useState } from 'react'
import { Card, Form, Button, Row, Label, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import styles from '../css/Quiz.module.css'
import { useHistory } from 'react-router-dom'
import Score from './Score'
import { matches } from 'dom-helpers';
import { v4 } from 'uuid';




function Quiz({ loggedInUser, calculateScore, renderScore, score, questions, photo, userInfo, userBio, activities }) {
    const [loading, setLoading] = useState(false)
    const [isSubmitted, setSubmitted] = useState(false)
    const [requiredScore, setRequiredScore] = useState(Math.floor(Math.random() * (10 - 1) + 1))
    let history = useHistory()


    const cleanWord = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const renderActivities = () => {
        let splitActivities = activities.join(', ')

        return (splitActivities)
    }
    const renderQuestions = () => {
        return questions.map((each, index) => {
            return (
                <>
                    <Form.Label key={index}>{each.question}</Form.Label>
                    <br />
                    {each.answers.map((answer, answerIndex) => {
                        return (
                            <Form.Check inline key={answerIndex} label={answer} name={index} type="radio" onClick={(e) => renderScore(each.correctAnswer, answer, each.id)} id={`inline-${answerIndex}`} />
                        )

                    })}
                    <hr />
                </>
            )
        })
    }
    function handleClick() {

        history.push('/')
    }
    const saveUserToMatches = () => {
        console.log("LoggedInUserMatches", loggedInUser.matches)
        let updatedMatches = loggedInUser.matches
        updatedMatches.push({
                    firstName: user.name.first,
                    lastName: user.name.last,
                    gender: cleanWord(user.gender),
                    age: user.dob.age,
                    activities: activities,
                    bio: userBio,
                    id: v4(),
                    photo: photo})
            
            console.log(updatedMatches,'updated')
        fetch(`http://localhost:4000/users/${loggedInUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                matches: updatedMatches
            })
        })
        .then(resp => resp.json())
        .then(data => console.log('Match has been saved!'))
    }
    let user = userInfo.results[0]
    
    console.log(requiredScore)
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <h2>Score required: {requiredScore} or more</h2>
                        {!isSubmitted &&
                            <Form style={{ border: '2px solid black', borderRadius: '25px' }}>
                                
                                {renderQuestions()}
                                <Button type='submit' onClick={(e) => {
                                    e.preventDefault()
                                    setSubmitted(true)
                                    calculateScore()
                                }}>Submit</Button>
                            </Form>
                        }
                        {isSubmitted && <Score handleClick={handleClick} requiredScore={requiredScore} saveUserToMatches={saveUserToMatches} score={score} />}
                    </Col>
                    <Col>
                        <img className={styles.image} src={photo} />
                        <Card className={styles.card}>


                            <Card.Title as='h2'>{user.name.first} {user.name.last}</Card.Title>
                            <Card.Text>{cleanWord(user.gender)} {user.dob.age}</Card.Text>
                            <Card.Text as='small'>{renderActivities()}</Card.Text>
                            <Card.Title as='h1'>Biography</Card.Title>
                            <Card.Text style={{ fontSize: '15px' }}>{userBio}</Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default Quiz