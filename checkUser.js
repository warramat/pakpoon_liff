let baseURL = `https://smartcity-pakpoon-api.herokuapp.com/userSmart/user/searchUserID/?userID=${userID}`;
async function checkUser(userId) {
  const res = await fetch(`${baseURL}?=${userId}`);
  return res.ok;
}