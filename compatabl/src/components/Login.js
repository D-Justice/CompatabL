import React, {useState} from 'react'
import { Alert, Form, Button, Row, Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/background.css'

export default function Login({ accountCreated, login}) {
    const history = useHistory()
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (email, password) => {
        fetch(`http://localhost:4000/users`)
        .then(resp => resp.json())
        .then(data => {
        
        data.filter(each => {
            if(each.email === email && each.password === password) {
                setError(false)
                
                login(each)
                history.push('/')
        }
        
        return setError(true)
      })
      
    })
    .catch(err => console.error(err))

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
                            handleSubmit(email, password)
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





