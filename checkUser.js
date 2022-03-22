const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('userId');
let baseURL =
  `https://smartcity-pakpoon-api.herokuapp.com/userSmart/user/searchUserID/?userID=` +
  myParam;
async function checkUser(userId) {
  const res = await fetch(`${baseURL}?=${userId}`);
  return res.ok;
}
