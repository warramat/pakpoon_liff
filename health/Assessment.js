window.onload = async () => {
  console.log('score:', localStorage.getItem('happyScore'));
  $('#happyScore').text(localStorage.getItem('happyScore'));
};
