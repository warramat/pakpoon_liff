liff.init({ liffId: '1656902981-0g1VVnpN' });
async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}
async function redirectPage(page = '') {
  const uid = await getUID();
  const ck = await checkUser(uid);
  if (!ck) {
    window.location = '../register.html' + page;
  } else {
    if (!liff.isLoggedIn()) {
      liff.login();
    }
    document.getElementById('show').style.visibility = 'visible';
  }
}
