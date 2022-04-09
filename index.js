function logout() {
  liff.logout();
  if (liff.getOS() !== 'web') {
    liff.closeWindow();
  } else {
    location.reload();
  }
}

liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://tapp-smartcity.netlify.app'
    });
  } else if (!checkUser(await getUID())) {
    location.replace('https://tapp-smartcity.netlify.app/register.html');
  } else if (!(await getFriend())) {
    window.location = 'https://line.me/R/ti/p/@172nwynm';
  }
});

async function getFriend() {
  const friend = await liff.getFriendship();
  return friend.friendFlag;
}
async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}
