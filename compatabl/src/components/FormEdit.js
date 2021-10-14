import React, { useState, useRef, useEffect } from 'react'
import { Card, Form, Button, Row, Label, Col, Alert } from 'react-bootstrap'
import { v4 } from 'uuid';
import styles from '../css/FormEdit.module.css'



export default function FormEdit({updateRenderFormEdit, existingQuiz, user}) {
    
    var existingForm = existingQuiz.map((each, index) => {
        return each.answers.map((answer, index) => {
            return {
                block: each.block, 
                data: {id: v4(), value: answer}
            }
        })})
    existingForm = existingForm.flat()
    
    const [arr, setArr] = useState(existingForm)
    const [removedBlocks, setRemovedBlocks] = useState([])
    const [requiredToMatch, setRequiredToMatch] = useState(1)
    const [blankError, setBlankError] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const quizForSubmit = useRef([])
    const firstRender = useRef(false)
    const [questions, setQuestions] = useState(existingQuiz.map((each, index) => {
        return {
            block: each.block,
            value: [each.question]
        }
    }))
    const [error, setError] = useState(false)

    useEffect(() => {
        
        if(!firstRender.current) {
            firstRender.current = true
        } else {
            if(!blankError) {
                postUserQuiz(quizForSubmit.current)
            }
        }
        console.log('firstRender', firstRender, 'blankError',blankError,'quizForSubmit', quizForSubmit.current)
        
    }, [blankError])
    const addInput = (block, id) => {
        const arrLength = arr.filter(each => each.block === block)

        if (arrLength.length < 4) {
            return setArr([...arr, { block: block, data: { id: id, value: '' } }])
        }

    }

    const removeInput = (block, id) => {
        const newArr = [...arr]


        let index = newArr.map((each, index) => {
            if (each.data.id === id && each.block === block) {
                return index
            } else {
                return ''
            }
        })

        index = index.filter(each => each !== '')
        newArr.splice(index, 1)
        setArr(newArr)
    }
    const handleInput = (e, index) => {
        const { name, value } = e.target
        const list = [...arr];
        list[index].data[name] = value

        setArr(list)
    }
    const removeQuestion = (e, block) => {
        setError(false)

        let newArr = [...arr]
        let blockRemoved = newArr.map((each, index) => {
            if (each.block === block) {
                return ''
            } else {
                
                return each
            }
        })
        blockRemoved = blockRemoved.filter(each => each !== '')
        blockRemoved = blockRemoved.map((each, index) => {
            const newObject = {...each}
            if (each.block > block) {
                newObject.block -= 1 
            }
            
            
            return newObject
        })
        
        let questionRemoved = questions.map((each, index) => {
            if(each.block === block) {
               return '' 
            } else {
                return each
            }
        })
        questionRemoved = questionRemoved.filter(each => each !=='')
        questionRemoved = questionRemoved.map((each, index) => {
            const newObject = {...each}
            if (each.block > block) {
                newObject.block -= 1 
            }
            
            
            return newObject
        })
        
        // e.target.previousSibling.remove()
        // e.target.remove()
        
        
        
        setQuestions(questionRemoved)
        setArr(blockRemoved)
        
        
        




    }
 
    const postUserQuiz = (quiz) => {
        console.log('quiz', quiz)
        fetch(`http://localhost:4000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    requiredToMatch: requiredToMatch,
                    userQuiz: quiz
                })
            })
            .then(resp => resp.json())
            .then(data => updateRenderFormEdit())
        quiz.forEach(each => {
            
            fetch(`http://localhost:4000/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(each)
    
            })
            .then(resp => resp.json())
            .then(data => {
                
                setIsSubmitted(true)})

        })
        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        var breakLoop = false
        console.log('questions', questions, 'arr', arr)
        const userQuiz = questions.map((each, index) => {
            if(!breakLoop) {
                let answer = arr.map((e, index) => {
                    if (each.block === e.block) {
                        if (e.data.value !== '') {
                            return e.data.value
                        }
                        return e.data.value
                    }else {
                        return ''
                    }})
                let correctAnswer = arr.map((e, index) => {
                    if (each.block === e.block) {
                        if (e.data.value !== '') {
                            return e.data.value
                        }
                    } else {
                        return ''
                    }
                })
                answer = answer.filter(each => each !== '')
                correctAnswer = correctAnswer.filter(each => each !== '')[0]
                
                if (each.value[0] !== '') {
                    if(answer.length > 1) {
                        setBlankError(false)
                        return {
                            question: each.value[0],
                            answers: answer,
                            correctAnswer: correctAnswer,
                            block: each.block,
                            data: {
                                id: arr[index].data.id,
                                value: arr[index].data.value
                            }
                        }
                    } else {
                        setBlankError(true)
                        
                    }
                    
                }
                else {
                    setBlankError(true)
                    breakLoop = true
                    
                }
            }
            
            
        })
        setBlankError(undefined)
        console.log('submittingg', quizForSubmit)
        quizForSubmit.current = (userQuiz.filter(each => each !== ''))
        
        

    }
    const handleChange = (e, block) => {
        const addition = { block: block, value: [e.target.value] }
        if (!questions) {
            setQuestions([addition])
        } else {
            const copyOfQuestions = [...questions]
            let index = copyOfQuestions.map((each, index) => {
                if (each.block === block) {
                    return index
                } else {
                    return ''
                }
            })
            index = index.filter(each => each !== '')
            if (index.length > 0) {

                copyOfQuestions[index] = addition
                setQuestions([...copyOfQuestions])
            } else {

                setQuestions([...copyOfQuestions, addition])
            }
        }
        

    }
    const renderAnswer = (block) => {
        var firstAnswerBox = false;
        
        return arr.map((each, index) => {
            let id = each.data.id
            
            let findFirstElement = arr.find((each, index) => {
                if (each.block === block) {
                    return id
                }
            })
            
            if (each.block === block) {
                firstAnswerBox = findFirstElement.data.id === each.data.id
                
                return (<div>
                    <Form.Control onChange={e => handleInput(e, index)} name="value" value={each.data.value} style={{ backgroundColor: firstAnswerBox ?'#ddffdd': '#FF7F7F', display: 'inline-block', width: '90%' }} />
                    <Button onClick={(e) => removeInput(block, id)} style={{ display: 'inline-block' }}>X</Button>
                </div>)
            }
            firstAnswerBox = 0

        })
    }
    const renderQuestions = (block) => {
        return (<div className={block}><Form.Control name={block} value={questions[block].value[0]} onChange={(e) => handleChange(e, block)} style={{ width: '90%', marginTop: '1%', marginBottom: '1%', display: 'inline-block' }} placeholder="Enter Question"></Form.Control><Button onClick={(e) => removeQuestion(e, block)} style={{ display: 'inline-block' }}>X</Button>
            {renderAnswer(block)}
            {<Button style={{position: 'relative', display: 'inline-block', marginBottom: '1%' }} name={1} onClick={() => addInput(block, v4())}>Add Answer</Button>}
        </div>)
    }
    return (
        <div className={styles.formContainer}>
            
            
            <Form onSubmit={handleSubmit}>
                
                {questions.map((each, index) => renderQuestions(index))}
                {error && questions.length > 9 && <Alert variant='danger'> Max number of questions reached. </Alert>}
                {blankError && <Alert variant='danger'>Please fill out or delete blank questions/answers. Each question must have 2 or more answers</Alert>}
                


                <Form.Group style={{width: '90%'}}as={Row}>
                <Form.Label style={{fontSize: '30px', marginRight: '-45px', marginTop: '-10px'}} column sm='4' >Score required to match: </Form.Label>
                <Col sm='1'>
                <Form.Control type='number' max={questions.length} min='1' onChange={(e) => setRequiredToMatch(e.target.value)} name='requiredScore' required></Form.Control>
                </Col>
                <Col sm='1'>
                    <Form.Label style={{marginLeft: '-80px'}} as='h4'>/ {questions.length}</Form.Label>
                </Col>
                </Form.Group>
                
                <Button style={{position: 'relative', display: 'inline-block'}} onClick={() => {
                    if(questions.length < 10) {
                        return setQuestions([...questions, {block: questions.length, value: ['']}])
                    } else {
                        setError(true)
                    }
                    }}>Add Question</Button>
                <Button style={{ marginLeft: '1%' }} type='submit' variant='danger'>Submit</Button>
            </Form>
        </div>
    )
}