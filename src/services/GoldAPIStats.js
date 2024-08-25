import dotenv from 'dotenv';
dotenv.config();

const GOLD_API_TOKEN = process.env.GOLD_API_TOKEN;

var myHeaders = new Headers();
myHeaders.append('x-access-token', GOLD_API_TOKEN);
myHeaders.append('Content-Type', 'application/json');

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

fetch('https://www.goldapi.io/api/stat', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
