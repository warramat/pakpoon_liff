window.onload = async () => {
  const UID = await getUID();
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/health/find/data?userID=' + UID
  );
  let html = '';
  data = await data.json();
  data = data.data;
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('_id');
  data.forEach((item, key) => {
    if(item._id===myParam){
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
                <h5>น้ำหนัก :${item.weight}</h5>
                <h5>ส่วนสูง :${item.height}</h5>
                <h5>BMI :${item.BMI}</h5>
                <h5>คุณอยู่ในเกณฑ์ :${item.proportion}</h5>
                <br></br>
                <h5>ความดันโลหิตครั้งที่ 1</h5>
                <h5>
                  ค่าความดันโลหิตค่าบน :
                  <span style="color: green">${item.upper_blood1}</span>
                </h5>
                <h5>
                  ค่าความดันโลหิตค่าบน :
                  <span style="color: green">${item.lower_blood2}</span>
                </h5>
                <br></br>
                <h5>ความดันโลหิตครั้งที่ 2</h5>
                <h5>ค่าความดันโลหิตค่าบน :${item.upper_blood2}</h5>
                <h5>ค่าความดันโลหิตค่าบน :${item.lower_blood2}</h5>
                <br></br>
                <h5>ค่าน้ำตาลในเลือด :${item.blood_sugar}</h5>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>`;
    }
  });
  document.getElementById('check').innerHTML = html;
};
