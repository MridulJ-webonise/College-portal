import React from 'react'

function RadioInput({label, value, handleChange}) {
    
    const handleInputChange = ()=>{
        let rbs = document.querySelectorAll('input[type="radio"]');

        let selectedValue='';
        for(let rb of rbs)
        {
            if( rb.checked )
            {
                selectedValue = rb.value;
            }
        }

        value = selectedValue;
        handleChange(value);
    }
    
    return (
        <div onChange={ () => {handleInputChange()} } >
            <label>{label}</label>
            <input type="radio" name="choice" value="student" id="choice-yes"/> 
            <label for="choice-yes">Student</label>
            <input type="radio" name="choice" value="admin" id="choice-no"/>
            <label for="choice-no">Admin</label>
        </div>
    )
}

export default RadioInput
