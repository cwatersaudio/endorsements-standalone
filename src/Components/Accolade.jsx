import React from "react";

export default function Accolade (props) {
    function handleClick (event) {

        console.log(event);
    }
    return(
        <div className="accolade--container">
            <p className="bold">{props.from}</p>
            <p>{props.accolade}</p>
            <p className="bold">{props.to}</p>
            <button
            onClick={handleClick}
            //add name field
            //add 'likes' variable somewhere
            

            >💜</button>

        </div>
    )

}