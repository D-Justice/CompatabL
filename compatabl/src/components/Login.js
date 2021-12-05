import React, {useState, useEffect} from 'react'
import { Alert, Form, Button, Row, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/background.css'

export default function Login({ accountCreated, login}) {
    useEffect(() => {
        alert('Hello and welcome to a test version of CompatabL! A React-made, dating, web application! \nAs you go through this app you will notice that not everything works as it should, this is because the app has been adapted to be run on github pages. \nNormally this app would require the use of a mock JSON server to persist user information and matches. What you see now is the most basic form of the application. To see it in all its glory please visit the link on the next alert and follow the install instructions. \nEnjoy!')
        alert('Visit: \n\n https://github.com/D-Justice/CompatabL/tree/master/compatabl \n\nTo test the proper application or continue here to get an idea of it.\nTo get started simply press the "Login" button')
    })
    
    
    
    const history = useHistory()
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        
            let user = {
                "email": "test@test.com",
                "firstName": "test",
                "lastName": "test",
                "password": "test",
                "photo": "https://pixy.org/src/59/thumbs350/595036.jpg",
                "bio": "Hi! I am brand new to online dating. While I’m still figuring this all out, here’s something I know for sure—I’m excited to be here! The chance to meet unique, engaging, and interesting women is pretty dang neat. If you think you might fit that mold, drop me a message. I work in the finance industry. And while I like to work hard, I make sure to leave time to enjoy life. I’m a fan of wine, movies, hiking, and getting out of town for the weekend. Let’s chat and see if maybe we’re a good fit!",
                "age": "25",
                "gender": "Male",
                "preference": "Both",
                "activities": [
                  "running",
                  "biking",
                  "swimming",
                  "surfing"
                ],
                "matches": [],
                "userQuiz": [],
                "id": 3
              }
                
                login(user)
                history.push('/')

      
    }

    
    
    return (
        <div>
            <div className='background'>
            </div>

            <div className='content'>
            <Container >
                {accountCreated && !error && <Alert variant='success'>Account created! Please log in to continue</Alert>}
                <Row>
                    <Col >
                        <Form style={{margin: '0 auto', marginTop: '10%', width: '50%'}} onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}>
                            <Form.Label>Email: </Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type='email' placeholder='example@example.com'></Form.Control>

                            <Form.Label>Password: </Form.Label>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type='password' placeholder='password...'></Form.Control>
                            {!!error && <Alert style={{marginTop: '1%'}}variant='danger'>Email or Password is incorrect</Alert>}
                            <Button variant="primary" type='submit' onSubmit={(e) => {
                                e.preventDefault()
                            }}>Log in</Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    )
}





