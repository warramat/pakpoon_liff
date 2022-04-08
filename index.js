liff.init({ liffId: '1656902981-0g1VVnpN' });
function logout() {
  liff.logout();
  if(liff.getOS()!=='web'){
    liff.closeWindow();
  }else{  
    location.reload();
  }
}
