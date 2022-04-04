window.onload = async () => {
  const UID = await getUID();
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/protest/find/data/?userID=' +
      UID
  );
  let html = '';
  data = await data.json();
  data = data.data;
  data = data.reverse();
  data.forEach((item, key) => {
    html += `
    <a href="./Checkhealth.html?_id=${item._id}">
    <div class="min-vw-100">
    <div class="card">
      <div class="card-body">
      <div class="col-12">
      <h3 style="color:blue">เลขที่ :${key + 1}</h3>
      <h4>เรื่อง :${item.topic}</h4>
      <h4>สถานะ :<span style="color:${
        item.status === 'รอตรวจสอบ' ? 'skyblue' : 'pink'
      }";>${item.status}</span></h4>
      <br />
      <h4>${item.updated}</h4>
    </div>
      </div>
    </div>
  </div>
    </a>
       
        `;
  });
  document.getElementById('check').innerHTML = html;
};
