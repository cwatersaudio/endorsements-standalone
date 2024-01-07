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
// let localLikeArray;

export default function App () {
    const [endorsements,setEndorsements] = React.useState({
    pastEndorsements: firebaseEndorsements, //local state is set by firebase DB
    currentEndorsement: {from:"", to:"", accolade:"", likes:0, hasLiked:false}
    })

  React.useEffect(()=>{
    // localLikeArray = endorsements.pastEndorsements.map(item => { //local array of item IDs and hasLiked boolean
      //   return {
      //     likeID : item[0],
      //     hasLiked : false
      //   }
      // }
      // )
    localStorage.setItem("endorsements", JSON.stringify(endorsements)) //localStorage keeps copy of endorsements as well, for the purpose of hasLiked
    localLikes = JSON.parse(localStorage.getItem("endorsements"))

    console.log(localLikes);
  },[endorsements])

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
    console.log(localLikes);
    let localIndex = localLikes.pastEndorsements.find((item)=> item[0] === id) //
    let itemToUpdate = endorsements.pastEndorsements.find((item)=> item[0] === id)
    console.log(localIndex);
    console.log(itemToUpdate);

    if (!localIndex[1].hasLiked) {
    itemToUpdate[1].likes += 1
    localIndex[1].hasLiked=true;
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
  }

  function resetLike(id) { //resets hasLiked in DB --> would want to change to localStorage if possible
    console.log("double click")
    const itemToReset= endorsements.pastEndorsements.find((item)=> item[0] === id)
    itemToReset[1].hasLiked = false

    const updates = {};
    updates[itemToReset[0] + '/' + 'hasLiked' ] = itemToReset[1].hasLiked;
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
