const axios = require('axios');
require('dotenv').config();

//Get Bearer token 
let options = {
  uri:`https://login.microsoftonline.com/${process.env.AZURE_AD_ID}/oauth2/token`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `grant_type=password&
        username=${process.env.ENV_USERNAME}&
        password=${process.env.ENV_PASSWORD}&
        client_id=${process.env.CLIENT_ID}&
        resource=${process.env.RESOURCE}&
        redirect_uri=${process.env.REDIRECT_URI}&
        client_secret=${process.env.CLIENT_SECRET}`
};

const getToken = async () =>{
  return axios
    .post(options.uri, options.body)
}

module.exports = { getToken };