liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://tapp-smartcity.netlify.app/compailn/check.html'
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
  let data = await fetch(
    'https://smartcity.onrender.com/appeal/find/data?userID=' + UID
  );
  let html = '';
  data = await data.json();
  data = data.data;
  data = data.reverse();
  const c = data.length;
  data.forEach((item, key) => {
    console.log(key);
    html += `
      <div class="min-vw-100">
        <div class="card">
          <div class="card-body">
          <div class="row">
          <div class="col-4">
          <h2><img style="width:80px" src="https://smartcity.onrender.com/userSmart/${
            item.img[0]
          }"/></h2>
        </div>
        <div class="col-8" >
          <h2 style="color:green;">เลขที่ :${c - key}</h2>
          <h4>เรื่อง :${item.type}</h4>
          <h4>รายละเอียด :${item.details}</h4>
          <h4>สถานะ :<span style="color:${
            item.status === 'รอตรวจสอบ' ? 'skyblue' : 'pink'
          }";>${item.status}</span></h4>
        </div>
        </div>
        <br>
        <div class="row">
        <h4>${toThaidate(item.updated)}</h4>
        </div>
        <a class="btn btn-outline-primary " href="./check_details?_id=${
          item._id
        }&key=${c - key}" style="width: 100%;">
        ดูรายละเอียด</a>
          </div>
        </div>
      </div>
      `;
  });
  document.getElementById('content').innerHTML = html;
};
