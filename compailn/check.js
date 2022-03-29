window.onload = async () => {
  const UID = await getUID();
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/appeal/find/data?userID=' + UID
  );
  let html = '';
  data = await data.json();
  console.log(data)
  data.forEach((item, key) => {
    html += `
      <div class="min-vw-100">
        <div class="card">
          <div class="card-body">
          <div class="row">
          <div class="col-4">
          <h2><img style="width:200px" src="https://smartcity-pakpoon-api.herokuapp.com/userSmart/${
            item.img
          }"/></h2>
        </div>
        <div class="col-8">
          <h2>เลขที่ :${key + 1}</h2>
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
