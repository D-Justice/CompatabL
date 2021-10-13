import React, { useState } from 'react'
import { Card, Form, Button, Row, Label, Col, Alert } from 'react-bootstrap'
import { v4 } from 'uuid';
import styles from '../css/FormEdit.module.css'



export default function FormEdit({existingQuiz, user}) {
    
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
    // const [questions, setQuestions] = useState(existingQuiz)
    const [questions, setQuestions] = useState(existingQuiz.map((each, index) => {
        return {
            block: each.block,
            value: [each.question]
        }
    }))
    const [error, setError] = useState(false)


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
        console.log('arr', arr)
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
        
        
        setRemovedBlocks([...removedBlocks, block])
        setQuestions(questionRemoved)
        setArr(blockRemoved)
        console.log('blockRemoved', blockRemoved, 'questionRemoved', questionRemoved,'arr', arr)
        
        
        




    }
    const renderAnswer = (block) => {
        var firstAnswerBox = 0;
        console.log('rendered answers', arr, block)
        return arr.map((each, index) => {
            let id = each.data.id
            
            if (each.block === block) {
                firstAnswerBox += 1
                
                return (<div>
                    <Form.Control onChange={e => handleInput(e, index)} name="value" value={each.data.value} style={{ backgroundColor: firstAnswerBox === 1 ?'#ddffdd': '#FF7F7F', display: 'inline-block', width: '90%' }} />
                    <Button onClick={(e) => removeInput(block, id)} style={{ display: 'inline-block' }}>X</Button>
                </div>)
            }
            firstAnswerBox = 0

        })
    }
    const postUserQuiz = (quiz) => {
        let newUserData = Object.assign({}, user, {userQuiz: quiz})
        fetch(`http://localhost:4000/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...user,
                    userQuiz: quiz
                })
            })
            .then(resp => resp.json())
            .then(data => data)
        quiz.forEach(each => {
            
            fetch(`http://localhost:4000/questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(each)
    
            })
            .then(resp => resp.json())
            .then(data => data)

        })
        
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const userQuiz = questions.map((each, index) => {
            let answer = arr.map((e, index) => {
                if (each.block === e.block) {
                    return e.data.value
                }else {
                    return ''
                }})
            let correctAnswer = arr.map((e, index) => {
                if (each.block === e.block) {
                    return e.data.value
                } else {
                    return ''
                }
            })
            return {
                question: each.value[0],
                answers: answer.filter(each => each !== ''),
                correctAnswer: correctAnswer.filter(each => each !== '')[0],
                block: each.block,
                data: {
                    id: arr[index].data.id,
                    value: arr[index].data.value
                }
            }
        })
        
        postUserQuiz(userQuiz)

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
    const renderQuestions = (block, index) => {
        return (<div className={block}><Form.Control name={block} value={questions[index].value[0]} onChange={(e) => handleChange(e, block)} style={{ width: '90%', marginTop: '1%', marginBottom: '1%', display: 'inline-block' }} placeholder="Enter Question"></Form.Control><Button onClick={(e) => removeQuestion(e, block)} style={{ display: 'inline-block' }}>X</Button>
            {renderAnswer(block)}
            {!removedBlocks.includes(block) && <Button style={{ marginBottom: '1%' }} name={1} onClick={() => addInput(block, v4())}>Add Answer</Button>}
        </div>)
    }
    return (
        <div className={styles.formContainer}>
            
            <Form onSubmit={handleSubmit}>
                {questions.map((each, index) => renderQuestions(index, index))}
                {error && questions.length > 9 && <Alert variant='danger'> Max number of questions reached. </Alert>}
                <Button onClick={() => {
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