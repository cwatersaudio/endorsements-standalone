import React from "react";

export default function Accolade (props) {
    
    return(
        <div className="accolade--container">
            <p className="bold">{props.from}</p>
            <p>{props.accolade}</p>
            <p className="bold">{props.to}</p>

        </div>
    )

}