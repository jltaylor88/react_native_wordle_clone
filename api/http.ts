import axios from 'axios';

const http = axios.create({
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key || '',
    'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host || '',
  },
});

export default http;
