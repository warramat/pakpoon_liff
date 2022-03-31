$('#year').change(() => {
  makemouth();
});
$('#month').change(() => {
  makeday();
});

$(document).ready(function () {
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
        if (t && today.getDate() > i) {
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else if ($('#month').val().indexOf('ยน') != -1) {
      for (let i = 1; i != 31; i++) {
        if (t && today.getDate() > i) {
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else {
      for (let i = 1; i != 32; i++) {
        if (t && today.getDate() > i) {
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    }
  } else {
    if ($('#month').val() === 'กุมภาพันธ์') {
      for (let i = 1; i != 29; i++) {
        if (t && today.getDate() > i) {
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else if ($('#month').val().indexOf('ยน') != -1) {
      for (let i = 1; i != 31; i++) {
        if (t && today.getDate() > i) {
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    } else {
      for (let i = 1; i != 32; i++) {
        if (t && today.getDate() > i) {
          break;
        }
        html += `<option value="${i}">${i}</option>`;
      }
    }
  }
  return $('#day').html(html);
}
