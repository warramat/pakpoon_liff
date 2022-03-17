liff.init({ liffId: '1656902981-0g1VVnpN' });
window.onload = () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://wonderful-lalande-320066.netlify.app/register.html'
    });
  }
};
