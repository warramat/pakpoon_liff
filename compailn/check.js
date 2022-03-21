//----------------------get api-----------------------------//
window.onload = async () => {
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
          <h2>ลำดับที่ :${item._id}</h2>
        </div>
        <div class="col-8">
          <h2>ลำดับที่ :${item._id}</h2>
          <h4>ชื่อ :${item.topic}</h4>
          <h4>ชื่อ :${item.type}</h4>
          <h4>เพศ :<span style="color:${
            item.status === 'รอตรวจสอบ' ? 'skyblue' : 'pink'
          }";>${item.status}</span></h4>
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
