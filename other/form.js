$(document).ready(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('topic');
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
  $('#topic').text(data.type);
  data.type.forEach((element) => {
    html += `<option value="${element}">${element}</option>`;
  });
  $('#choice1').append(html);
});

$('form').submit((e) => {
  e.preventDefault();
  Swal.fire({
    icon: 'question',
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
        'https://smartcity-pakpoon.herokuapp.com/petition/addpetition',
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
