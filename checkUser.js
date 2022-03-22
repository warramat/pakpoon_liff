let baseURL =
  `https://smartcity-pakpoon-api.herokuapp.com/userSmart/user/searchUserID` +
  userId;
async function checkUser(userId) {
  const res = await fetch(`${baseURL}?userID=${userId}`);
  return res.ok;
}
