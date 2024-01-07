import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import React from "react"
import Header from "./Components/Header"
import Input from "./Components/Input"
import Display from "./Components/Display"
import './App.css'


const appSettings = {
  databaseURL: "https://endorsements-aa2b6-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementDb =  ref(database, "endorsements")
let firebaseEndorsements=[]
let localLikes = []



export default function App () {
    const [endorsements,setEndorsements] = React.useState({
    pastEndorsements: firebaseEndorsements, //local state is set by firebase DB
    currentEndorsement: {from:"", to:"", accolade:"", likes:0}
    })

  

  React.useEffect(() => {
      onValue(endorsementDb, (snapshot)=> { //state is updated with firebase DB
        firebaseEndorsements = Object.entries(snapshot.val())
        setEndorsements(prevEndorsements => {
          return {
          ...prevEndorsements,
          pastEndorsements: firebaseEndorsements
          }
        })
      })
  },[]) //what should be the thing in the array?

  let localLikeArray = endorsements.pastEndorsements.map(item => { //local array of item IDs and hasLiked boolean
    return {
      likeID : item[0],
    }
  }
  )
  
  
  React.useEffect(()=>{
    console.log(localLikeArray);

    localStorage.setItem("endorsements", JSON.stringify(localLikeArray)) //localStorage keeps copy of endorsements as well, for the purpose of hasLiked
    // localLikes = JSON.parse(localStorage.getItem("endorsements"))

    // console.log(localLikes);
  },[localLikeArray])

console.log(endorsements);


  function addEndorsement (event) {
    event.preventDefault()
    
      resetCurrentEndorsement()
      push(endorsementDb,endorsements.currentEndorsement) //how to add to beginning of db??
  }

  function resetCurrentEndorsement () {
    setEndorsements(prevEndorsements => {
      return {
      ...prevEndorsements,
      currentEndorsement: {from:"", to:"", accolade:"", likes:0}
  }})
  }

  
  function handleChange (event) { //updates currentValue live
    const {value,name} = event.target

    setEndorsements(prevEndorsements => {
          return {
          ...prevEndorsements,
          currentEndorsement: 
          {...prevEndorsements.currentEndorsement,
            [name]: value
          }
          
      }
      })
    }
  function addLike(id) {
    // console.log(localLikes);
    let localValue = localLikeArray.find((item)=> item.likeID === id) 
    let localIndex = localLikeArray.findIndex((item)=> item.likeID === id) 
    let itemToUpdate = endorsements.pastEndorsements.find((item)=> item[0] === id)
    console.log(localIndex);

    if (!localValue.hasLiked) {
    itemToUpdate[1].likes += 1
    localLikeArray[localIndex].hasLiked = true
    console.log(localLikeArray)

    // setEndorsements(prevEndorsements => {
      
    //   return {
    //     ...prevEndorsements,
    //     [prevEndorsements.pastEndorsements[id]]: itemToUpdate
    //   }
    // })
    const updates = {};
    updates[itemToUpdate[0] + '/' + 'likes' ] = itemToUpdate[1].likes;




    update(endorsementDb, updates) 
  }
  }

  function resetLike(id) { //resets hasLiked in DB --> would want to change to localStorage if possible
    console.log("double click")
    let localIndex = localLikeArray.findIndex((item)=> item.likeID === id) 

    localStorage.setItem("endorsements", (prevLocal)=> {
      return [
        ...prevLocal,
        prevLocal[localIndex].hasLiked = false
      ]
    })
  }
 
  
return (
    <>
      <main>
          <Header />
          <Input 
          handleChange={handleChange}
          currentEndorsement={endorsements.currentEndorsement}
          addEndorsement={addEndorsement}
          
          />
          <Display
          pastEndorsements = {endorsements.pastEndorsements}
          handleChange={handleChange}
          addLike={addLike}
          localLikes ={localLikes}
          resetLike={resetLike}
          />
      </main>
    </>
  )
  }
