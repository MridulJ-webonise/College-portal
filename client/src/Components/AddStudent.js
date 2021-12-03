import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Input from './Input';
import CheckBoxInput from './CheckBoxInput';
import RadioInput from './RadioInput';
import { useHistory } from 'react-router-dom';
import verifyAccess from '../auth/auth';

function AddStudent() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [department, setDepartment] = useState([]);
  const [userType, setUserType] = useState('');
  const [allDepartments, setAllDepartments] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const accessState = verifyAccess();
    // console.log(accessState)
    if (accessState.access != 'admin') {
      history.replace(accessState.redirectPath);
    }
  });

  useEffect(async () => {
    //fetch departments
    let deptResponse = await axios.get('http://localhost:4000/departments', {
      headers: {
        'x-auth-token': token,
      },
    });
    setAllDepartments(deptResponse.data);
  }, []);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handlePhonenoChange = (value) => {
    setPhoneno(value);
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const handleSubmit = () => {
    axios
      .post(
        'http://localhost:4000/users/addUser',
        {
          Name: name,
          Phone_Number: phoneno,
          Department: department,
          UserType: userType,
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

  const handleInputChange = () => {
    if (name.length > 0 && phoneno.length == 10 && userType) {
      if (userType == 'admin') {
        console.log(department);
        if (department.length > 0) setBtnDisabled(false);
        else setBtnDisabled(true);
      } else {
        setBtnDisabled(false);
      }
    } else setBtnDisabled(true);
  };

  return (
    <div onChange={handleInputChange}>
      <Input label="Name" type="text" value={name} handleChange={handleNameChange} />
      <Input label="Phone Number" type="text" value={phoneno} handleChange={handlePhonenoChange} />
      <RadioInput label="User Type" value={userType} handleChange={handleUserTypeChange} />
      <CheckBoxInput
        label="Departments"
        data={allDepartments}
        value={department}
        handleChange={handleDepartmentChange}
      />
      <button onClick={handleSubmit} disabled={btnDisabled}>
        Create User
      </button>
    </div>
  );
}

export default AddStudent;
