function toThaidate(datetime) {
  const M = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฏาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
  ];
  let date = datetime.split(' ')[0];
  let time = datetime.split(' ')[1];
  date = date.split('-');
  const m =
    Number(date[1]) == 1 && Number(date[1]) == 2
      ? Number(date[1]) + 10
      : Number(date[1]);
  const y = Number(date[2][2] + date[2][3]);
  const c = Number(date[2][0] + date[2][1]);
  const Thaiyear = Number(date[2]) + 543;
  const day = ZellerRule(Number(date[0]), m, y, c);
  return `วัน${day}ที่ ${Number(date[0])}  ${
    M[Number(date[1])]
  } พ.ศ. ${Thaiyear}  เวลา${time}`;
}

function ZellerRule(D, M, Y, C) {
  const day = [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์'
  ];
  let index =
    (D +
      Math.floor((13 * M - 1) / 5) +
      Y +
      Math.floor(Y / 4) +
      Math.floor(C / 4) -
      2 * C) %
    7;
  return day[index];
}
