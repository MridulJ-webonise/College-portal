import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import verifyAccess from '../auth/auth';
import Navbar from './Navbar';

function Departments() {
  const history = useHistory();
  const [departments, setDepartments] = useState([]);
  const [accessType, setAccessType] = useState('')
  const token = localStorage.getItem('token');

  useEffect(() => {
    let accessState = verifyAccess();

    switch( accessState.access )
    {
      case 'no-access' : history.replace('./login');
      case 'student' : setAccessType('student');break;
      case 'admin' : setAccessType('admin'); break;
    }

  });

  useEffect(async () => {
    
    let allDepts = await getAllDepartments();
    setDepartments([...allDepts]);

  }, []);

  const getAllDepartments = async()=>{
    let deptResponse = await axios.get('http://localhost:4000/departments/',{
      headers: {
        'x-auth-token' : token,
      }
    });
    return deptResponse.data;
  }

  // const handleDelete = async (Student_ID)=>{

  //   await axios.delete(`http://localhost:4000/users/${Student_ID}`,{
  //     headers: {
  //       'x-auth-token' : token,
  //     }
  //   })
  //   setStudents( await getAllStudents() );
  // }

  return (
    <div className="container">
      <div className="row">
        <Navbar />
      </div>

      <div className="row">
        <div className="col-1">
        </div>

        <div className="col-9">

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Department ID</th>
                <th scope="col">Department</th>
                <th scope="col">HOD</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((deptObj) => {
                return (
                  <tr>
                    <td>{deptObj.Dept_ID}</td>
                    <td>{deptObj.Name}</td>
                    <td>{deptObj.HOD}</td>
                    {/* { 
                      <td><button disabled={accessType=='student'} onClick={ ()=>{ handleDelete(studentObj.Student_ID) } } >Del</button></td>
                    } */}
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

export default Departments;
