import React, { useState, useEffect } from "react";
import Login from './components/Login'
import SwipeContainer from "./components/SwipeContainer";
import LikeDislikeContainer from "./components/LikeDislikeContainer";
import Quiz from './components/Quiz'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { Navbar, Button } from "react-bootstrap";
import Logo from './images/CompatabLLogo.png'
import { useHistory } from "react-router-dom";
import MatchProfile from './components/MatchProfile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css'


function Application() {
  const history = useHistory()
  const apiLink = 'https://api.unsplash.com/'
  const activityUrl = 'http://localhost:4000/hobbies'
  const keyUrl = 'http://localhost:4001/keys'
  const bioUrl = 'http://localhost:4000/biographies'
  const userInfoAPI = 'https://randomuser.me/api/'
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
  const [userBio, setUserBio] = useState('')
  const [photo, setPhoto] = useState('')
  const [matchProfile, setMatchProfile] = useState()
  const [score, setScore] = useState(0)
  const [activities, setActivities] = useState([])
  const [questions, setQuestions] = useState([])
  const [userScore, setUserScore] = useState([])
  const [accountCreated, setAccountCreated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [match, setMatch] = useState()
  const [profileNavigate, setProfileNavigate] = useState(false)
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

  useEffect(() => {
    if (userScore.length == 2) {

    }

  })
  const randomiseUser = () => {
    createUserInfo()

    userBioRandomiser()
    retrieveActivities()
    retrieveQuestions()


  }
  const matchUpdate = (bool) => {
    setMatchProfile(bool)
  }
  const renderScore = (correctAnswer, answer, id) => {
    let found = userScore.map((each, index) => { if (each.id === id) return index })
    found = found.filter(each => (typeof each) === 'number')
    if (found.length == 1) {
      userScore.splice(found[0], 1)
      setUserScore([...userScore, { id: id, correct: (correctAnswer === answer) }])

    }
    else {

      setUserScore([...userScore, { id: id, correct: (correctAnswer === answer) }])
    }



  }
  const calculateScore = () => {
    let count = 0
    console.log('Count', count)
    userScore.map((each, index) => {

      if (each.correct === true) {
        count += 1
      }
    })
    setUserScore([])
    setScore(count)
    count = 0
  }
  const submitUserSignup = (email, username, password, profilePicture, userBio, age, gender, favouriteActivities, preference) => {
    fetch(`http://localhost:4000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        firstName: username,
        password: password,
        photo: profilePicture,
        bio: userBio,
        age: age,
        gender: gender,
        preference: preference,
        activities: favouriteActivities.map((each, index) => {
          if (index < 4) {
            return each
          } else {
            return ''
          }
        }).filter(each => each !== ''),
        matches: [],
        userQuiz: [],
      })

    })
      .then(resp => resp.json())
      .then(data => setAccountCreated(true))
      .catch(err => console.error(err))
  }
  const login = (each) => {
    setLoggedInUser(each)
    setIsLoggedIn(true)
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
        resp.json()
      })
      .then(data => setLoading(false))
      .catch(error => console.error(error))
  }
  const retrieveQuestions = () => {
    fetch(`http://localhost:4000/questions`)
      .then(resp => resp.json())
      .then(data => {
        let questions = []
        let askedQuestions = []
        for (let i = 0; i <= 9; i++) {

          let question = data[Math.floor(Math.random() * data.length)]
          let asked = askedQuestions.filter(each => question.id === each)

          if (asked.length === 0) {
            questions.push(question)
            askedQuestions.push(question.id)
          } else { i-- }
        }
        setQuestions(questions)
      })
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
    setLoading(true)
    let preference = loggedInUser.preference === "Both" ? "" : loggedInUser.preference.toLowerCase()
    fetch(`${userInfoAPI}?gender=${preference}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        fetchUserdata()
        setUserInfo(data)
      })
  }
  const fetchUserdata = () => {
    fetch(`${apiLink}/photos/random?query=${loggedInUser.preference}&client_id=21gTlhq_CUWz1HLMpJCV9YkjWdxt1mlGo36uQXMsL7g`)
      .then(resp => resp.json())
      .then(data => {
        setLoading(false)
        setPhoto(data.urls.small)
      })

  }
  const updateLoggedInUser = (update) => {
    setLoggedInUser(update)
  }
  const updateMatch = (match) => {
    setMatch(match)
  }
  const logout = () => {
    console.log('Signed out')
    setIsLoggedIn(false)
    setLoggedInUser('')
  }
  return (
    <div>
      
      <Router>

        <Navbar className='nav-bar'>
          <img src={Logo} style={{ width: '15%', borderRadius: '25px', marginLeft: '5px' }} />
          <div className='nav-container'>
            {isLoggedIn && <Link to='/'>
              <Button variant='primary'>Home</Button>
            </Link>}
            {!isLoggedIn && <Link to='/signup'>
              <Button className='nav-button' variant="primary">Signup</Button>
            </Link>}
            {isLoggedIn && <Link to='/'>
              <Button className='nav-button' onClick={() => logout()} variant="danger">Logout</Button>
            </Link>}
            {isLoggedIn && <Link to='/profile'>
              <Button onClick={() => matchUpdate(false)} className='nav-button' variant="secondary">{loggedInUser.firstName}</Button>
            </Link>}
            {!isLoggedIn && <Link to='/login'>
              <Button className='nav-button' variant="secondary">Log In</Button>
            </Link>}
          </div>
        </Navbar>
        <Switch>
          <Route path='/quiz'>
            <Quiz loggedInUser={loggedInUser} calculateScore={calculateScore} score={score} renderScore={renderScore} questions={questions} photo={photo} userInfo={userInfo} userBio={userBio} activities={activities} />
          </Route>

          <Route exact path="/">
            {isLoggedIn &&
              <>
                <SwipeContainer loading={loading} randomiseUser={randomiseUser} userBio={userBio} activities={activities} userInfo={userInfo} photo={photo} />
                <LikeDislikeContainer saveSelectedUser={saveSelectedUser} randomiseUser={randomiseUser} />
              </>
            }

            {!isLoggedIn && <Login login={login} />}
          </Route>
          <Route exact path="/profile">
            <Profile setMatch={updateMatch} matchProfileUpdate={matchUpdate}  updateLoggedInUser={updateLoggedInUser} match={matchProfile} user={loggedInUser} />
          </Route>
          <Route exact path="/signup">
            <Signup submitUserSignup={submitUserSignup} />
          </Route>
          <Route exact path="/login">
            <Login accountCreated={accountCreated} login={login} />
          </Route>


        </Switch>
      </Router>


    </div>
  )
}
export default Application

//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY