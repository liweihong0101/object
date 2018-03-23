var arr = [
  1,
  2,
  3,
  4,
  523,
  123,
  123,
  12
];
//请你帮我找到1
// 1.
// for (var i = 0; i < arr.length; i++) {
//     if(arr[i] == 1){
//         console.log(i)
//     }
// }

// 2.
// var i = 0;
// while (i<arr.length&&arr[i]!=1){
//     i++;
// }
// if(arr[i]==7){
//     console.log(i)
// }

// 3.二分查找，折半查找 效率高,但是只适用于有序的数组

var arr1 = [
  1,
  4,
  5,
  6,
  7,
  9
];
function findNum(min, max, n) {
  //先折半
  var mid = Math.floor((min + max) / 2);
  if (arr1[mid] == n) {
    return mid;
  }
  //确定下一次查找方向
  if (n > arr1[mid]) {
      return findNum(min+1,max,n)
  }else if(n < arr[mid]){
      return findNum(0,mid-1,n)
  }
}
findNum(0, arr1.length - 1, 4)

//反转

var str = 'abcdef';

str.split('').reverse().join(',')
