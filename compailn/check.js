//----------------------get api-----------------------------//
window.onload = async () => {
  let data = await fetch('https://jsonplaceholder.typicode.com/todos');
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
          <h2>ลำดับที่ :${item.id}</h2>
          <h4>ชื่อ :${item.title}</h4>
          <h4>เพศ :<span style="color:${
            item.completed === 'true' ? 'skyblue' : 'pink'
          }";>${item.completed}</span></h4>
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