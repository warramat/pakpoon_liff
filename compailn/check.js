//----------------------get api-----------------------------//
window.onload = async () => {
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/userSmart/userAll'
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
        </div>
        <div class="col-8">
          <h2>ลำดับที่ :${item.userID}</h2>
          <h4>ชื่อ :${item.name}</h4>
          <h4>ชื่อ :${item.lastname}</h4>
          <h4>ชื่อ :${item.telephone}</h4>
          <h4>เพศ :<span style="color:${
            item.sex === 'ชาย' ? 'skyblue' : 'pink'
          }";>${item.sex}</span></h4>
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
