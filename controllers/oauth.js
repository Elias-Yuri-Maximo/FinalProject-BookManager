require('dotenv').config();
const axios = require('axios')
const utils = require('../utils/utils')



const login = async(req,res)=> {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
};

/*
async function receive (req, res){
  const code = req.query.code;
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  const response = await axios.post('https://github.com/login/oauth/access_token', body, opts)
  console.log(response)
  return res.status(200).end()
}
*/

const loginCallback = async (req, res)=>{
 
    //  res.write("Worked")
    //  res.end()
    const code = req.query.code;
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET ,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    const response = await axios.post('https://github.com/login/oauth/access_token', body, opts)
    
    return res.status(200).json({token:response.data})
    
    };

module.exports = {
    login,
    loginCallback
}