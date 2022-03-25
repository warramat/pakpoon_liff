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
    title: 'ยืนยันการแจ้งเรื่อง',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      let data = prepareData();
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify(data);
      console.log(raw);
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
          Swal.fire('แจ้งเรื่องสำเร็จ', '', 'success').then(() =>
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
    // UserID: await getUID(),
    img: img,
    gps: {
      lat: lat,
      lng: lng
    }
  };
  return data;
}

$('#take_image').click(async () => {});
