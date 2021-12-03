const config = require('config');
const jwt = require('jsonwebtoken');

async function auth(req, res, next){

  const token = req.headers['x-auth-token'];

  if(!token ) res.status(401).json({msg:'Un-authorized access'});

  try{
    //verify token
    const decoded = jwt.verify( token, config.get('jwtSecretKey') );
    console.log(decoded);
    if( req.method != 'GET' && decoded.userType != 'admin' )
      res.status(401).json({msg: 'Restricted Access'});
    
    req.user = decoded;
    next();
  }
  catch(e){
    console.log(e)
    res.status(400).json({msg: 'Invalid token'})
  }
}

module.exports = auth;
