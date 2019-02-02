/*
* Worker for rotating logs
*
*/

// Internal Dependencies
const logs = require("./logs-handler");

// Send data to logFileName
const log = data => {
  const logString = JSON.stringify(data);
  const logFileName = new Date();
  return logs.append(logFileName, logString).catch(err => console.log(err));
};

// Rotate and compress log files
const rotateLogs = () => {
  logs.list(false).then(logs =>
    logs.forEach(logName => {
      const logId = ligName.replace(".log", "");
      const newField = logId + "-" + Date.now();
      logs
        .compress(logId, newField)
        .then(logId => logs.truncate(logid))
        .catch(err => console.log(err));
    })
  );
};

// Timer to execute log rotation
const logRotationLoop = function() {
  setInterval(() => rotateLogs(), 1000 * 60 * 60 * 24);
};

// Main script
const logWoker = () => {
  // Send to console, in yellow
  console.log("\x1b[33m%s\x1b[0m", "Background workers are running");
  // Compress all the logs immediately
  rotateLogs();
  // Call the compression loop so checks will execute later on
  logRotationLoop();
};

module.exports = { logWoker, log };
