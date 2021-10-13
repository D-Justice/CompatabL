import React, { useState, useEffect } from 'react'
import { Card, Form, Button, Row, Label, Col } from 'react-bootstrap'


export default function Score({requiredScore, saveUserToMatches, handleClick, score}) {
    const [saved, setSaved] = useState(false)
    useEffect(() => {
        if(score >= 5 && !saved){
            saveUserToMatches()
        }
        setSaved(true)
    })
    return (
        <>
            
            <h1>Score: {score}</h1>
            <h2>Its {score >= requiredScore ? 'a MATCH' : 'not a match...'}</h2>
            {score < 5 && <><hr /><Button variant='primary' onClick={handleClick}>Try Again!</Button></>}
            {score >= 5 &&
                <>
                    <p>Match has been saved to your profile!</p>
                    <hr />
                    <Button variant='primary' onClick={handleClick}>Keep Looking</Button>
                </>
            }
        </>
    )
}