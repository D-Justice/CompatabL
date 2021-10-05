  import React from 'react'
  const apiLink = 'https://api.unsplash.com/'
  const activityUrl = 'http://localhost:4000/hobbies'
  const keyUrl = 'http://localhost:4001/keys'
  const bioUrl = 'http://localhost:4000/biographies'
  const userInfoAPI = 'https://randomuser.me/api/'
export default class RandomUser extends React.Component{
    
      retrieveKeys = () => {
        return fetch(`${keyUrl}`)
          .then(resp => resp.json())
          .then(keys => {
            
            

            return keys[0].accessKey
            
          })
      }
      userBioRandomiser = () => {
        return fetch(`${bioUrl}`)
          .then(resp => resp.json())
          .then(data => {
            return data[Math.floor(Math.random() * data.length)]
          })
      }
      retrieveActivities = () => {
        return fetch(`${activityUrl}`)
          .then(resp => resp.json())
          .then(data => {
            let activities = []
            for (let i = 0; i <= 3; i++) {
              activities.push(data[Math.floor(Math.random() * data.length)])
            }
            return activities
          })
      }
      createUserInfo = () => {
        return fetch(`${userInfoAPI}`)
          .then(resp => resp.json())
          .then(data => {
            return data})
      }
      fetchUserdata = () => {
        return fetch(`${apiLink}/photos/random?query=person&client_id=21gTlhq_CUWz1HLMpJCV9YkjWdxt1mlGo36uQXMsL7g`)
          .then(resp => resp.json())
          .then(data => {
            
            return data.urls.small
          })
}
}