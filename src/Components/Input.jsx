import React from "react"

export default function Input (props) {

    return (
        <div className="input--container">
            <textarea 
            className="input--box user--input" 
            name="accolade"
            value={props.current.accolade}
            onChange={props.handleChange}
            >
                
            </textarea>
            <div className="to-from--area"> 
                <input 
                className="user--input"
                type="text" 
                name="to"
                value={props.current.to}
                onChange={props.handleChange}
                //need to figure out a way to display default values
                />
                <input 
                className="user--input" 
                type="text" 
                name="from"
                value={props.current.from}
                onChange={props.handleChange}
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
