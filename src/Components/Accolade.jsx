import React from "react";

export default function Accolade (props) {
    function handleClick (event){
        props.addLike(props.id)
    }
    return(
        <div className="accolade--container">
            <p className="bold">{props.from}</p>
            <p>{props.accolade}</p>
            <p className="bold">{props.to}</p>
            <button
            onClick={handleClick}
            className="bold"
            //add name field


            >{`💜 ${props.likes}`}</button>

        </div>
    )

}