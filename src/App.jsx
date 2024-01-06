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
    currentEndorsement: {from:"", to:"", accolade:"", likes:0, hasLiked:false}
    })



  React.useEffect(() => {
      localLikes = endorsements.pastEndorsements.map(item => { //local array of item IDs and hasLiked boolean
        return {
          likeID : item[0],
          hasLiked : false
        }
      }
      )
      
      localStorage.setItem("endorsements", JSON.stringify(localLikes)) //localStorage keeps copy of endorsements as well, for the purpose of hasLiked
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

console.log(endorsements);

  function addEndorsement (event) {
    event.preventDefault()

    setEndorsements(prevEndorsements => {
          return {
            ...prevEndorsements,
            pastEndorsements: [prevEndorsements.currentEndorsement, ...prevEndorsements.pastEndorsements]
          }
          
          }) //is this necessary?  Could just update DB directly perhaps?
      resetCurrentEndorsement()
      push(endorsementDb,endorsements.currentEndorsement) //how to add to beginning of db??
  }

  function resetCurrentEndorsement () {
    setEndorsements(prevEndorsements => {
      return {
      ...prevEndorsements,
      currentEndorsement: {from:"", to:"", accolade:"", likes:0, hasLiked:false}
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
    const itemToUpdate = endorsements.pastEndorsements.find((item)=> item[0] === id)
    const itemToCheck = localLikes.find((item) => item.likeID === id)
    console.log(itemToCheck)
    if (!itemToCheck.hasLiked) {
    itemToUpdate[1].likes += 1
    itemToUpdate[1].hasLiked=true;
    // setEndorsements(prevEndorsements => {
      
    //   return {
    //     ...prevEndorsements,
    //     [prevEndorsements.pastEndorsements[id]]: itemToUpdate
    //   }
    // })
    const updates = {};
    updates[itemToUpdate[0] + '/' + 'likes' ] = itemToUpdate[1].likes;
    updates[itemToUpdate[0] + '/' + 'hasLiked' ] = itemToUpdate[1].hasLiked;




    update(endorsementDb, updates) 
    

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
          localLikes ={localLikes}
          />
      </main>
    </>
  )
  }
