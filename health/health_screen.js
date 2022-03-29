var form = document.getElementById('form');
form.addEventListener('submit', function (e) {
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
      await senddata();
    }
  });
});

async function senddata() {
  var weight = document.getElementById('weight').value;
  var height = document.getElementById('height').value;
  var BMI = document.getElementById('BMI').value;
  var BMI = document.getElementById('BMI').value;
  var proportion = document.getElementById('proportion').value;

  var upper_blood1 = document.getElementById('upper_blood1').value;
  var lower_blood1 = document.getElementById('lower_blood1').value;
  var upper_blood2 = document.getElementById('upper_blood2').value;
  var lower_blood2 = document.getElementById('lower_blood2').value;
  var blood_sugar = document.getElementById('blood_sugar').value;

  fetch('https://smartcity-pakpoon-api.herokuapp.com/health/addhealth', {
    method: 'POST',
    body: JSON.stringify({
      weight: weight,
      height: height,
      BMI: BMI,
      proportion: proportion,
      waistline: waistline,
      upper_blood1: upper_blood1,
      lower_blood1: lower_blood1,
      upper_blood2: upper_blood2,
      lower_blood2: lower_blood2,
      blood_sugar: blood_sugar,
      userID: await getUID()
    }),
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

/********************************************** */

$('#weight').change(() => {
  if ($('#weight').val() < 1) {
    $('#weight').val(1);
  }
  if (
    $('#weight').val() !== '' &&
    $('#height').val() !== '' &&
    $('#height').val() > 0
  ) {
    let BMI = (
      $('#weight').val() / Math.pow($('#height').val() / 100, 2)
    ).toFixed(2);
    $('#BMI').val(BMI);
    set();
  }
});

$('#height').change(() => {
  if ($('#height').val() < 90) {
    $('#height').val(90);
  }
  if (
    $('#weight').val() !== '' &&
    $('#height').val() !== '' &&
    $('#height').val() > 0
  ) {
    let BMI = (
      $('#weight').val() / Math.pow($('#height').val() / 100, 2)
    ).toFixed(2);
    $('#BMI').val(BMI);
    set();
  }
});

$('#waistline').change(() => {
  if ($('#waistline').val() < 10) {
    $('#waistline').val(10);
  }
});

function set() {
  const BMI = $('#BMI').val();
  const proportion = $('#proportion').val();
  if (BMI < 18.5) {
    $('#proportion').text('น้ำหนักต่ำกว่าเกณฑ์');
  } else if (BMI >= 18.5 && BMI < 22.9) {
    $('#proportion').text('สมส่วน');
  } else if (BMI >= 23 && BMI < 24.9) {
    $('#proportion').text('น้ำหนักเกิน');
  } else if (BMI >= 25 && BMI < 29.9) {
    $('#proportion').text('โรคอ้วน');
  } else if (BMI > 30) {
    $('#proportion').text('โรคอ้วนอันตราย');
  }
}
