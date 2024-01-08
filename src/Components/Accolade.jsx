import React from "react";

export default function Accolade (props) {
    function handleClick (event){
        props.addLike(props.id)
    }
    return(
        <div className="accolade--container">
            <div className="top--bar to-from--display">
                <p>To: <span className="bold">{props.to}</span></p>
            </div>
            <p>{props.accolade}</p>
            <div className="bottom--bar">
                <div className="to-from--display">
                    <p >From: <span className="bold">{props.from}</span></p>
                </div>
                <button
                id="likeButton"
                onClick={handleClick}
                onContextMenu={()=>{props.resetLike(props.id)}}
                className="bold"
                >{`💜 ${props.likes}`}</button>
            </div>

        </div>
    )

}