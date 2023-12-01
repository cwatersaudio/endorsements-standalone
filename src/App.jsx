import React from "react"
import Header from "./Components/Header"
import Input from "./Components/Input"
import Display from "./Components/Display"
import './App.css'


export default function App () {

  const [endorsements,setEndorsements] = React.useState({
    pastEndorsements:[],
    currentEndorsement: {id:1, from:"chris", to:"Allysen", accolade:"your're great! :)"}
  })


  React.useEffect(() => {
      localStorage.setItem("endorsements", JSON.stringify(endorsements))
  },[endorsements]) 

  function addEndorsement () {
    setEndorsements(prevEndorsements => {
      return {
          // add current value to beginning of state array
      }
      
    })
    //function to clear out 'current value'
  
  }

  //clearCurrentValue()
  
  function handleChange (event) { //updates currentValue live
    console.log(event.target.value)
    const {name,value,type} = event.target
    const {to,from,accolade} = endorsements.currentEndorsement
    setEndorsements(prevEndorsements => {
      return {
      ...endorsements,
      [name]: value
    }
    })

    
  }

  console.log(JSON.parse(localStorage.getItem("endorsements")));
  
  return (
    <>
      <main>
          <Header />
          <Input 
          handleChange={handleChange}
          current={endorsements}
          addEndorsement={addEndorsement}
          
          />
          <Display
          />


      </main>
    
    </>

  )

  }
