import React from "react"
import Accolade from "./Accolade"


export default function Endorsements ({pastEndorsements,handleChange,addLike}) {

const endorsementDisplay = pastEndorsements.map(item => {
    console.log(item);
    return (
        <Accolade 
        key={item.id}
        id={item.id}
        to={item.to}
        from={item.from}
        accolade={item.accolade}
        handleChange={handleChange}
        addLike={addLike}
        likes={item.likes}
        />
    )
})


return (
    <div id="endorsementDisplay">
        {endorsementDisplay}
    
    </div>
)

}
