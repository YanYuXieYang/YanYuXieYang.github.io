/*
 * @Author: your name
 * @Date: 2021-03-03 20:27:36
 * @LastEditTime: 2021-03-06 18:29:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WebProject\dont_step_on_the_white_block\index.js
 */
function Index () {
  this.score = 0;
  this.lastScore = 0;
  this.speed = 2;
  this.color = ['#cc66cc', '#99ff66', '#66ffcc', '#FF7F24'];
  this.dom = {
    title: $('.title'),
    main: $('.main'),
    author: $('.Author')
  };
  this.bindEvent();
  this.timer1 = {};//动态产生DIV定时器，用于产生动画
  this.timer2 = {};//动态检测得分，增加速度
}
/**
 * @description: 绑定事件
 * @param {*}
 * @return {*}
 */
Index.prototype.bindEvent = function () {
  var self = this;
  var topValue = -150;
  self.dom.title.on('click', function () {
    self.dom.title.css('display', 'none');
    self.dom.author.hide();
    self.createBlock(0);
    self.timer1 = setInterval(function () {
      var main = self.dom.main;
      topValue += self.speed;
      if (main.children().length >= 6) {//此处判定是否有漏点，如果有，游戏结束，清除结果
        for (let i = 0; i < 4; i++) {
          if (main.children().eq(5).children().eq(i).attr('class') == 'target') {
            alert('game over 你的得分为' + self.score);
            clearInterval(self.timer1);
            clearInterval(self.timer2);
            return;
          }
        }
        main.children().eq(5).remove();
      }
      if (parseInt(main.css('top')) > 0) {//设置动态移动，形成动画效果
        main.css('top', '-150px');
        topValue = -150;
        self.createBlock(1);
        return;
      }
      main.css({ 'top': topValue + 'px', })
    }, 10)
    self.timer2 = setInterval(function () {//timer2监测分数，并随着分数增加而提速
      var DisScore = self.score - self.lastScore;
      if (DisScore == 10) {
        self.speed++;
        self.lastScore = self.score;
        DisScore = 0;
      }
    }, 200)
  });
};
/**
 * @description: 动态生成方块，并绑定相关点击事件
 * @param {*} IO 等于0或1，分别代表第一次产生和非第一次产生
 * @return {*} none
 */
Index.prototype.createBlock = function (IO) {
  var self = this;
  var main = self.dom.main;
  var row = $('<div class="row"></div>');
  if (IO == 0) {
    main.append(row);
    main.css('display', 'block');
  } else if (IO == 1) {
		main.prepend(row);
  }
  for (let i = 0; i < 4; i++) {
    var column = $('<div class="col"></div>');
    row.append(column);
    column.on('click', function () {
      $this = $(this);
      if ($this.attr('class') == 'target') {
        $this.css('backgroundColor', '#eee').attr('class', 'col');
        self.score++;
        return;
      }
      alert('game over 你的得分为' + self.score);
			clearInterval(self.timer1);
			clearInterval(self.timer2);
    })
  }
  var index = parseInt(Math.random() * 4);
  $(row.children()[index]).css('backgroundColor', self.color[index]);//children返回jquery元素，但是类数组内部是dom元素
  $(row.children()[index]).attr('class', 'target');
}

new Index();