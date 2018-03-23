function Create(name, age){
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.say = function (){
    console.log(this.name+this.age+'说，喵星人不傲娇，和狗有什么区别！');
  }
  return obj;
}
var black = Create('黑猫', 12);
var white = Create('白猫', 120);
black.say();
white.say();
