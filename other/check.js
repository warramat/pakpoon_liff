//----------------------get api-----------------------------//
window.onload = async () => {
  let data = await fetch('http://8d21-27-55-68-247.ngrok.io/api/conan.php');
  let html = '';
  data = await data.json();
  data.map((item, key) => {
    html += `
      <div class="min-vw-100">
        <div class="card">
          <div class="card-body">
          <div class="row">
          <div class="col-4">
          <img
            src="${'http://8d21-27-55-68-247.ngrok.io/api' + item.img}"
            width="75"
            height="75"
          />
        </div>
        <div class="col-8">
          <h2>ลำดับที่ :${item.ID}</h2>
          <h4>ชื่อ :${item.name}</h4>
          <h4>นามสกุล :${item.sername}</h4>
          <h4>เพศ :<span style="color:${
            item.gender === 'ชาย' ? 'skyblue' : 'pink'
          }";>${item.gender}</span></h4>
        </div>
        <br />
        ที่อยู่ :${item.home}
      </div>
          </div>
           
        </div>
      </div>
      `;
  });
  document.getElementById('content').innerHTML = html;
};
