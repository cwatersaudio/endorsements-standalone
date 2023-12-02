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


  React.useEffect(() => {
      localStorage.setItem("endorsements", JSON.stringify(endorsements))
  },[endorsements]) 

  function addEndorsement (event) {
    event.preventDefault()
    
    setEndorsements(prevEndorsements => {
      resetCurrentEndorsement()
      return {
        ...prevEndorsements,
        pastEndorsements: prevEndorsements.pastEndorsements.unshift(prevEndorsements.currentEndorsement)
      }
      
    })
  }
  function resetCurrentEndorsement () {
    setEndorsements(prevEndorsements => {
      return {
      ...prevEndorsements,
      currentEndorsement: {from:"", to:"", accolade:""}
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
          />


      </main>
    
    </>

  )

  }
