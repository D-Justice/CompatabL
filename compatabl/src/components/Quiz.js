import React, {useState, useEffect} from 'react'
import { Card, Form, Button, Row, Label, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import styles from '../css/Quiz.module.css'




function Quiz({questions, photo, userInfo, userBio, activities}) {
    const [retrievedUser, setRetrievedUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState()
    // useEffect(() => {
    //     retrieveOnReload()
    //   }, [])
    // const retrieveOnReload = () => {
    //     fetch(`http://localhost:4000/selectedUser`)
    //     .then(resp => {
    //       setLoading(true)
    //       resp.json()})
    //     .then(data => {
            
    //         setRetrievedUser(data[0])
    //         setLoading(false)
    //     })
            
    //     .catch(error => console.error(error))
        
    // }
    const handleSelect = (e) => {
        console.log(e)
    }
    const cleanWord = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const renderActivities = () => {
        let splitActivities = activities.join(', ')
        
        return(splitActivities)
    }
    const renderQuestions = () => {
        return questions.map((each, index) => {
        return (
            <>
        <Form.Label key={index}>{each.question}</Form.Label>
        <br/>
        {each.answers.map((answer, answerIndex) => {
            return (
                <Form.Check inline label={answer} name={index}type="radio" id={`inline-${answerIndex}`} />
            )
            
        })
        
        }
        <hr/>
        </>
        
        )})
    }
    let user = userInfo.results[0]
    
    return(
        <div>
            <Container>
                <Row>
            <Col>
            <Form style={{border: '2px solid black', borderRadius: '25px'}}>
                
                {renderQuestions()}
                
            </Form>
            </Col>
            <Col>
            <img className={styles.image} src={photo} />
            <Card className={styles.card}>
                
                
                <Card.Title as='h2'>{user.name.first } {user.name.last}</Card.Title>
                <Card.Text>{cleanWord(user.gender)} {user.dob.age}</Card.Text>
                <Card.Text as='small'>{renderActivities()}</Card.Text>
                <Card.Title as='h1'>Biography</Card.Title>
                <Card.Text style={{fontSize: '15px'}}>{userBio}</Card.Text>
            </Card>
            </Col>
            </Row>
            </Container>
        </div>
    )
}


export default Quiz