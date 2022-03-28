function logout() {
  liff.logout();
  if(liff.getOS()!=='web'){
    liff.closeWindow();
  }else{  
    location.reload();
  }
}
