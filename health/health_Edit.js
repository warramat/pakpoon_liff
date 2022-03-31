
$('#year').change(() => {
  makemouth();
});

$(document).ready(function () {
  makeyear();
  makemouth();
});

function makeyear() {
  let today = new Date();
  const year = today.getFullYear() + 543;
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
      }
      html += `  <option value="${e}">${e}</option>`;
    });
  } else {
    M.forEach((e, i) => {
      html += `  <option value="${e}">${e}</option>`;
    });
  }
  $('#month').html(html);
}
