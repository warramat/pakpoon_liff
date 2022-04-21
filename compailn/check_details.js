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

function renderStar(clickable, Star = 0) {
  let selected = ['', '', '', '', ''];
  for (let i = 0; i < Star; i++) {
    selected[i] = 'checked';
  }
  let html = ` 
  <br>
  <form>
  <h4 class="d-flex justify-content-center">แบบประเมินความพึงพอใจ</h4>
  <div class="star d-flex justify-content-center">
  <button type="button" id="star1" ${
    clickable
      ? 'onmouseover="hover(1)" onmouseleave="resetStar(1)" onclick="star(1)"'
      : ''
  }
      class="fa fa-star ${selected[0]}"></button>
  <button type="button"  id="star2"  ${
    clickable
      ? 'onmouseover="hover(2)" onmouseleave="resetStar(2)" onclick="star(2)"'
      : ''
  }
      class="fa fa-star  ${selected[1]}"></button>
  <button type="button"  id="star3"  ${
    clickable
      ? 'onmouseover="hover(3)" onmouseleave="resetStar(3)" onclick="star(3)"'
      : ''
  }
      class="fa fa-star  ${selected[2]}"></button>
  <button type="button"  id="star4"  ${
    clickable
      ? 'onmouseover="hover(4)" onmouseleave="resetStar(4)" onclick="star(4)"'
      : ''
  }
      class="fa fa-star  ${selected[3]}"></button>
  <button type="button"  id="star5"  ${
    clickable
      ? 'onmouseover="hover(5)" onmouseleave="resetStar(5)" onclick="star(5)"'
      : ''
  }
      class="fa fa-star  ${selected[4]}"></button>
  <span id="star" hidden>${Star}</span>
</div>
<br>
<h4 class="star d-flex justify-content-center" style="margin-bottom: 5px;">แสดงความคิดเห็น</h4>
<textarea class="d-flex justify-content-center" rows="8" id="Comment"></textarea>
 ${
   clickable
     ? '<br><center><input type="submit" value="ยืนยัน" class="btn btn-primary" style="width: 50%;"></center>'
     : ''
 }
</form>
`;
  return html;
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
  let star = '';
  if (data.status === 'เสร็จสิ้น') {
    if (data.star) {
      star = renderStar(false, data.star);
    } else {
      star = renderStar(true);
    }
  }
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
              data.status === 'รอตรวจสอบ'
                ? 'pink'
                : data.status === 'กำลังแก้ไข'
                ? 'orange'
                : 'green'
            }";>${data.status}</span></h4>
            <h4>${toThaidate(data.updated)}</h4>
            ${star}
          </div>
          <br />
            </div>
          </div>
        </div>
        `;
  document.getElementById('check').innerHTML = html;
};
