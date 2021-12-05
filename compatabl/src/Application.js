import React, { useState, useEffect } from "react";
import Login from './components/Login'
import SwipeContainer from "./components/SwipeContainer";
import LikeDislikeContainer from "./components/LikeDislikeContainer";
import Quiz from './components/Quiz'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { Navbar, Button } from "react-bootstrap";
import RouteNotFound from './components/RouteNotFound'
import Logo from './images/logo.png'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css'


function Application() {
  const apiLink = 'https://api.unsplash.com/'
  const activityUrl = 'http://localhost:4000/hobbies'
  const bioUrl = 'http://localhost:4000/biographies'
  const userInfoAPI = 'https://randomuser.me/api/'
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState()
  const [userBio, setUserBio] = useState('')
  const [photo, setPhoto] = useState('')
  const [matchProfile, setMatchProfile] = useState()
  const [score, setScore] = useState(0)
  const [activities, setActivities] = useState([])
  const [questions, setQuestions] = useState([])
  const [userScore, setUserScore] = useState([])
  const [accountCreated, setAccountCreated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({
    "results": [
      {
        "gender": "loading",
        "name": {

          "first": "Loading",
          "last": ""
        },

        "dob": {
          "age": 'loading'
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
    getLoggedInUser()
  }, [])
  const randomiseUser = () => {
    createUserInfo()

    userBioRandomiser()
    retrieveActivities()
    retrieveQuestions()


  }
  const matchUpdate = (bool) => {
    setMatchProfile(bool)
  }
  const getLoggedInUser = () => {
    // setLoading(true)
    // return fetch('http://localhost:4000/loggedInUser')
    // .then(resp => resp.json())
    // .then(data => {
    //   setLoading(false)
    //   setLoggedInUser(data)})
    // .catch(err => console.error(err))
  }
  const renderScore = (correctAnswer, answer, id) => {
    let found = userScore.map((each, index) => {
      if (each.id === id) {
        return index
      }

    })
    found = found.filter(each => (typeof each) === 'number')
    if (found.length === 1) {
      userScore.splice(found[0], 1)
      setUserScore([...userScore, { id: id, correct: (correctAnswer === answer) }])

    }
    else {

      setUserScore([...userScore, { id: id, correct: (correctAnswer === answer) }])
    }



  }
  const calculateScore = () => {
    let count = 0
    userScore.map((each, index) => {

      if (each.correct === true) {
        return count += 1
      }
    })
    setUserScore([])
    setScore(count)
    count = 0
  }
  const submitUserSignup = (email, firstName, lastName, password, profilePicture, userBio, age, gender, favouriteActivities, preference) => {
    fetch(`http://localhost:4000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
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
  const login = (user) => {
    console.log('user',user)
    // fetch('http://localhost:4000/loggedInUser/1', {
    //   method:'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }, 
    //   body: JSON.stringify({user})
      
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //   setIsLoggedIn(true)})
    // .catch(err => console.error(err))
    setIsLoggedIn(true)
    setLoggedInUser(user)
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
        let data = [
          {
            "id": 1,
            "question": "I’VE BEEN WATCHING X. ANY GOOD MOVIES OR TV SHOWS?",
            "answers": [
              "yes",
              "no",
              "X-men",
              "idk"
            ],
            "correctAnswer": "X-men"
          },
          {
            "id": 2,
            "question": "What's your biggest fear??",
            "answers": [
              "Spiders",
              "Death",
              "Clowns",
              "Batman"
            ],
            "correctAnswer": "Batman"
          },
          {
            "id": 3,
            "question": "Want to guess what my passive-aggressive coworker emailed me today?",
            "answers": [
              "yes",
              "no",
              "something stupid?",
              "idk"
            ],
            "correctAnswer": "something stupid?"
          },
          {
            "id": 4,
            "question": "If I pay for drinks, can I complain about my terrible roommate clogging the sink again?",
            "answers": [
              "yes",
              "no",
              "If you want",
              "idk"
            ],
            "correctAnswer": "If you want"
          },
          {
            "id": 5,
            "question": "While walking: Music or Podcasts??",
            "answers": [
              "Music",
              "Podcasts",
              "Neither"
            ],
            "correctAnswer": "Music"
          },
          {
            "id": 6,
            "question": "So, you married?",
            "answers": [
              "yes",
              "no"
            ],
            "correctAnswer": "no"
          },
          {
            "id": 7,
            "question": "Cutest animal?",
            "answers": [
              "Dog",
              "Cat",
              "Frog",
              "Camel"
            ],
            "correctAnswer": "Dog"
          },
          {
            "id": 8,
            "question": "Dog or Cat?",
            "answers": [
              "Dog",
              "Cat",
              "Neither"
            ],
            "correctAnswer": "Dog"
          },
          {
            "id": 9,
            "question": "Netflix or YouTube?",
            "answers": [
              "Netflix",
              "YouTube",
              "Neither"
            ],
            "correctAnswer": "Netflix"
          },
          {
            "id": 10,
            "question": "Phone Call or Text?",
            "answers": [
              "Phone Call",
              "Text",
              "FaceTime"
            ],
            "correctAnswer": "Text"
          },
          {
            "id": 11,
            "question": "Toast or Eggs?",
            "answers": [
              "Toast",
              "Eggs",
              "Both"
            ],
            "correctAnswer": "Both"
          },
          {
            "id": 12,
            "question": "Cardio or Weights?",
            "answers": [
              "Cardio",
              "Weights",
              "Both",
              "Neither"
            ],
            "correctAnswer": "Weights"
          },
          {
            "question": "favorite food?",
            "answers": [
              "spaghetti",
              "tacos"
            ],
            "correctAnswer": "spaghetti",
            "id": 15
          },
          {
            "question": "favorite food?",
            "answers": [
              "spaghetti",
              "tacos",
              "pizza",
              "burgers"
            ],
            "correctAnswer": "spaghetti",
            "id": 16
          },
          {
            "question": "do you like pina coladas?",
            "answers": [
              "yes",
              "no"
            ],
            "correctAnswer": "yes",
            "id": 17
          },
          {
            "question": "are you funny?",
            "answers": [
              "i think so",
              "sometimes",
              "never - humor is stupid"
            ],
            "correctAnswer": "i think so",
            "id": 18
          },
          {
            "question": "How many days in a year?",
            "answers": [
              "365",
              "256",
              "1200"
            ],
            "correctAnswer": "365",
            "id": 19
          },
          {
            "question": "How old am I?",
            "answers": [
              "24",
              "32",
              "1"
            ],
            "correctAnswer": "24",
            "id": 20
          },
          {
            "question": "Cats",
            "answers": [
              "No"
            ],
            "correctAnswer": "No",
            "id": 21
          },
          {
            "question": "How many chickens does it take to screw in a light bulb?",
            "answers": [
              "1",
              "2",
              "3"
            ],
            "correctAnswer": "1",
            "block": 0,
            "data": {
              "id": "13a74ccb-d9d3-423a-a20b-e290e696445e",
              "value": "1"
            },
            "id": 22
          },
          {
            "question": "How many ducks do i have?",
            "answers": [
              "3",
              "2",
              "1"
            ],
            "correctAnswer": "3",
            "block": 0,
            "data": {
              "id": "ef41e3bc-c665-4f08-87f1-a71d99256763",
              "value": "3"
            },
            "id": 29
          },
          {
            "question": "What does USA stand for?",
            "answers": [
              "United States of America",
              "OOSA",
              "Ball"
            ],
            "correctAnswer": "United States of America",
            "block": 1,
            "data": {
              "id": "b8f21c26-faee-41be-a392-42cecd23dc74",
              "value": "2"
            },
            "id": 30
          },
          {
            "question": "Cats or dogs?",
            "answers": [
              "Dogs",
              "Cats",
              "Pigs"
            ],
            "correctAnswer": "Dogs",
            "block": 0,
            "data": {
              "id": "d4d09640-5b75-4803-93db-b0a46eb55857",
              "value": "Dogs"
            },
            "id": 31
          },
          {
            "question": "Squirrels or Bears?",
            "answers": [
              "Bears",
              "Squirrels"
            ],
            "correctAnswer": "Bears",
            "block": 1,
            "data": {
              "id": "b5e32d37-36f5-486d-80a8-d9c12e740471",
              "value": "Cats"
            },
            "id": 32
          },
          {
            "question": "Water or juice?",
            "answers": [
              "Water",
              "Juice"
            ],
            "correctAnswer": "Water",
            "block": 2,
            "data": {
              "id": "353b3118-ae1b-4fd6-9eba-51ec14f894f8",
              "value": "Pigs"
            },
            "id": 33
          },
          {
            "question": "Squirrels or Bears?",
            "answers": [
              "Bears",
              "Squirrels"
            ],
            "correctAnswer": "Bears",
            "block": 0,
            "data": {
              "id": "3b552b51-826a-4551-b68c-7b3801757d65",
              "value": "Bears"
            },
            "id": 34
          },
          {
            "question": "Squirrels or Bears?",
            "answers": [
              "Bears",
              "Squirrels"
            ],
            "correctAnswer": "Bears",
            "block": 0,
            "data": {
              "id": "cad04006-2042-41d7-8e70-0ea0bb3f8f5d",
              "value": "Bears"
            },
            "id": 35
          },
          {
            "question": "Water or juice?",
            "answers": [
              "Water",
              "Juice",
              "Neither"
            ],
            "correctAnswer": "Water",
            "block": 1,
            "data": {
              "id": "2a3dbc49-a18f-4ff2-a40a-f0a2e1b4df92",
              "value": "Squirrels"
            },
            "id": 36
          },
          {
            "question": "How many chickens does it take to screw in a light bulb?",
            "answers": [
              "3",
              "1"
            ],
            "correctAnswer": "3",
            "block": 2,
            "data": {
              "id": "7dbcea1f-f343-417c-af9f-16dc9b034073",
              "value": "Water"
            },
            "id": 37
          }
        ]
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
      


  }

  const userBioRandomiser = () => {
    let data = [
      "Hi! I am brand new to online dating. While I’m still figuring this all out, here’s something I know for sure—I’m excited to be here! The chance to meet unique, engaging, and interesting women is pretty dang neat. If you think you might fit that mold, drop me a message. I work in the finance industry. And while I like to work hard, I make sure to leave time to enjoy life. I’m a fan of wine, movies, hiking, and getting out of town for the weekend. Let’s chat and see if maybe we’re a good fit!",
      "Isn’t online dating a blast? Okay, maybe it can be challenging at times, but it’s still exciting that you have the chance to meet someone special who you might have never met elsewhere. I’m a proud dog mom, an avid gym-goer, and, if you ask my friends, a bit quirky at times. I’m looking for a man who compliments my life and is ready to enjoy all that this world has to bring to the table. If you think we might be a good match, send me a message.",
      "Hi! If I had to pick three words to describe me they would be positive, a little shy, and someone who loves to laugh. Okay, that was a few more than three words, but it’s fun to break the rules from time to time, right? I’m new to online dating, but I know what I’m looking for in a man. My Christian faith is important to me, so I want to find a man who feels the same way. Additionally, I’m really into movies, so a guy who likes to cuddle up on the couch instead of going out on a Friday night is the right match for me. If you think maybe we could be right for each other, send me a message! I’m kind of shy, but if you reach out, I come out of my shell.",
      "Hi, I’m Ted! Thanks for stopping by my online dating profile. I’m not the best at describing myself, so I reached out to a few friends and asked them to tell me what I’m like so I could share that with you. Here’s what they had to say. Ted is driven, goal-oriented, and goes after what he wants in life.Ted is a real catch. He’s caring, dependable, and someone who could really be your rock. If you want to see if my friends are right or they’re just telling me what I want to hear (kidding), we should chat! Send me a message and let’s start the conversation..",
      "Hi, I'm Joe. I'm an attorney by day, and in my spare time, I'm writing my first novel. Training for the next marathon is my go-to stress relief. I'm an avid reader of the Economist and the Atlantic. I keep up-to-date with politics but try to stay out of the drama. Early morning meditation is my spiritual practice. My ex-wife and I co-parent our two kids. I'm here on this app to meet you so can you do me one favor to help me out? I have a quick question for you to answer. What's the first date you've always wanted to go on and have never come close to? Click the message button and let me know!",
      "Hi, I'm Sam. I own my own Software Development company. I love jazz and go watch my favorite bands as often as possible. To get out of my head, I go rock climbing. I grew up in a very political family and I carry on that tradition by being active in the local campaigns. I find a lot of peace by attending church on Sunday mornings and by being a part of that community. I've been in a couple of great long term relationships and am ready to find someone special to build a life with. Send me a message and let me know what your favorite type of food is. I know the best spots in town!"
    ]
      setUserBio(data[Math.floor(Math.random() * data.length)])
      

  }
  const retrieveActivities = () => {
    let data = [
      "Rogue Lawnmowing",
      "Woodworking",
      "Croquet",
      "Sculpting",
      "Ax Throwing",
      "Weight Lifting",
      "Chess",
      "Crocheting",
      "Video Game Collecting",
      "jogging",
      "Scrapbooking",
      "Bird Watching",
      "Storm Chasing",
      "Bullion Collecting",
      "Needlepoint",
      "Soap Making",
      "ButterFly Watching",
      "Tennis"
    ]
        let activities = []
        for (let i = 0; i <= 3; i++) {
          activities.push(data[Math.floor(Math.random() * data.length)])
        }
        setActivities(activities)

  }
  const createUserInfo = () => {
    setLoading(true)
    let options = ['male', 'female']
    let preference = loggedInUser.preference === "Both" ? Math.floor(Math.random() * options.length) : loggedInUser.preference.toLowerCase()
    console.log('preference', loggedInUser.preference === "Both" ? options[preference] : loggedInUser.preference.toLowerCase())
    fetch(`${userInfoAPI}?gender=${loggedInUser.preference === "Both" ? options[preference] : loggedInUser.preference.toLowerCase()}`)
      .then(resp => resp.json())
      .then(data => {
        fetchUserdata(loggedInUser.preference === "Both" ? options[preference] : loggedInUser.preference.toLowerCase())
        setUserInfo(data)
      })
      .catch(err => console.error(err))

  }
  const fetchUserdata = (preference) => {
    fetch(`${apiLink}/photos/random?query=${preference}&client_id=21gTlhq_CUWz1HLMpJCV9YkjWdxt1mlGo36uQXMsL7g`)
      .then(resp => resp.json())
      .then(data => {
        setLoading(false)
        setPhoto(data.urls.small)
      })
      .catch(err => console.error(err))


  }
  const updateLoggedInUser = (update) => {
    setLoggedInUser(update)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setLoggedInUser('')
  }
  return (
    <div>

      <Router basename={"/CompatabL"}>

        <Navbar className='nav-bar'>
          <img src={Logo} alt='CompatabL Logo' style={{ width: '15%', borderRadius: '25px', marginLeft: '5px' }} />
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
            {isLoggedIn ? <Redirect to='/compatabl' /> : <Login login={login} />}
          </Route>

          <Route exact path="/compatabl">
            <>
              <SwipeContainer loading={loading} randomiseUser={randomiseUser} userBio={userBio} activities={activities} userInfo={userInfo} photo={photo} />
              <LikeDislikeContainer saveSelectedUser={saveSelectedUser} randomiseUser={randomiseUser} />
            </>
          </Route>

          <Route exact path="/profile">
            { !loading && <Profile matchProfileUpdate={matchUpdate} updateLoggedInUser={updateLoggedInUser} match={matchProfile} user={loggedInUser} />}
          </Route>

          <Route exact path="/signup">
            <Signup submitUserSignup={submitUserSignup} />
          </Route>

          <Route exact path="/login">
            <Login accountCreated={accountCreated} login={login} />
          </Route>
          <Route path='*' exact={true}  >
              <RouteNotFound />
            </Route>


        </Switch>
      </Router>


    </div>
  )
}
export default Application

//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY