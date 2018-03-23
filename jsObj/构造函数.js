function Cat(name, age) {
  this.name = name;
  this.age = age;
  this.say = function() {
    console.log(this.name + this.age + '说。。。。。。。')
  }
}
var cat1 = new Cat('black', 12);
var cat2 = new Cat('white', 12);
cat1.say();
cat2.say();
/*
构造函数和工厂模式的区别：
1.构造函数没有new 操作符，但是后台自己new了
2.构造函数不需要加return，自己自动返回
3.构造函数规范：第一个字母大写，使用new操作符实例化
*/
