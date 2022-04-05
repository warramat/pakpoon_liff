window.onload = async () => {
  const UID = await getUID();
  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('key')||0;
  const _id = urlParams.get('_id');
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/appeal/find/data?userID=' + UID
  );
  data = await data.json();
  data = data.data;
  data = data.find((e) => e._id === _id);
  let html_img = ''
  data.img.forEach(e => {
    html_img+=`<img style="width:300px" src="https://smartcity-pakpoon-api.herokuapp.com/userSmart/${e}"/>` 
  });
  let html = `
    <div class="d-flex align-items-center" style="margin-top: 2rem; flex-direction: column;">
    <h2 style="color:green">เลขที่ :${key+1}</h2>
    </div>
        <div class="min-vw-100">
          <div class="card">
            <div class="card-body">
            <div class="col-12">
            <h2>${html_img}</h2>
            <h4>เรื่อง :${data.topic}</h4>
            <h4>รายละเอียด :${data.type}</h4>
            <h4>สถานะ :<span style="color:${
              data.status === 'รอตรวจสอบ' ? 'skyblue' : 'pink'
            }";>${data.status}</span></h4>
            <h4>${data.updated}</h4>
          </div>
          <br />
            </div>
          </div>
        </div>
        `;
  document.getElementById('check').innerHTML = html;
};
