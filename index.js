function logout() {
  liff.logout();
  if(liff.getOS()!=='web'){
    liff.closeWindow();
  }
  location.reload();
}
