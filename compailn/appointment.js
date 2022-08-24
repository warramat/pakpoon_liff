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

liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('topic');
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri:
        'https://tapp-smartcity.netlify.app/compailn/appointment.html?topic=' +
        myParam
    });
  } else if (!(await checkUser(await getUID()))) {
    window.location = '../register.html';
  } else if (!(await getFriend())) {
    window.location = 'https://line.me/R/ti/p/@172nwynm';
  } else {
    document.getElementById('show').style.visibility = 'visible';
  }
});

async function getFriend() {
  const friend = await liff.getFriendship();
  return friend.friendFlag;
}
async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}

$('#year').change(() => {
  makemouth();
});
$('#month').change(() => {
  makeday();
});

$(document).ready(async function () {
  await load();
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
      html += `<option value="${e}">${e}</option>`;
    });
  }
  console.log(html);
  $('#month').html(html);
}

function makeday() {
  let today = new Date();

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

function loadFile(event) {
  let reader = new FileReader();
  reader.onload = function () {
    addImage(reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function addImage(img) {
  const id = Math.round(Math.random() * 10000);
  $('#list_images').append(`
      <li class="item" id="${id}">
        <img class="img-row" src="${img}">
        <button class="btn btn-danger" onclick="remove_img(${id})">x</button>
      </li>
      `);
  $('#upload').val('');
  $('#camera').val('');
}

function remove_img(id) {
  $('#' + id).remove();
}

$(document).ready(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('topic');
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/apply/search?topic=' + myParam
  );
  data = await data.json();
  let html = '';
  $('#topic').text(data.type);
  data.details.forEach((element) => {
    html += `<option value="${element}">${element}</option>`;
  });
  $('#choice').append(html);
});

$('form').submit((e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {});
  Swal.fire({
    icon: 'question',
    title: 'ยืนยันการนัดหมาย',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then(async (result) => {
    if (result.isConfirmed) {
      let data = await prepareData();
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify(data);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(
        // 'https://smartcity-pakpoon.herokuapp.com/appeal/addappeal',
        'https://smartcity-pakpoon-api.herokuapp.com/appeal/addappeal',
        requestOptions
      )
        .then(() => {
          Swal.fire('ยืนยันการนัดหมายสำเร็จ', '', 'success').then(() =>
            location.reload()
          );
        })
        .catch((e) => {
          console.log;
        });
    }
  });
});

async function prepareData() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('topic');
  let lat = 0;
  let lng = 0;
  let img = [];
  $('.img-row').each(function (i, obj) {
    img.push($(this).attr('src'));
  });
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  });
  let data = {
    type: $('#choice').val(),
    details: $('#detail').val(),
    topic: myParam,
    userID: await getUID(),
    img: img,
    gps: {
      lat: lat,
      lng: lng
    }
  };
  return data;
}

$('#take_image').click(async () => {});
