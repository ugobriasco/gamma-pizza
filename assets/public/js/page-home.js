/*
* Scripts assigned to the page 'index'
* Requires dbHelper
*/

const handleLogin = () => {
  const email = document.getElementById("LoginEmail").value;
  const password = document.getElementById("LoginPassword").value;

  return dbHelper
    .login({ email, password })
    .then(res => {
      saveToken(res.authToken, res.expires);
    })
    .catch(err => console.log(err));
};

const saveToken = (token, expires) => {
  document.cookie = `access_token=${token};expires=${Date(expires)}`;
};
