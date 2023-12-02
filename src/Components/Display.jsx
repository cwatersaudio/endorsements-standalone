import React from "react"
import Accolade from "./Accolade"


export default function Endorsements ({pastEndorsements,handleChange}) {

const endorsementDisplay = pastEndorsements.map(item => {
    console.log(item);
    return (
        <Accolade 
        key={item.index}
        to={item.to}
        from={item.from}
        accolade={item.accolade}
        handleChange={handleChange}
        />
    )
})


return (
    <div id="endorsementDisplay">
        {endorsementDisplay}
    
    </div>
)

}
