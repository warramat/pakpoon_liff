liff.init({ liffId: '1656902981-0g1VVnpN' });
jQuery(document).ready(function ($) {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://pakpoon-city.netlify.app/register.html'
    });
  }
});
function logout() {
  liff.logout();
  location.reload();
}
