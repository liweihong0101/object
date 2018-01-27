(function () {
  //强行暴露一个变量，一支红杏出墙来
  window.Carousel = Carousel;
  
  //轮播图类
  function Carousel(json) {
    //轮播图的盒子
    this.$dom = $('#' + json.id);
  
    //轮播图的盒子宽高
    this.width = json.width;
    this.height = json.height;
  
    //图片地址数组
    this.imagesArr = json.images;
    
    //图片地址数组长度
    this.pictureLength = this.imagesArr.length;
    
    //包裹图片的li的ul
    this.$imagesUl = null;
  
    //包裹图片的li类数组
    this.$imagesUlLis = null;
  
    //信号量
    this.idx = 0;
    
    //左右按钮
    this.$leftBtn = null;
    this.$rightBtn = null;
    
    //图片左右切换的时间
    this.animateDuration = json.animateDuration;
  
    //定时器时间
    this.interval = json.interval;
    
    //小圆点ul
    this.$circleOl = null;
  
    //小圆点li类数组
    this.$circleOlLis = null;
    
    //初始化
    this.init();
    
    //事件绑定
    this.bindEvent();
    
    //自动轮播
    this.autoplay();
  }
  
  //初始化
  Carousel.prototype.init = function () {
    //创建dom
    this.$imagesUl = $('<ul></ul>');
    this.$dom.append(this.$imagesUl);
    for (var i = 0; i < this.pictureLength; i++) {
      $("<li><img width='" + this.width + "' src='" + this.imagesArr[i] + "'></li>").appendTo(this.$imagesUl)
    }
    this.$imagesUlLis = this.$imagesUl.find('li');
    this.$dom.css({
      "width": this.width,
      "height": this.height,
      "position": "relative",
      "overflow": "hidden"
    });
    this.$imagesUlLis.css({
      "position": "absolute",
      "left": this.width,
      "top": 0
    });
    this.$imagesUlLis.eq(0).css("left", 0);
    
    this.$leftBtn = $("<a href='javascript:' class='leftBtn'></a>");
    this.$rightBtn = $("<a href='javascript:' class='rightBtn'></a>");
    this.$leftBtn.css("display", "none");
    this.$rightBtn.css("display", "none");
    this.$leftBtn.appendTo(this.$dom);
    this.$rightBtn.appendTo(this.$dom);
    
    this.$circleOl = $("<ol class='circles'></ol>");
    this.$circleOl.appendTo(this.$dom);
    for (var i = 0; i < this.pictureLength; i++) {
      $("<li></li>").appendTo(this.$circleOl);
    }
    this.$circleOlLis = this.$circleOl.find("li");
    this.$circleOlLis.eq(0).addClass('cur');
  };
  
  //事件绑定
  Carousel.prototype.bindEvent = function () {
    var that = this;
    this.$rightBtn.on('click', function () {
      if (that.$imagesUlLis.is(":animated")) {
        return;
      }
      that.showNext();
    });
    this.$leftBtn.on('click', function () {
      if (that.$imagesUlLis.is(":animated")) {
        return;
      }
      that.showPrev();
    });
    this.$circleOlLis.click(function () {
      if (that.$circleOlLis.is(":animated")) {
        return;
      }
      that.show($(this).index());
    });
    this.$dom.mouseenter(function () {
      that.$leftBtn.show(500);
      that.$rightBtn.show(500);
      clearInterval(that.timer);
    });
    this.$dom.mouseleave(function () {
      that.$leftBtn.hide();
      that.$rightBtn.hide();
      that.autoplay();
    });
  };
  
  //下一张
  Carousel.prototype.showNext = function () {
    this.$imagesUlLis.eq(this.idx).animate({"left": "-" + this.width}, this.animateDuration);
    this.idx++;
    if (this.idx >= this.pictureLength) {
      this.idx = 0;
    }
    this.$imagesUlLis.eq(this.idx).css("left", this.width).animate({"left": 0}, this.animateDuration);
    this.changeCircleCur();
  };
  
  //上一张
  Carousel.prototype.showPrev = function () {
    this.$imagesUlLis.eq(this.idx).animate({"left": this.width}, this.animateDuration);
    this.idx--;
    if (this.idx < 0) {
      this.idx = this.pictureLength - 1;
    }
    this.$imagesUlLis.eq(this.idx).css("left", "-" + this.width).animate({"left": 0}, this.animateDuration);
    this.changeCircleCur();
  };
  
  //小圆点
  Carousel.prototype.show = function (number) {
    var old = this.idx;
    this.idx = number;
    if (this.idx > old) {
      this.$imagesUlLis.eq(old).animate({"left": "-" + this.width}, this.animateDuration);
      this.$imagesUlLis.eq(this.idx).css("left", this.width).animate({"left": 0}, this.animateDuration);
    } else if (this.idx < old) {
      this.$imagesUlLis.eq(old).animate({"left": this.width}, this.animateDuration);
      this.$imagesUlLis.eq(this.idx).css("left", "-" + this.width).animate({"left": 0}, this.animateDuration);
    }
    this.changeCircleCur();
  };
  
  //小圆点的cur
  Carousel.prototype.changeCircleCur = function () {
    this.$circleOlLis.eq(this.idx).addClass('cur').siblings().removeClass('cur');
  };
  
  //自动轮播
  Carousel.prototype.autoplay = function () {
    var that = this;
    this.timer = setInterval(function () {
      that.showNext();
    },that.interval)
  };
})();