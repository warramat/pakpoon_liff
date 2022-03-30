window.onload = async () => {
  const UID = await getUID();
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/health/find/data?userID=' + UID
  );
  let html = '';
  data = await data.json();
  data = data.data;
  data.forEach((item, key) => {
    html += `
        <div class="min-vw-100">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <h3>วันที่ :${item.created}</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                <h4>คุณอยู่ในเกณฑ์ :${item.proportion}</h4>
                  <h5>BMI ค่าที่ได้ :${item.BMI}</h5>
                  <a class="btn btn-outline-primary " href="./Checkhealth.html" style="width: 100%;">
                      ดูรายละเอียด</a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  });
  document.getElementById('check').innerHTML = html;
};
