let baseURL = `https://smartcity-pakpoon-api.herokuapp.com/userSmart/searchUserID/${userID}`;
async function checkUser(userId) {
  const res = await fetch(`${baseURL}?=${userId}`);
  return res.ok;
}
