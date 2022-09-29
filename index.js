// index.js
// const { fetchMyIP, fetchCoords, passesOver } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoords('99.224.62.172', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coords:' , coords);
// });

// passesOver({latitude: 43.653226, longitude: -79.3831843}, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coords:' , coords);
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let pass of passTimes) {
    const time = new Date(0);
    time.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${time} for ${pass.duration} `);
  }
});
