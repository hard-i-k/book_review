const axios = require('axios'); 
const app = require('./src/app');

const SELF_PING_URL = 'https://book-review-jkfz.onrender.com/';
const SELF_PING_INTERVAL = 30000;

function selfPing() {
  axios.get(SELF_PING_URL)
    .then(response => {
      console.log(`Self-ping at ${new Date().toISOString()}: Status ${response.status}`);
    })
    .catch(error => {
      console.error(`Self-ping error at ${new Date().toISOString()}:`, error.message);
    });
}

