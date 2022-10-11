// liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
//     if (!liff.isLoggedIn()) {
//       liff.login({
//         redirectUri: 'https://tapp-smartcity.netlify.app/register.html'
//       });
//     } else if (await checkUser(await getUID())) {
//       window.location = './index.html';
//     } else if (!(await getFriend())) {
//       window.location = 'https://line.me/R/ti/p/@172nwynm';
//     } else {
//       document.getElementById('show').style.visibility = 'visible';
//     }
//   });

//   async function getFriend() {
//     const friend = await liff.getFriendship();
//     return friend.friendFlag;
//   }

//   async function getUID() {
//     const data = await liff.getProfile();
//     const uid = await data.userId;
//     return uid;
//   }

/*var form = document.getElementById('form-head')
  form.addEventListener('submit',function(e){
    e.preventDefault()
    var prefix = document.getElementById('prefix').value
    var name = document.getElementById('name').value
    var lastname = document.getElementById('lastname').value

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body:JSON.stringify({
        prefix: prefix,
        name:name,
        lastname:lastname
      }),
      headers:{
        'content-Type': 'application/json ;charset=UTF-8'
      }
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      console.log(data)
    })
  })
  */
/******************************************************************************************* */

function Disable(c) {
  const a = $(`.${c}`);
  if ($(`.${c}`)[0].checked) {
    for (let i = 0; i < a.length; i++) {
      if (i !== 0) {
        a[i].disabled = true;
        a[i].checked = false;
      }
    }
    if (c === "congenital") {
      $(".congenital-txt").attr("disabled", true);
      $(".congenital-txt").val("");
    } else if (c === "sick") {
      $(".sick-txt").attr("disabled", true);
      $(".sick-txt").val("");
    } else if (c === "accident") {
      $(".accident-txt").attr("disabled", true);
      $(".accident-txt").val("");
    }
  } else {
    for (let i = 0; i < a.length; i++) {
      if (i !== 0) {
        a[i].disabled = false;
      }
    }
    if (c === "congenital") {
      $(".congenital-txt").attr("disabled", false);
    } else if (c === "sick") {
      $(".sick-txt").attr("disabled", false);
    } else if (c === "accident") {
      $(".accident-txt").attr("disabled", false);
    }
  }
}

$(".department").change((e) => {
  if ($(".department")[0].checked) {
    $("#ot").attr("disabled", false);
  } else {
    $("#ot").attr("disabled", true);
    $("#ot").val("");
  }
});

$(".drinking_alcohol").change((e) => {
  const a = $(".drinking_alcohol2");
  if (!$(".drinking_alcohol")[0].checked) {
    for (let i = 0; i < a.length; i++) {
      a[i].disabled = false;
    }
  } else {
    for (let i = 0; i < a.length; i++) {
      a[i].disabled = true;
      a[i].checked = false
    }
  }
});


$(".smoke_often1").change((e) => {
  if (!$(".smoke_often1")[0].checked) {
    $("#smoke_often1").attr("disabled", false);
  } else {
    $("#smoke_often1").attr("disabled", true);
    $("#smoke_often1").val("");
  }
});

$(".debt_information").change((e) => {
  if (!$(".debt_information")[0].checked) {
    $("#debt_information").attr("disabled", false);
  } else {
    $("#debt_information").attr("disabled", true);
    $("#debt_information").val("");
  }
});

$("#TWH01").submit(e=>{
  e.preventDefault();
  console.log( $( this ).serializeArray() );
})



$('TWH01').submit(function (e) {
  const today = new Date();
  e.preventDefault();
  if (Script_checkID($('#cardID').val())) {
    Swal.fire({
      icon: 'question',
      title: 'ยืนยันการบันทึกข้อมูล',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ยืนยัน',
      denyButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {};
  
        $('form')
          .serializeArray()
          .forEach((e) => {
            data[e.name] = e.value;
            data[e.name] = e.value;
            data[e.name] = e.value;
            data[e.name] = e.value;
            data[e.name] = e.value;
            data[e.name] = e.value;
            data[e.name] = e.value;
          });
        console.log(data);
        fetch(
          'https://smartcity-pakpoon-api.herokuapp.com/employee/addemployee',
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        ).then(function (response) {
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลเสร็จสิ้น',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'ตกลง',
            timer: 3000
          }).then(async (result) => {
            location.reload();
          });
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง',
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'ตกลง',
      timer: 3000
    });
  }
});
