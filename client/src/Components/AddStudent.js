import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Input from './Input'
import CheckBoxInput from './CheckBoxInput';
import RadioInput from './RadioInput';

function AddStudent() {

    const [name, setName] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [department, setDepartment] = useState([]);
    const [userType, setUserType] = useState('');
    const [allDepartments, setAllDepartments] = useState([]);

    useEffect(async() => {
        
        //fetch departments
        // let deptResponse = await axios.get('http://localhost:3000/department')
        let deptResponse = [
            {DeptID : 1, Name : 'CSE'},
            {DeptID : 2, Name : 'IT'},
            {DeptID : 3, Name : 'EEE'},
        ]
        
        // let DeptNames = [];

        // deptResponse.map( (dept) =>{
        //     DeptNames.push(dept.Name);
        // } )
        setAllDepartments(deptResponse);

    }, [])

    const handleNameChange =(value)=>{
        setName(value);
    }

    const handlePhonenoChange =(value)=>{
        setPhoneno(value);
    }

    const handleDepartmentChange =(value)=>{
        setDepartment(value);
    }

    const handleUserTypeChange = (value)=>{
        setUserType(value);
    }

    const handleSubmit = async()=>{
        axios.post('http://localhost:3000/user/addUser',{
            name,
            phoneno,
            department,
            userType
        })
        .then( (res)=>{
            console.log(res.msg);
        } )
        .catch( (e)=>{
            console.log(e);
        } )
    }

    return (
        <div>
            <Input label='Name' type='text' value={name} handleChange = {handleNameChange} />            
            <Input label='Phone Number' type='text' value={phoneno} handleChange = {handlePhonenoChange} />            
            <CheckBoxInput label='Departments' data={allDepartments} value={department} handleChange = {handleDepartmentChange} />            
            <RadioInput label='User Type' value={userType} handleChange = {handleUserTypeChange} />
            <button onClick={handleSubmit} >Create User</button>
        </div>
    )
}

export default AddStudent
