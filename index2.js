const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes
// copy it from there, or better yet, moduralize and require it in both files

let printPassTimes = (passTimes) => {
  for (let pass of passTimes) {
    const time = new Date(0);
    time.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${time} for ${pass.duration} `);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  }).catch(error => console.log("It didn't work: ", error.message));