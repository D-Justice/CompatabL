import React, { useState} from "react";
import SwipeContainer from "./components/SwipeContainer";
import LikeDislikeContainer from "./components/LikeDislikeContainer";
import Quiz from './components/Quiz'
import { Navbar, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css'


function Application() {

  const apiLink = 'https://api.unsplash.com/'
  const activityUrl = 'http://localhost:4000/hobbies'
  const keyUrl = 'http://localhost:4001/keys'
  const bioUrl = 'http://localhost:4000/biographies'
  const userInfoAPI = 'https://randomuser.me/api/'

  const [accessKey, setAccessKey] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [userBio, setUserBio] = useState('')
  const [photo, setPhoto] = useState('')
  const [activities, setActivities] = useState([])
  const [questions, setQuestions] = useState([])
  
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    "results": [
      {
        "gender": "male",
        "name": {
          
          "first": "Loading",
          "last": "Error"
        },
   
        "dob": {
          "age": 'error'
        },

        "picture": {
          "large": "https://randomuser.me/api/portraits/men/75.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
        }
      }
    ]
  })
  
  
  const randomiseUser = () => {
    createUserInfo()
    fetchUserdata()
    userBioRandomiser()
    retrieveKeys()
    retrieveActivities()
    retrieveQuestions()
    
  }
  
  
  const saveSelectedUser = () => {
    fetch(`http://localhost:4000/selectedUser/1`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userInfo: userInfo,
        photo: photo,
        userBio: userBio,
        activities: activities
      })
    })
    .then(resp => {
      setLoading(true)
      resp.json()})
    .then(data => setLoading(false))
    .catch(error => console.error(error))
  }
  const retrieveQuestions = () => {
    fetch(`http://localhost:4000/questions`)
    .then(resp => resp.json())
    .then(data => {
      console.log('data', data)
      setQuestions(data)})
  }
  const retrieveKeys = () => {
    fetch(`${keyUrl}`)
      .then(resp => {
        setLoading(true)
        resp.json()})
      .then(keys => {
        setLoading(false)
        setSecretKey(keys[0].secretKey)
        setAccessKey(keys[0].accessKey)
        fetchUserdata()
      })
      .catch(error => console.error(error))

  }
  const userBioRandomiser = () => {
    fetch(`${bioUrl}`)
      .then(resp => resp.json())
      .then(data => {
        setUserBio(data[Math.floor(Math.random() * data.length)])
      })
  }
  const retrieveActivities = () => {
    fetch(`${activityUrl}`)
      .then(resp => resp.json())
      .then(data => {
        let activities = []
        for (let i = 0; i <= 3; i++) {
          activities.push(data[Math.floor(Math.random() * data.length)])
        }
        setActivities(activities)
      })
  }
  const createUserInfo = () => {
    fetch(`${userInfoAPI}`)
      .then(resp => resp.json())
      .then(data => setUserInfo(data))
  }
  const fetchUserdata = () => {
    fetch(`${apiLink}/photos/random?query=person&client_id=`)
      .then(resp => resp.json())
      .then(data => {
        
        setPhoto(data.urls.small)
      })

  }
  return (
    <div>
      <Navbar className='nav-bar'>
        <div className='nav-container'>
          <Button className='nav-button' variant="primary">Signup</Button>
          <Button className='nav-button' variant="secondary">Profile</Button>
        </div>
      </Navbar>
      <Router>
      <Switch>
      <Route path='/quiz'>
          <Quiz questions={questions} photo={photo} userInfo={userInfo} userBio={userBio} activities={activities}/>
      </Route>
      <Route path="/">
        <SwipeContainer loading={loading} randomiseUser={randomiseUser} userBio={userBio} activities={activities} userInfo={userInfo} photo={photo} />
        <LikeDislikeContainer saveSelectedUser={saveSelectedUser} randomiseUser={randomiseUser}/>
      </Route>
      </Switch>
      </Router>


    </div>
  )
}
export default Application

//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY