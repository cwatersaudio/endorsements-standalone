import React from "react"
import Accolade from "./Accolade"


export default function Endorsements ({pastEndorsements}) {

const endorsementDisplay = pastEndorsements.map(item => {
    console.log(item);
    return (
        <Accolade 
        key={item.index}
        to={item.to}
        from={item.from}
        accolade={item.accolade}
        />
    )
})


return (
    <div id="endorsementDisplay">
        {endorsementDisplay}
    
    </div>
)

}
