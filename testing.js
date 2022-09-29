let request = require('request');
// iss.js

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  const fetchMyIP = function(callback) {
    request('https://api.ipify.org?format=json', (error, response, body)=>{
      if (error) return callback(error, null);
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      let ip = JSON.parse(body).ip;
      return request(`http://ipwho.is/${ip}`, (error, response, body)=>{
        if (error) return callback(error, null);
            
        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }
        let parsed = JSON.parse(body);
        if (parsed.success === false) return callback('false address', null);
        let coords = { latitude:parsed.latitude, longitude: parsed.longitude };
        return request(` https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body)=>{
          if (error) return callback(error, null);
          if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
          }
          let parsed = JSON.parse(body);
          return callback(null,parsed.response);
        });
      });
    });
  };
};
