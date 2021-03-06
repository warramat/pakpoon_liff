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
    fetch('https://smartcity-pakpoon-api.herokuapp.com/dementia/adddementia', {
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
        let texts = [
          `<tr>
          <td class="radio">40 - 56 คะแนน</td>
          <td class="radio" style="color: yellow;">สมมรถภาพทางสมองต่ำ ควรพบแพทย์</td>
      </tr>`,

          `<tr>
          <td class="radio">30 - 39 คะแนน</td>
          <td class="radio" style="color: green ;">สมมรถภาพทางสมองอยู่ในระดับค่อนข้างต่ำ ควรเข้ารับคำแนะนำเพื่อเพิ่มสมรรถภาพทางสมอง</td>
      </tr>`,

          `<tr>
          <td class="radio">20 - 29 คะแนน</td>
          <td class="radio" style="color:rgb(0, 21, 128);">สมมรถภาพทางสมองอยู่ในระดับฑ์ปานกลาง ควรเข้ารับคำแนะนำเพื่อเพิ่มสมรรถภาพทางสมอง</td>
      </tr>`,
          `<tr>
          <td class="radio">14 - 19 คะแนน</td>
          <td class="radio" style="color: rgb(184, 7, 33);">สมมรถภาพทางสมองอยู่ในระดับดีมาก</td>
      </tr>`
        ];
        let index = () => {
          if (sum >= 40) {
            return 0;
          } else if (sum >= 30) {
            return 1;
          } else if (sum >= 20) {
            return 2;
          } else {
            return 3;
          }
        };
        let pop = `<div class="card">
        <div class="card-body ">
            <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                คะแนนรวมของคุณ คือ <span id="happyScore"></span> ${sum} คะแนน</h3>
                <table id="customers">
                    <tr>
                        <th>คะแนนรวม</th>
                        <th>การแปรผล</th>
                    </tr>
                    ${texts[index()]}
                </table>
                </br>
        </div>
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
