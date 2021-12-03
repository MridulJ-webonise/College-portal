import React, { useState, useEffect } from 'react';
import Input from './Input';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import verifyAccess from '../auth/auth';

function AddDepartment() {
  const [name, setName] = useState('');
  const [HOD, setHOD] = useState('');
  const [deptId, setDeptId] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const token = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    const accessState = verifyAccess();
    if (accessState.access != 'admin') {
      history.replace(accessState.redirectPath);
    }    
  }, [])

  const handleNameChange = (val) => {
    setName(val);
  };

  const handleHODChange = (val) => {
    setHOD(val);
  };

  const handleDeptIdChange = (val) => {
    setDeptId(val);
  };

  const handleInputChange = () => {
    if (!isNaN(deptId) && name.length > 0 && HOD.length > 0) {
      setBtnDisabled(false);
    } else setBtnDisabled(true);
  };

  const handleSubmit = () => {
    axios
      .post(
        'http://localhost:4000/departments/addDepartment',
        {
          Dept_ID: deptId,
          Name: name,
          HOD: HOD,
        },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      )
      .then((res) => {
        console.log(res.msg);
        history.replace('/users');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div onChange={handleInputChange}>
      <Input label="Department ID" type="text" value={deptId} handleChange={handleDeptIdChange} />
      <Input label="Department Name" type="text" value={name} handleChange={handleNameChange} />
      <Input label="HOD Name" type="text" value={HOD} handleChange={handleHODChange} />
      <button disabled={btnDisabled} onClick={handleSubmit}>
        Add Department
      </button>
    </div>
  );
}

export default AddDepartment;
