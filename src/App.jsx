import React from "react"
import Header from "./Components/Header"
import Input from "./Components/Input"
import Display from "./Components/Display"
import './App.css'


export default function App () {

  let endorsementArray = [];

  React.useEffect(() => {
      localStorage.setItem("endorsements", JSON.stringify(endorsementArray))
      console.log(JSON.parse(localStorage.getItem("endorsements")));

  },[endorsementArray]) 

  
  function handleChange (event) {
    console.log("Things are changing!");
    const {name,value,type} = event.target
    endorsementArray = () => {
      return {
      ...endorsementArray,
      [name]: value
    }

    
  }}

  console.log(JSON.parse(localStorage.getItem("endorsements")));
  
  return (
    <>
      <main>
          <Header />
          <Input 
          handleChange={handleChange}
          
          />
          <Display />


      </main>
    
    </>

  )

  }
