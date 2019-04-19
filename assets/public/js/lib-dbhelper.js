/**
 * Common database helper functions.
 */

const HOST = "http://localhost:3000/api/v1.0";

// TEMP:
const localCatalog = [];

// Utilities
const accessToken = document.cookie.split("access_token=")[1];

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
      Authorization: accessToken
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

dbHelper.login = props => {
  const { email, password } = props;

  const options = {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${HOST}/login`, options).then(res => res.json());
};
