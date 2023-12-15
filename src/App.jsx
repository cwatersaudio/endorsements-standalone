import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import React from "react"
import Header from "./Components/Header"
import Input from "./Components/Input"
import Display from "./Components/Display"
import { nanoid } from 'nanoid'
import './App.css'


const appSettings = {
  databaseURL: "https://endorsements-aa2b6-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementDb =  ref(database, "endorsements")
let firebaseEndorsements=[]

export default function App () {
    const [endorsements,setEndorsements] = React.useState({
    pastEndorsements: firebaseEndorsements,
    currentEndorsement: {from:"", to:"", accolade:"", id:nanoid(), likes:0, hasLiked:false}
    })



  React.useEffect(() => {
      localStorage.setItem("endorsements", JSON.stringify(endorsements))
      onValue(endorsementDb, (snapshot)=> {
        firebaseEndorsements = Object.values(snapshot.val())
        setEndorsements(prevEndorsements => {
          return {
          ...prevEndorsements,
          pastEndorsements: firebaseEndorsements
          }
        })
        console.log(firebaseEndorsements)
        console.log(typeof(firebaseEndorsements))
      })
  },[]) //what should be the thing in the array?

  function addEndorsement (event) {
    event.preventDefault()

    setEndorsements(prevEndorsements => {
          return {
            ...prevEndorsements,
            pastEndorsements: [prevEndorsements.currentEndorsement, ...prevEndorsements.pastEndorsements]
          }
          
          })
      resetCurrentEndorsement()
      push(endorsementDb,endorsements.currentEndorsement) //how to add to beginning of db??

  }

  function resetCurrentEndorsement () {
    setEndorsements(prevEndorsements => {
      return {
      ...prevEndorsements,
      currentEndorsement: {from:"", to:"", accolade:"", id:nanoid(), likes:0, hasLiked:false}
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
    const itemToUpdate = endorsements.pastEndorsements.find((item)=> item.id === id)
    if (!itemToUpdate.hasLiked) {
    itemToUpdate.likes += 1
    itemToUpdate.hasLiked=true;
    console.log(itemToUpdate)
    setEndorsements(prevEndorsements => {
      
      return {
        ...prevEndorsements,
        [prevEndorsements.pastEndorsements[id]]: itemToUpdate
      }
    })
  }
 
  }
 
console.log(Object.values(endorsements))
  
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
          />
      </main>
    </>
  )
  }
