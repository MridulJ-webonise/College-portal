const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next, ){
  const token = req.header('x-auth-token');
  console.log(token);
  if(!token ) res.status(401).json({msg:'Un-authorized access'});

  try{
    
    //verify token
    const decoded = jwt.verify( token, config.get('jwtSecretKey') );
    if( decoded?.user?.userType != 'admin' )
      res.status(401).json({msg: 'Restricted Access'});
    
    req.user = decoded;
  
    next;
  }
  catch(e){
    res.status(400).json({msg: 'Invalid token'})
  }
}

module.exports = auth;
