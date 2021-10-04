import React, {useState, useEffect} from "react";


function Application() {
    const apiLink = 'https://api.unsplash.com/'
    const keyUrl = 'http://localhost:4001/keys'
    const [accessKey, setAccessKey] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const [photo, setPhoto] = useState('')
    
      useEffect(() => {
        retrieveKeys()
        fetchUserdata()
      }, [])
      const retrieveKeys = () => {
        fetch(`${keyUrl}`)
        .then(resp => resp.json())
        .then(keys => {
            setSecretKey(keys[0].secretKey)
            setAccessKey(keys[0].accessKey)})
      }
      const fetchUserdata = () => {
        fetch(`${apiLink}/photos/random?query=person&client_id=${accessKey}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.urls)
            setPhoto(data.urls.small)})
      }
    return (
        <div>
        <img src={photo} onClick={fetchUserdata}/>
        </div>
    )
}
export default Application

//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY