let sendData = {};
let sum = 0;
$('form').submit(function (e) {
  e.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'ยืนยันการแจ้งเรื่อง',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const form = $('form').serializeArray();
      const n = form.length;
      sum = 0;
      form.forEach((e) => {
        sum += Number(e.value);
        sendData[e.name] = e.value;
      });
    }
    fetch('https://smartcity-pakpoon-api.herokuapp.com/happy/addhappy/Total', {
      method: 'PUT',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(function (response) {
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลเสร็จสิ้น',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'ตกลง',
        timer: 3000
      }).then(async (result) => {
        let pop = `<div class="card">
        <div class="card-body ">
            <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                คะแนนรวมของคุณ คือ <span id="happyScore"></span> ${sum} คะแนน</h3>
            <form>

                <table id="customers">
                    <tr>
                        <th>คะแนนรวม</th>
                        <th>การแปรผล</th>
                    </tr>
                    <tr>
                        <td class="radio">33 - 45 คะแนน</td>
                        <td class="radio" style="color: green;">มีความสุขมากกว่าคนทั่วไป (good)</td>

                    </tr>
                    <tr>
                        <td class="radio">27 - 32 คะแนน</td>
                        <td class="radio" style="color: rgb(0, 21, 128);">มีความสุขเท่ากับคนทั่วไป (fair)</td>

                    </tr>
                    <tr>
                        <td class="radio">26 คะแนน หรือน้อยกว่านั้น</td>
                        <td class="radio" style="color: rgb(184, 7, 33);">มีความสุขน้อยกว่าคนทั่วไป (poor)</td>

                    </tr>
                </table>
                </br>
        </div>
        </form>
    </div>
    </div>`;
        Swal.fire({
          html: pop,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'ตกลง'
        }).then(() => (window.location = './index.html'));
      });
    });
  });
});
