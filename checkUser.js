let baseURL = `https://smartcity-pakpoon-api.herokuapp.com/userSmart/user/searchUserID`;
async function checkUser(userId) {
  const res = await fetch(`${baseURL}?userID=${userId}`);
  console.log(res);
  return res.ok;
}
