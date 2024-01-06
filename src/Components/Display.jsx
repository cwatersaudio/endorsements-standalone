import React from "react"
import Accolade from "./Accolade"


export default function Endorsements ({pastEndorsements,handleChange,addLike,localLikes}) {

const endorsementDisplay = pastEndorsements.map(item => {
    const {id, to, from, accolade, likes} = item[1]
    return (
        <Accolade 
        key={item[0]}
        id={item[0]}
        to={to}
        from={from}
        accolade={accolade}
        handleChange={handleChange}
        addLike={addLike}
        likes={likes}
        />
    )
})


return (
    <div id="endorsementDisplay">
        {endorsementDisplay}
    
    </div>
)

}
