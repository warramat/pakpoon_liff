liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri:
        'https://tapp-smartcity.netlify.app/health/health_history.html'
    });
  } else if (!checkUser(await getUID())) {
    window.location = '../register.html';
  } else if (!(await getFriend())) {
    window.location = 'https://line.me/R/ti/p/@172nwynm';
  } else {
    document.getElementById('show').style.visibility = 'visible';
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

window.onload = async () => {
  const UID = await getUID();
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/health/find/data?userID=' + UID
  );
  let html = '';
  data = await data.json();
  data = data.data;
  data = data.reverse();
  data.forEach((item, key) => {
    html += `
        <div class="min-vw-100">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <h3>วันที่ :${item.created}</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                <h4>คุณอยู่ในเกณฑ์ :${item.proportion}</h4>
                  <h5>BMI ค่าที่ได้ :${item.BMI}</h5>
                  <a class="btn btn-outline-primary " href="./Checkhealth.html?_id=${item._id}" style="width: 100%;">
                      ดูรายละเอียด</a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  });
  document.getElementById('check').innerHTML = html;
};
