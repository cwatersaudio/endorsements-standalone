import {initializeApp} from 'https://endorsements-aa2b6-default-rtdb.firebaseio.com/'
import { getDatabase, ref, push, onValue } from "https://endorsements-aa2b6-default-rtdb.firebaseio.com/"
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
const endorsementdb =  ref(database, "endorsements")

export default function App () {
    const [endorsements,setEndorsements] = React.useState({
    pastEndorsements: Object.entries(snapshot.val()),
    currentEndorsement: {from:"", to:"", accolade:"", id:nanoid(), likes:0}
    })








  React.useEffect(() => {
      localStorage.setItem("endorsements", JSON.stringify(endorsements))
  },[endorsements]) 

  function addEndorsement (event) {
    event.preventDefault()

    setEndorsements(prevEndorsements => {
          return {
            ...prevEndorsements,
            pastEndorsements: [prevEndorsements.currentEndorsement, ...prevEndorsements.pastEndorsements]
          }
          
          })
      resetCurrentEndorsement()

  }

  function resetCurrentEndorsement () {
    setEndorsements(prevEndorsements => {
      return {
      ...prevEndorsements,
      currentEndorsement: {from:"", to:"", accolade:"", id:nanoid(), likes:0}
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
    itemToUpdate.likes += 1
    console.log(itemToUpdate)
    setEndorsements(prevEndorsements => {
      
      return {
        ...prevEndorsements,
        [prevEndorsements.pastEndorsements[id]]: itemToUpdate
      }
    })
       //save hasLiked in local storage
  }
 

console.log(endorsements)  
  
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
