liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('key') || 0;
  const _id = urlParams.get('_id');
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: `https://tapp-smartcity.netlify.app/compailn/check_details.html?key=${key}&_id=${_id}`
    });
  } else if (!(await checkUser(await getUID()))) {
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
  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('key') || 0;
  const _id = urlParams.get('_id');
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/appeal/find/data?userID=' + UID
  );
  data = await data.json();
  data = data.data;
  data = data.find((e) => e._id === _id);
  let html_img = '';
  data.img.forEach((e) => {
    html_img += `<a  href='https://smartcity-pakpoon-api.herokuapp.com/userSmart/${e}'><img style="width:100px" src="https://smartcity-pakpoon-api.herokuapp.com/userSmart/${e}"/></a>`;
  });
  let html = `
    <div class="d-flex align-items-center" style="margin-top: 2rem; flex-direction: column;">
    <h2 style="color:green">เลขที่ :${Number(key)}</h2>
    </div>
        <div class="min-vw-100">
          <div class="card">
            <div class="card-body">
            <div class="col-12">
            <h2>${html_img}</h2>
            <h4>เรื่อง :${data.type}</h4>
            <h4>รายละเอียด :${data.details}</h4>
            <h4>สถานะ :<span style="color:${
              data.status === 'รอตรวจสอบ' ? 'skyblue' : 'pink'
            }";>${data.status}</span></h4>
            <h4>${toThaidate(data.updated)}</h4>
          </div>
          <br />
            </div>
          </div>
        </div>
        `;
  document.getElementById('check').innerHTML = html;
};
