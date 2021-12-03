// import { useHistory } from "react-router-dom";
// const config = require('config');
import config from '../config/config';
const jwt = require('jsonwebtoken');

function verifyAccess(){
  // const history = useHistory();
  console.log('verify')
  const token = localStorage.getItem('token');
  
  if(!token)  
  return {access:'no-access', redirectPath :'/login'};

  const decoded = jwt.verify( token, config['jwtSecretKey'] ) ;

  let accessType = decoded.userType;

  if( !accessType ){
    return {access:'no-access', redirectPath :'/login'};
  }
  
  if( accessType != 'admin' ){
    return {access:'student', redirectPath :'/restricted'};
  }
  
  return {access:'admin'}
}
export default verifyAccess;
