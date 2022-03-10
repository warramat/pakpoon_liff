var ThaiAPI = 'https://thaiaddressapi-thaikub.herokuapp.com/v1/';
async function getProvinces() {
  let data = await fetch(`${ThaiAPI}thailand/provinces`);
  return await data.json();
}

async function getDistrict(provinces) {
  let data = await fetch(`${ThaiAPI}thailand/provinces/${provinces}/district`);
  return await data.json();
}

async function getSubDistrict(provinces, district) {
  let data = await fetch(
    `${ThaiAPI}thailand/provinces/${provinces}/district/${district}`
  );
  return await data.json();
}

async function getZipcode(provinces, district) {
  let data = await fetch(
    `https://worraphon-services.000webhostapp.com/Thailandzipcode/?district=${district}&provice=${provinces}`
  );
  return await data.json();
}

function makeList(id, data, clear = true) {
  let html = '';
  if (clear) {
    $('#' + id).html('');
  }
  data.forEach((element) => {
    html += `<option value="${element}">${element}</option>`;
  });
  $('#' + id).append(html);
}

$(document).ready(async () => {
  let provinces = await getProvinces();
  provinces = provinces.data.map(({ province }) => province);
  makeList('province', provinces, false);
});

/***************************************** */
$('#province').change(async () => {
  let district = await getDistrict($('#province').val());
  district = district.data;
  makeList('district', district);
  let subDistrict = await getSubDistrict(
    $('#province').val(),
    $('#district').val()
  );
  let zipcode = await getZipcode($('#province').val(), $('#district').val());
  subDistrict = subDistrict.data;
  zipcode = zipcode.zipcode;
  makeList('subdistrict', subDistrict);
  makeList('zipcode', zipcode);
  $('#district').prop('disabled', false);
  $('#subdistrict').prop('disabled', false);
  $('#zipcode').prop('disabled', false);
});

$('#district').change(async () => {
  let subDistrict = await getSubDistrict(
    $('#province').val(),
    $('#district').val()
  );
  let zipcode = await getZipcode($('#province').val(), $('#district').val());
  subDistrict = subDistrict.data;
  zipcode = zipcode.zipcode;
  makeList('zipcode', zipcode);
  makeList('subdistrict', subDistrict);
});
/*************************************************** */

$('form').submit((e) => {
  e.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'ยืนยันการแจ้งเรื่อง',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      let data = $('form').serializeArray();
      let json = '{';
      for (let i = 0; i < data.length; i++) {
        json += data[i].name + ':' + data[i].value;
        i + 1 == data.length ? (json += '') : (json += ',');
      }
      json += '}';
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = json;
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(
        // 'https://smartcity-pakpoon.herokuapp.com/appeal/addappeal',
        'https://smartcity-pakpoon.herokuapp.com/userSmart/Creuser',
        requestOptions
      )
        .then(() => {
          Swal.fire('แจ้งเรื่องสำเร็จ', '', 'success').then(
            () => (window.location = './compailn')
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
});
