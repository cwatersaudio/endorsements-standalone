import React from "react"

export default function Input ({currentEndorsement,handleChange,addEndorsement}) {
    return (
        <form className="input--container">
            <textarea 
            placeholder="Write endorsement here..."
            className="endorsement--box user--input" 
            name="accolade"
            value={currentEndorsement.accolade}
            onChange={handleChange}
            >
                
            </textarea>
            <div id="to-from--area"> 
                <input 
                placeholder="To:"
                className="to-from--input "
                type="text" 
                name="to"
                onChange={handleChange}
                value={currentEndorsement.to}
                //need to figure out a way to display default values
                />
                <input 
                placeholder="From:"
                className="to-from--input " 
                type="text" 
                name="from"
                value={currentEndorsement.from}
                onChange={handleChange}
                />
            </div>
            {currentEndorsement.to.length > 0 
            && currentEndorsement.from.length > 0
            && currentEndorsement.accolade.length > 0 
            && <button 
            id="submitButton" 
            onClick={addEndorsement}
            > 
                Publish
            </button>}
            
        
        </form>

    )

}
