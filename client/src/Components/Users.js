import axios from 'axios'
import React, { useState,useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Navbar'

function Users() {

    const [currentDept, setCurrentDept] = useState('All Department')
    const [departments, setDepartments] = useState([ {id:'allDeptId', title:"All Department"} ])
    const [students, setStudents] = useState([])

    const localStudentArr = [];

    console.log(students?.length)
    useEffect(async() => {
        
        let deptResponse = await axios.get('https://jsonplaceholder.typicode.com/todos')
        setDepartments([{id:500, title:"All Department"}, ...deptResponse.data]);

        // let userResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
        // let filteredStudents = userResponse.data.filter( user =>{
        //     return user.userId == 1;
        // } )
        setStudents(await getAllStudents() );
    }, [])

    const getAllStudents = async()=>{
        
        let userResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
        let filteredStudents = userResponse.data.filter( user =>{
            return user.userId == 1;
        } )
        return filteredStudents
    }

    // const getStudentByDepartment = async(dept)=>{
        
    //     //localhost:3000/department/name/
    //     let userResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
    //     let filteredStudents = userResponse.data.filter( user =>{
    //         return user.userId == 1;
    //     } )
    //     return filteredStudents;
    // }

    // useEffect( ()=>{

    //     if(currentDept == 'All Departments')
    //         setStudents(getAllStudents());
        
    //     setStudents(getStudentByDepartment(currentDept))

    // }, [currentDept] )

    const handleDeptChange = (deptId, deptName)=>{
        
        if( deptId == 'allDeptId' )
            setCurrentDept( 'All Departments' );
        
        setCurrentDept(deptName);
    }

    return (
        <div className='container' >
            
            <div className='row' >
                <Navbar />
            </div>

            <div className='row' >
                <div className='col-3' >
                    <ul className="list-group">
                        {
                            departments.map( deptObj=>(
                                <li onClick={() => handleDeptChange(deptObj.id, deptObj.title)} className="list-group-item" key={deptObj.id} >{deptObj.title}</li>
                            ) )
                        }
                    </ul>
                </div>
                <div className='col-9' >
                {/* <ul className="list-group">
                        {
                            students?.length==0 ? <h1>Wait</h1> :
                            students.map( studentObj=>(
                                <li className="list-group-item" key={studentObj.id} >{studentObj.title}</li>
                            ) )

                        }
                    </ul> */}

                    <table className="table">
                    <thead>
                        <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map( studentObj =>{
                                return(
                                    <tr>
                                        {/* <th scope="row">1</th> */}
                                        <td>{studentObj.title}</td>
                                        <td>{studentObj.id}</td>
                                    </tr>
                                )
                            } )
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users

