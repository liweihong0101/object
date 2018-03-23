var obj = new Object();
obj.name = '喵星人';
obj.age = 2;
obj.say = function() {
  console.log(this.name + this.age + '说，做喵不傲娇，那和狗有什么区别！')
}
obj.say();
