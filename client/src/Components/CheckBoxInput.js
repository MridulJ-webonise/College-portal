import React from 'react'

function CheckBoxInput({label, data, value, handleChange}) {

    const handleInputChange = (name, id)=>{
        let cb = document.querySelector(`#id${id}`)
        // console.log(cb.checked);
        if( cb.checked )
        {
            value.push(name);
        }
        else
        {
            let idx = value.indexOf(name);
            value.splice(idx,1);
        }
        handleChange(value)
    }
    
    return (
        <div>
            <label>{label}</label>
            {
                data.map( (dept) =>{
                    return (
                        <>
                            <input onChange={()=>{handleInputChange(dept.Name, dept.DeptID)}} type="checkbox" id={`id${dept.DeptID}`} value={`${dept.Name}`}/>
                            <label> {dept.Name}</label>
                        </>
                    )
                } )
            }
        </div>
    )
}

export default CheckBoxInput
