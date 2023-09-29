function getTime(datetime) {
  let time = datetime.split(' ')[1];
  return time;
}

function toThaidate(datetime) {
  const month = [
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
  ]

  const dayInWeek = [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์'
  ]
  datetime = datetime.split(' ')
  let d = datetime[0].split('-')
  let t = datetime[1]
  d=d.reverse()
  let dtext = d.join('-')
  let newdate = new Date(dtext + " "+t)
  return `วัน${dayInWeek[newdate.getDay()]} ที่ ${newdate.getDate()} ${month[newdate.getMonth()]} พ.ศ. ${Number(newdate.getFullYear())+543} เวลา ${t} น.`
  
}


function Script_checkID(id) {
  if (!IsNumeric(id)) return false;
  if (id.substring(0, 1) == 0) return false;
  if (id.length != 13) return false;
  for (i = 0, sum = 0; i < 12; i++) sum += parseFloat(id.charAt(i)) * (13 - i);
  if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) return false;
  return true;
}

function IsNumeric(input) {
  var RE =
    /^-?(0|INF|(0[1-7][0-7]*)|(0x[0-9a-fA-F]+)|((0|[1-9][0-9]*|(?=[\.,]))([\.,][0-9]+)?([eE]-?\d+)?))$/;
  return RE.test(input);
}
