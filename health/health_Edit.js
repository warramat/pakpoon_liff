$('#year').change(() => {
  let today = new Date();
  if (Number($('#year').val()) - today.getFullYear() - 543 > 60) {
    $('#elderly').val('เป็น');
  } else {
    $('#elderly').val('ไม่เป็น');
  }
  makemouth();
});
$('#month').change(() => {
  makeday();
});

$(document).ready(function () {
  $('#elderly').val('ไม่เป็น');
  makeyear();
  makemouth();
  makeday();
});

function makeyear() {
  let today = new Date();
  let year = today.getFullYear() + 543;
  let html = '';
  for (year; year > 2449; year--) {
    html += `  <option value="${year}">${year}</option>`;
  }
  $('#year').html(html);
}

function makemouth() {
  let today = new Date();
  let html = '';
  const M = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฏาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ];
  if ($('#year').val() == today.getFullYear() + 543) {
    M.forEach((e, i) => {
      if (i > today.getMonth()) {
        return;
      } else if (i === today.getMonth()) {
        html += `  <option selected value="${e}">${e}</option>`;
      } else {
        html += `  <option value="${e}">${e}</option>`;
      }
    });
  } else {
    M.forEach((e, i) => {
      html += `  <option value="${e}">${e}</option>`;
    });
  }
  $('#month').html(html);
}

function makeday() {
  let today = new Date();
  const M = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฏาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ];
  if (
    $('#year').val() == today.getFullYear() + 543 &&
    today.getMonth() === M.indexOf($('#month').val())
  ) {
    renderday(true);
  } else {
    renderday(false);
  }
}

function leapyear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function renderday(t) {
  let today = new Date();
  let html = '';
  if (leapyear(Number($('#year').val()) - 543)) {
    if ($('#month').val() === 'กุมภาพันธ์') {
      for (let i = 1; i != 30; i++) {
        if (t && today.getDate() === i) {
          html += `<option selected value="${i}">${i}</option>`;
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else if ($('#month').val().indexOf('ยน') != -1) {
      for (let i = 1; i != 31; i++) {
        if (t && today.getDate() === i) {
          html += `<option selected value="${i}">${i}</option>`;
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else {
      for (let i = 1; i != 32; i++) {
        if (t && today.getDate() === i) {
          html += `<option selected value="${i}">${i}</option>`;
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    }
  } else {
    if ($('#month').val() === 'กุมภาพันธ์') {
      for (let i = 1; i != 29; i++) {
        if (t && today.getDate() === i) {
          html += `<option selected value="${i}">${i}</option>`;
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else if ($('#month').val().indexOf('ยน') != -1) {
      for (let i = 1; i != 31; i++) {
        if (t && today.getDate() === i) {
          html += `<option selected value="${i}">${i}</option>`;
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else {
      for (let i = 1; i != 32; i++) {
        if (t && today.getDate() === i) {
          html += `<option selected  value="${i}">${i}</option>`;
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    }
  }
  $('#day').html(html);
}

/********************************************************* */
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
      let data = {};
      var UID = await getUID();
      data.userID = UID;
      $('form')
        .serializeArray()
        .forEach((e) => {
          data[e.name] = e.value;
        });
      console.log(data);
      fetch('https://smartcity-pakpoon-api.herokuapp.com/disease/adddisease', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'การบันทึกข้อมูลเสร็จสิ้น',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'ตกลง',
          timer: 3000
        }).then(async (result) => {
          location.reload();
        });
      });
    }
  });
});
