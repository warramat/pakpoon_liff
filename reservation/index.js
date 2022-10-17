liff.init({ liffId: "1656902981-0g1VVnpN" }).then(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("topic");
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri:
        "https://tapp-smartcity.netlify.app/compailn/appointment.html?topic=" +
        myParam,
    });
  } else if (!(await checkUser(await getUID()))) {
    window.location = "../register.html";
  } else if (!(await getFriend())) {
    window.location = "https://line.me/R/ti/p/@172nwynm";
  } else {
    document.getElementById("show").style.visibility = "visible";
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

$("#choice_topic").change(async (e) => {
  const type = $("#choice_topic").val();
  const data = await (
    await fetch(
      "https://smartcity-pakpoon-api.herokuapp.com/apply/search?topic=" + type
    )
  ).json();
  let html = "";
  $("#choice_hospital").html("");
  data.details.forEach((element, i) => {
    html += `<option ${
      i == 0 ? "selected" : ""
    } value="${element}">${element}</option>`;
  });
  $("#choice_hospital").append(html);
});

$(document).ready(async () => {
  $("#year").html(
    `<option selected value="${new Date().getFullYear() + 543}">${
      new Date().getFullYear() + 543
    }</option>`
  );
  $("#year").append(
    `<option selected value="${new Date().getFullYear() + 544}">${
      new Date().getFullYear() + 544
    }</option>`
  );
});

$("form").submit((e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {});
  Swal.fire({
    icon: "question",
    title: "ยืนยันกาจองคิว",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "ยืนยัน",
    denyButtonText: "ยกเลิก",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let data = await prepareData();
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(data);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        // 'https://smartcity-pakpoon.herokuapp.com/appeal/addappeal',
        "https://smartcity-pakpoon-api.herokuapp.com/appeal/addappeal",
        requestOptions
      )
        .then(() => {
          Swal.fire("ยืนยันการจองคิวสำเร็จ", "", "success").then(() =>
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
  const myParam = urlParams.get("topic");
  let lat = 0;
  let lng = 0;
  let img = [];
  $(".img-row").each(function (i, obj) {
    img.push($(this).attr("src"));
  });
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  });
  let data = {
    type: $("#choice").val(),
    story: $("choice_topic").val(),
    details: $("#detail").val(),
    day: $("#day").val(),
    month: $("#month").val(),
    year: $("#year").val(),
    time: $("#time").val(),
    topic: myParam,
    userID: await getUID(),
    img: img,
    gps: {
      lat: lat,
      lng: lng,
    },
  };
  return data;
}

$("#take_image").click(async () => {});
