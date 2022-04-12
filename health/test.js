let sendData = {};
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
      let sum = 0;

      form.forEach((e) => {
        sum += Number(e.value);
        sendData[e.name] = e.value;
      });
      localStorage.setItem('form', '' + sum);
      console.log('test:', form);
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
        window.location = './Assessment.html';
      });
    });
  });
});
