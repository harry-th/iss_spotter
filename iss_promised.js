// iss_promised.js
const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};
const fetchCoords = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};
const passesOver = function(coords) {
  
  let {latitude, longitude} = JSON.parse(coords);
  return request(`htts://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoords)
    .then(passesOver)
    .then(body => {
      let {response} = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };