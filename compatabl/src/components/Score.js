import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'


export default function Score({requiredScore, saveUserToMatches, handleClick, score}) {
    const [saved, setSaved] = useState(false)
    useEffect(() => {
        if(score >= requiredScore && !saved){
            saveUserToMatches()
        }
        setSaved(true)
    })
    return (
        <>
            
            <h1>Score: {score}</h1>
            <h2 style={{fontSize: '45px', textAlign: 'center'}}>Its {score >= requiredScore ? 'a MATCH' : 'not a match...'}</h2>
            {score < requiredScore && <><hr /><Button variant='primary' onClick={handleClick}>Try Again!</Button></>}
            {score >= requiredScore &&
                <>
                    <p>Match has been saved to your profile!</p>
                    <hr />
                    <Button variant='primary' onClick={handleClick}>Keep Looking</Button>
                </>
            }
        </>
    )
}