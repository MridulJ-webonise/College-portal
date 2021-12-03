import React from 'react'
import { useHistory } from 'react-router'

function Navbar() {

    const history = useHistory();

    const redirectAddStudent = () =>{
        history.push('/users/addUser');
    }

    const redirectAddDept = () =>{
      history.push('/departments/addDepartment');
    }

    const redirectStudents = ()=>{
      history.push('/users');
    }

    const redirectDepartments = ()=>{
      history.push('/departments');
    }

    const handleLogout = ()=>{
      localStorage.removeItem('token');
      history.replace('/login');
    }

    return (
        <ul class="nav nav-pills">
            <li class="nav-item">
                <div class="nav-link" onClick={ ()=>{redirectStudents()} } >Students</div>
            </li>
            <li class="nav-item">
                <div class="nav-link" onClick={ ()=>{redirectAddStudent()} } >Add Student</div>
            </li>
            <li class="nav-item">
                <div class="nav-link" onClick={()=>{redirectDepartments()}} >Departments</div>
            </li>
            <li class="nav-item">
                <div class="nav-link" onClick={()=>{redirectAddDept()}} >Add Department</div>
            </li>
            <li class="nav-item">
                <div class="nav-link" onClick={handleLogout} >Logout</div>
            </li>
        </ul>
    )
}

export default Navbar
