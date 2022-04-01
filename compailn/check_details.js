window.onload = async () => {
  const UID = await getUID();
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/appeal/find/data?userID=' + UID
  );
  let html = '';
  data = await data.json();
  data = data.data;
  data = data.reverse();
  data.forEach((item, key) => {
    html += `
        <div class="min-vw-100">
        <h2 style="color:green">เลขที่ :${key + 1}</h2>
          <div class="card">
            <div class="card-body">
            <div class="col-12">
            <h2><img style="width:300px" src="https://smartcity-pakpoon-api.herokuapp.com/userSmart/${
              item.img
            }"/></h2>
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
        `;
  });
  document.getElementById('check').innerHTML = html;
};
