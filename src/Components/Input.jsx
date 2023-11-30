import React from "react"

export default function Input (props) {

    return (
        <div className="input--container">
            <textarea className="input--box" placeholder="Write your endorsement here">
                {/* Endorsement text area here
                Need to initialize state and make some  functions */}
                
            </textarea>
            <button id="submitButton">
                Publish
            </button>
        
        </div>

    )

}
