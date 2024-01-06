import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
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
    pastEndorsements: firebaseEndorsements, //local state is set by firebase DB
    currentEndorsement: {from:"", to:"", accolade:"", id:nanoid(), likes:0, hasLiked:false}
    })



  React.useEffect(() => {
      localStorage.setItem("endorsements", JSON.stringify(endorsements)) //localStorage keeps copy of endorsements as well, for the purpose of hasLiked
      onValue(endorsementDb, (snapshot)=> { //state is updated with firebase DB
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
    setEndorsements(prevEndorsements => {
      
      return {
        ...prevEndorsements,
        [prevEndorsements.pastEndorsements[id]]: itemToUpdate
      }
    })
    // const updates = {};
    // updates['endorsements/' + itemToUpdate.id + '/' + 'likes' ] = itemToUpdate.likes;
    // updates['endorsements/' + itemToUpdate.id + '/' + 'hasLiked' ] = itemToUpdate.hasLiked;

    
    // update(endorsementDb, updates)
    

  }
 // needs to write to db and not update state
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
          />
      </main>
    </>
  )
  }
