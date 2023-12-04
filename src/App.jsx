import React from "react"
import Header from "./Components/Header"
import Input from "./Components/Input"
import Display from "./Components/Display"
import { nanoid } from 'nanoid'
import './App.css'
import {addDoc, onSnapshot} from "firebase/firestore"
import { endorsementCollection } from "./firebase"



export default function App () {
    const [endorsements,setEndorsements] = React.useState({
    pastEndorsements:[],
    currentEndorsement: {from:"", to:"", accolade:"", likes:0}
    })

    let endorsementsArray;

  React.useEffect(() => {
    const unsubscribe = onSnapshot(endorsementCollection, function(snapshot){
    endorsementsArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      console.log(endorsementsArray);
    }) 
    return unsubscribe
   },[]) 

  async function addEndorsement (event) {
    event.preventDefault()
    const newEndorsementRef = await addDoc(endorsementCollection,endorsements.currentEndorsement)
    console.log(newEndorsementRef); 
    setEndorsements(prevEndorsements => {
          return {
            ...prevEndorsements,
            pastEndorsements: endorsementsArray
          }
          
          })
      resetCurrentEndorsement()

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
