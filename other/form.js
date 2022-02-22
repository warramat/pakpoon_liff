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
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('topic');
  console.log(myParam);
  let data = await fetch(
    'https://smartcity-pakpoon.herokuapp.com/apply/search?topic=' + myParam
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
  Swal.fire({
    title: 'ยืนยันการแจ้งเรื่อง',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('แจ้งเรื่องสำเร็จ', '', 'success');
    }
  });
});
