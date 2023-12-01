import React from "react"

export default function Input (props) {

    return (
        <div className="input--container">
            <textarea 
            className="input--box user--input" 
            placeholder="Write your endorsement here"
            name="accolade"
            >
                {/* Endorsement text area here
                Need to initialize state and make some  functions 
                should call handleChange()
                value should be
                */}
                
            </textarea>
            <div className="to-from--area">
                <input 
                placeholder="To:"
                className="user--input"
                type="text" 
                name="to"
                // add value = props.to
                //add onChange
                />
                <input 
                placeholder="From:"
                className="user--input" 
                type="text" 
                name="from"
                //add value = props.from
                //add onChange
                />
            </div>
            <button id="submitButton" 
            // add onClick --> addEndorsement()
            > 
                Publish
            </button>
        
        </div>

    )

}
