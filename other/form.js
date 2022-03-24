liff.init({ liffId: '1656902981-0g1VVnpN' });
async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}

function loadFile(event) {
  let reader = new FileReader();
  reader.onload = function () {
    $('#list_images').append(`
    <div class="item">
        <img src="${reader.result}">
    </div>
    `);
    $('#upload').val('');
  };
  reader.readAsDataURL(event.target.files[0]);
}

$(document).ready(async () => {
  document.getElementsByTagName('BODY')[0].style.display = 'none';

  const uid = await getUID();
  const ck = await checkUser(uid);
  if (!ck) {
    window.location = '../register.html?page=other';
  } else {
    document.getElementsByTagName('BODY')[0].style.display = '';
  }
  const urlParams = new URLSearchParams(window.location.search);
  // const myParam = urlParams.get('topic');
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  // console.log(myParam);
  let data = await fetch(
    'https://smartcity-pakpoon-api.herokuapp.com/petition/search?topic=',
    requestOptions
  );
  data = await data.json();
  let html = '';
  $('#topic').text(data.topic.type);
  data.type.forEach((element) => {
    html += `<option value="${element}">${element}</option>`;
  });
  $('#choice1').append(html);
});

$('form').submit((e) => {
  e.preventDefault();
  Swal.fire({
    title: 'ยืนยันการยื่นคำร้อง',
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
