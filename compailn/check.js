liff.init({ liffId: '1656902981-0g1VVnpN' });
async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}
//----------------------get api-----------------------------//
window.onload = async () => {
  document.getElementsByTagName('BODY')[0].style.display = 'none';
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://wonderful-lalande-320066.netlify.app/register.html'
    });
  }
  const uid = await getUID()
  const checkUser = await checkUser(uid);
  if (!checkUser) {
    window.location = '../register.html?page=compailn';
  } else {
    document.getElementsByTagName('BODY')[0].style.display = '';
  }
  let data = await fetch(
    'https://smartcity-pakpoon.herokuapp.com/appeal/appealAll'
  );
  let html = '';
  data = await data.json();
  data.map((item, key) => {
    html += `
      <div class="min-vw-100">
        <div class="card">
          <div class="card-body">
          <div class="row">
          <div class="col-4">
          <h2><img src="${item.img}"/></h2>
        </div>
        <div class="col-8">
          <h2>เลขที่ :${key+1}</h2>
          <h4>เรื่อง :${item.topic}</h4>
          <h4>รายละเอียด :${item.type}</h4>
          <h4>สถานะ :<span style="color:${
            item.status === 'รอตรวจสอบ' ? 'skyblue' : 'pink'
          }";>${item.status}</span></h4>
          <h4>${item.updated}</h4>
        </div>
        <br />
      </div>
          </div>
           
        </div>
      </div>
      `;
  });
  document.getElementById('content').innerHTML = html;
};
