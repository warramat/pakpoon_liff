//  liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
//      if (!liff.isLoggedIn()) {
//        liff.login({
//          redirectUri: 'https://tapp-smartcity.netlify.app/register.html'
//        });
//      } else if (await checkUser(await getUID())) {
//        window.location = './index.html';
//      } else if (!(await getFriend())) {
//        window.location = 'https://line.me/R/ti/p/@172nwynm';
//      } else {
//        document.getElementById('show').style.visibility = 'visible';
//      }
//    });

//    async function getFriend() {
//      const friend = await liff.getFriendship();
//      return friend.friendFlag;
//    }

//    async function getUID() {
//      const data = await liff.getProfile();
//      const uid = await data.userId;
//      return uid;
//    }

//  var form = document.getElementById('form-head')
//    form.addEventListener('submit',function(e){
//      e.preventDefault()
//      var prefix = document.getElementById('prefix').value
//      var name = document.getElementById('name').value
//      var lastname = document.getElementById('lastname').value

//      fetch('https://jsonplaceholder.typicode.com/posts', {
//        method: 'POST',
//        body:JSON.stringify({
//          prefix: prefix,
//          name:name,
//          lastname:lastname
//        }),
//        headers:{
//          'content-Type': 'application/json ;charset=UTF-8'
//        }
//      })
//      .then(function(response){
//        return response.json()
//      })
//      .then(function(data){
//       console.log(data)
//      })
//    })
   
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

 function set() {
   const BMI = $('#BMI').val();
   if (BMI < 18.5) {
     $('#proportion').val('น้ำหนักต่ำกว่าเกณฑ์');
     proportion = 'น้ำหนักต่ำกว่าเกณฑ์';
     $('#proportion').css('color', 'lime');
   } else if (BMI >= 18.5 && BMI < 22.9) {
     $('#proportion').val('สมส่วน');
     proportion = 'สมส่วน';
     $('#proportion').css('color', 'green');
   } else if (BMI >= 23 && BMI < 24.9) {
     $('#proportion').val('ท้วม');
     proportion = 'ท้วม';
     $('#proportion').css('color', 'yellow');
   } else if (BMI >= 25 && BMI < 29.9) {
     $('#proportion').val('โรคอ้วน');
     proportion = 'โรคอ้วน';
     $('#proportion').css('color', 'orange');
   } else if (BMI > 30) {
     $('#proportion').val('โรคอ้วนอันตราย');
     proportion = 'โรคอ้วนอันตราย';
     $('#proportion').css('color', 'red');
   }
 }


 $('#TWH01').submit(function (e) {
   e.preventDefault();
   Swal.fire({
     icon: 'question',
     title: 'ยืนยันการบันทึกข้อมูล',
     showDenyButton: true,
     showCancelButton: false,
     confirmButtonText: 'ยืนยัน',
     denyButtonText: 'ยกเลิก'
   }).then(async (result) => {
     if (result.isConfirmed) {
         let data = {}
         $('#TWH01')
           .serializeArray().forEach(e => {
             data[e.name] =e.value
           })
           data.BMI = $('#BMI').val();
           data.proportion = proportion;
         console.log(data ,'data>>>');
         fetch(
          'https://smartcity-pakpoon-api.herokuapp.com/employee/addeemployee',
           {
             method: 'POST',
             body: JSON.stringify(data),
             headers: {
               'Content-Type': 'application/json; charset=UTF-8'
             }
           }
         ).then(async (result) => {
          let pop = `<div class="card">
          <div class="card-body ">
              <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                  คะแนนรวมของคุณ <span id="happyScore"></span> ${sum} คะแนน</h3>
              <form>
                  <table id="customers">
                      <tr>
                          <th>คะแนนรวม</th>
                          <th>การแปรผล</th>
                      </tr>
                      <tr>
                          <td class="radio">33 - 45 คะแนน</td>
                          <td class="radio" style="color: #006600;">มีความสุขมากกว่าคนทั่วไป (good)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">27 - 32 คะแนน</td>
                          <td class="radio" style="color: #0033FF;">มีความสุขเท่ากับคนทั่วไป (fair)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">26 คะแนน หรือน้อยกว่านั้น</td>
                          <td class="radio" style="color: #FF0000;">มีความสุขน้อยกว่าคนทั่วไป (poor)</td>
  
                      </tr>
                  </table>
                  </br>
          </div>

          <div class="card-body ">
              <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                  คะแนนรวมของคุณ <span id="happyScore"></span> ${sum} คะแนน</h3>
              <form>
                  <table id="customers1">
                      <tr>
                          <th>คะแนนรวม</th>
                          <th>การแปรผล</th>
                      </tr>
                      <tr>
                          <td class="radio">33 - 45 คะแนน</td>
                          <td class="radio" style="color: #006600;">มีความสุขมากกว่าคนทั่วไป (good)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">27 - 32 คะแนน</td>
                          <td class="radio" style="color: #0033FF;">มีความสุขเท่ากับคนทั่วไป (fair)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">26 คะแนน หรือน้อยกว่านั้น</td>
                          <td class="radio" style="color: #FF0000;">มีความสุขน้อยกว่าคนทั่วไป (poor)</td>
  
                      </tr>
                  </table>
                  </br>
          </div>


          <div class="card-body ">
              <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                  คะแนนรวมของคุณ <span id="happyScore"></span> ${sum} คะแนน</h3>
              <form>
                  <table id="customers2">
                      <tr>
                          <th>คะแนนรวม</th>
                          <th>การแปรผล</th>
                      </tr>
                      <tr>
                          <td class="radio">33 - 45 คะแนน</td>
                          <td class="radio" style="color: #006600;">มีความสุขมากกว่าคนทั่วไป (good)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">27 - 32 คะแนน</td>
                          <td class="radio" style="color: #0033FF;">มีความสุขเท่ากับคนทั่วไป (fair)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">26 คะแนน หรือน้อยกว่านั้น</td>
                          <td class="radio" style="color: #FF0000;">มีความสุขน้อยกว่าคนทั่วไป (poor)</td>
  
                      </tr>
                  </table>
                  </br>
          </div>
          </form>
      </div>
      </div>`;
          Swal.fire({
            html: pop,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'ตกลง'
          }).then(() => (window.location = './index.html'));
        });
       }  
 })
 })

//  liff.init({ liffId: '1656902981-0g1VVnpN' }).then(async () => {
//      if (!liff.isLoggedIn()) {
//        liff.login({
//          redirectUri: 'https://tapp-smartcity.netlify.app/register.html'
//        });
//      } else if (await checkUser(await getUID())) {
//        window.location = './index.html';
//      } else if (!(await getFriend())) {
//        window.location = 'https://line.me/R/ti/p/@172nwynm';
//      } else {
//        document.getElementById('show').style.visibility = 'visible';
//      }
//    });

//    async function getFriend() {
//      const friend = await liff.getFriendship();
//      return friend.friendFlag;
//    }

//    async function getUID() {
//      const data = await liff.getProfile();
//      const uid = await data.userId;
//      return uid;
//    }

// var form = document.getElementById('form-head')
//   form.addEventListener('submit',function(e){
//     e.preventDefault()
//     var prefix = document.getElementById('prefix').value
//     var name = document.getElementById('name').value
//     var lastname = document.getElementById('lastname').value

//     fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       body:JSON.stringify({
//         prefix: prefix,
//         name:name,
//         lastname:lastname
//       }),
//       headers:{
//         'content-Type': 'application/json ;charset=UTF-8'
//       }
//     })
//     .then(function(response){
//       return response.json()
//     })
//     .then(function(data){
//       console.log(data)
//     })
//   })
  
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

function set() {
  const BMI = $('#BMI').val();
  if (BMI < 18.5) {
    $('#proportion').val('น้ำหนักต่ำกว่าเกณฑ์');
    proportion = 'น้ำหนักต่ำกว่าเกณฑ์';
    $('#proportion').css('color', 'lime');
  } else if (BMI >= 18.5 && BMI < 22.9) {
    $('#proportion').val('สมส่วน');
    proportion = 'สมส่วน';
    $('#proportion').css('color', 'green');
  } else if (BMI >= 23 && BMI < 24.9) {
    $('#proportion').val('ท้วม');
    proportion = 'ท้วม';
    $('#proportion').css('color', 'yellow');
  } else if (BMI >= 25 && BMI < 29.9) {
    $('#proportion').val('โรคอ้วน');
    proportion = 'โรคอ้วน';
    $('#proportion').css('color', 'orange');
  } else if (BMI > 30) {
    $('#proportion').val('โรคอ้วนอันตราย');
    proportion = 'โรคอ้วนอันตราย';
    $('#proportion').css('color', 'red');
  }
}


let sendData = {};
let sum = 0;

$('#TWH01').submit(function (e) {
  e.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'ยืนยันการบันทึกข้อมูล',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then(async (result) => {
    if (result.isConfirmed) {
        let data = {}
        $('#TWH01')
          .serializeArray().forEach(e => {
            data[e.name] =e.value
          })
          data.BMI = $('#BMI').val();
          data.proportion = proportion;


          const form = $('#TWH01').serializeArray();
          const n = form.length;
          sum = 0;
          form.forEach((e) => {
            sum += Number(e.value);
            sendData[e.name] = e.value;
          });
        console.log(data ,'data>>>');
        fetch(
          'https://smartcity-pakpoon-api.herokuapp.com/employee/addeemployee',
          {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        ).then(async (result) => {
          let pop = `<div class="card">
          <div class="card-body ">
              <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                  คะแนนรวมของคุณ <span id="happyScore"></span> ${sum} คะแนน</h3>
              <form>
                  <table id="customers">
                      <tr>
                          <th>คะแนนรวม</th>
                          <th>การแปรผล</th>
                      </tr>
                      <tr>
                          <td class="radio">33 - 45 คะแนน</td>
                          <td class="radio" style="color: #006600;">มีความสุขมากกว่าคนทั่วไป (good)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">27 - 32 คะแนน</td>
                          <td class="radio" style="color: #0033FF;">มีความสุขเท่ากับคนทั่วไป (fair)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">26 คะแนน หรือน้อยกว่านั้น</td>
                          <td class="radio" style="color: #FF0000;">มีความสุขน้อยกว่าคนทั่วไป (poor)</td>
  
                      </tr>
                  </table>
                  </br>
          </div>

          <div class="card-body ">
              <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                  คะแนนรวมของคุณ <span id="happyScore"></span> ${sum} คะแนน</h3>
              <form>
                  <table id="customers">
                      <tr>
                          <th>คะแนนรวม</th>
                          <th>การแปรผล</th>
                      </tr>
                      <tr>
                          <td class="radio">33 - 45 คะแนน</td>
                          <td class="radio" style="color: #006600;">มีความสุขมากกว่าคนทั่วไป (good)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">27 - 32 คะแนน</td>
                          <td class="radio" style="color: #0033FF;">มีความสุขเท่ากับคนทั่วไป (fair)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">26 คะแนน หรือน้อยกว่านั้น</td>
                          <td class="radio" style="color: #FF0000;">มีความสุขน้อยกว่าคนทั่วไป (poor)</td>
  
                      </tr>
                  </table>
                  </br>
          </div>


          <div class="card-body ">
              <h3 class="d-flex align-items-center" style="color: blue; margin-top: 2rem; flex-direction: column;">
                  คะแนนรวมของคุณ <span id="happyScore"></span> ${sum} คะแนน</h3>
              <form>
                  <table id="customers">
                      <tr>
                          <th>คะแนนรวม</th>
                          <th>การแปรผล</th>
                      </tr>
                      <tr>
                          <td class="radio">33 - 45 คะแนน</td>
                          <td class="radio" style="color: #006600;">มีความสุขมากกว่าคนทั่วไป (good)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">27 - 32 คะแนน</td>
                          <td class="radio" style="color: #0033FF;">มีความสุขเท่ากับคนทั่วไป (fair)</td>
  
                      </tr>
                      <tr>
                          <td class="radio">26 คะแนน หรือน้อยกว่านั้น</td>
                          <td class="radio" style="color: #FF0000;">มีความสุขน้อยกว่าคนทั่วไป (poor)</td>
  
                      </tr>
                  </table>
                  </br>
          </div>
          </form>
      </div>
      </div>`;
          Swal.fire({
            html: pop,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'ตกลง'
          }).then(() => (window.location = './index.html'));
        });
      }  
})
})



