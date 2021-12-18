// function runProgram(input) {
//   var
//   var s = 0;
//   for (var i = 0; i < a.length; i++) {
//     s += a;
//   }
//   // console.log(s)
//   var t = Number(b) * s;
//   // console.log(t)
//   var k = t.toString();
//   var temp = 0;
//   console.log(sum(k, temp));
// }
function sum(k, temp) {
  //console.log(k)

  if (k.length == 1) {
    return k;
  } else {
    for (var j = 0; j < k.length; j++) {
      // console.log(k[1])
      temp += +k[j];
    }
    k = temp.toString();
    temp = 0;
    return sum(k, temp);
  }
}

console.log(sum("148148148", 0));
