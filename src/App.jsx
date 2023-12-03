import React from "react"
import Header from "./Components/Header"
import Input from "./Components/Input"
import Display from "./Components/Display"
import './App.css'


export default function App () {
    const [endorsements,setEndorsements] = React.useState({
    pastEndorsements:[],
    currentEndorsement: {from:"", to:"", accolade:""}
    })
    //iniitialize currentEndorsement with an id using nanoid()


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
      currentEndorsement: {from:"", to:"", accolade:""}
  }})
  }
//set new id with nanoid()

  
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

    //add addLikes() function
    //save hasLiked in local storage
    //save 'likes' in state
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
          />
      </main>
    </>
  )
  }
