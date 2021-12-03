import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import verifyAccess from '../auth/auth';
import Navbar from './Navbar';

function Users() {
  const history = useHistory();
  const [currentDept, setCurrentDept] = useState('All Department');
  // const [currentDeptId, setCurrentDeptId ] = useState('allDept');
  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [accessType, setAccessType] = useState('')
  const token = localStorage.getItem('token');
  useEffect(() => {
    console.log( 'before verify' )

    let accessState = verifyAccess();
    console.log( 'after verify' )

    switch( accessState.access )
    {
      case 'no-access' : history.replace('/login');
      case 'student' : setAccessType('student');break;
      case 'admin' : setAccessType('admin'); break;
    }

  });

  useEffect(async () => {
    console.log( 'get stud/dept' )
    let allDepts = await getAllDepartments();
    setDepartments([{ Dept_ID: 'allDept', Name: 'All Department' }, ...allDepts]);

    setStudents(await getAllStudents());
  }, []);

  useEffect(async ()=>{
    console.log( 'set dept' )

    let studentDeptwise;
    if(currentDept=='All Department'){
      studentDeptwise = await getAllStudents()
    }
    else
      studentDeptwise = await getStudentsByDept(currentDept)
    
    console.log(studentDeptwise);
    setStudents(studentDeptwise);
  },[currentDept])

  const getAllDepartments = async()=>{
    let deptResponse = await axios.get('http://localhost:4000/departments/',{
      headers: {
        'x-auth-token' : token,
      }
    });
    return deptResponse.data;
  }

  const getAllStudents = async () => {
    let userResponse = await axios.get('http://localhost:4000/users/',{
      headers: {
        'x-auth-token' : token,
      }
    });
    return userResponse.data;
  };

  const handleDeptChange = (deptId, deptName) => {
    console.log(deptId, deptName, currentDept);
    if (deptId == 'allDeptId') {
      setCurrentDept('All Departments');
    }

    setCurrentDept(deptName);
  };

  const getStudentsByDept = async(deptId) =>{
    
    let studentsDeptwiseResponse = await axios.get(`http://localhost:4000/users/byDept/${currentDept}`,{
      headers: {
        'x-auth-token' : token,
      }
    })
    
    console.log('getstudentdeptwise', studentsDeptwiseResponse.data )
    return studentsDeptwiseResponse.data;
  }

  const handleDelete = async (Student_ID)=>{

    await axios.delete(`http://localhost:4000/users/${Student_ID}`,{
      headers: {
        'x-auth-token' : token,
      }
    })
    setStudents( await getAllStudents() );
  }

  return (
    <div className="container">
      <div className="row">
        <Navbar />
      </div>

      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            {departments.map((deptObj) => (
              <li
                onClick={() => handleDeptChange(deptObj.Dept_ID, deptObj.Name)}
                className="list-group-item"
                key={deptObj.Dept_ID}
                style={ {cursor:'pointer'} }>
                {deptObj.Name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-9">

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {students.map((studentObj) => {
                return (
                  <tr>
                    <td>{studentObj.Name}</td>
                    <td>{studentObj.Phone_Number}</td>
                    { 
                      <td><button disabled={accessType=='student'} onClick={ ()=>{ handleDelete(studentObj.Student_ID) } } >Del</button></td>
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
