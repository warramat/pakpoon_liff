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

function makeList(id, data) {
  let html = '';
  $('#' + id).html('');
  data.forEach((element) => {
    html += `<option value="${element}">${element}</option>`;
  });
  $('#' + id).append(html);
}

$(document).ready(async () => {
  let provinces = await getProvinces();
  provinces = provinces.data.map(({province}) => province);
  makeList('province',provinces)
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
  subDistrict = subDistrict.data;
  makeList('subdistrict', subDistrict);
  $('#district').prop('disabled', false);
  $('#subdistrict').prop('disabled', false);
});

$('#district').change(async () => {
  let subDistrict = await getSubDistrict(
    $('#province').val(),
    $('#district').val()
  );
  subDistrict = subDistrict.data;
  makeList('subdistrict', subDistrict);
});
/*************************************************** */


