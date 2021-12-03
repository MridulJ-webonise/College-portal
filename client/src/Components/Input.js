import React from "react";
import './Input.css'
function Input({label, type,value, handleChange}){
    
    return(
        <div className='input-field' >
            <label>
                {label}
            </label>
            <input value={value} type={type} onChange={ (event)=>{ handleChange(event.target.value)} } />
        </div>
    )
}

export default Input;
