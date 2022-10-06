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

  $('#twh1').submit(e=>{
    e.preventDefault();
    console.log($(this).serializeArray())
  })