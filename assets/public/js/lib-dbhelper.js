/**
 * Common database helper functions.
 */

const HOST = "http://localhost:3000/api/v1.0";

// TEMP:
const localCatalog = [];

const dbHelper = {};

dbHelper.checkConnectivity = () => {
  return fetch(`${HOST}/status`, { method: "HEAD" })
    .then(res => true)
    .catch(err => {
      console.log("You are offline");
      //TODO throw alert
      return false;
    });
};

dbHelper.fetchCatalog = () => {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      email: "fumaxuhog@onecitymail.com",
      Authorization: "0vowwej144gkjyi1x3j6"
    }
  };

  return fetch(`${HOST}/item`, options)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log("cannot fetch from db");
      console.log(err);
    });
};
