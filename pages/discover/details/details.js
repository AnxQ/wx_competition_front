const app = getApp();
var authreq = require("../../../utils/authreq.js")
var util = require("../../../utils/util.js")
Page({
  data: {
    ColorList: app.globalData.ColorList,
    statusList: app.globalData.StatusList,
    compDetails: {
      status: 1,
      time_queue: [1554393600, 1554393600, 1554912000, 1554998400, 1555084800],
      location: "南京农业大学",
      info: {
        name: "大学生计算",

        // 换行通过写入列表实现
        description: ["这里是简介，很多很多简介，很多很多很多很多很多，非常非常多",
          "这里是简介，很多很多简介，很多很多很多很多很多，非常非常多"
        ],
        reward: {
          certificate_level: "国际",
          levels: [{
              level: "二等",
              count: 100,
              bonus: 1
            },
            {
              level: "一等",
              count: 10,
              bonus: 10
            },
            {
              level: "特等",
              count: 1,
              bonus: 100
            }
          ]
        },
        fee: 10
      },
      tags: [{
          id: 1,
          name: "计算机"
        },
        {
          id: 2,
          name: "大学生"
        },
        {
          id: 3,
          name: "深度学习"
        },
        {
          id: 4,
          name: "算法"
        },
      ]
    },
    navlist: ["详情", "日程", "评论"],
    TabCur: 0,
    currentStep: 0,
    //   cardCur: 0,
    //   scrollLeft: 0,
    //   swiperList: [
    //   {
    //     id: 0,
    //     type: 'image',
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    //   }, 
    //   {
    //     id: 1,
    //     type: 'image',
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    //   }, {
    //     id: 2,
    //     type: 'image',
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    //   }, 
    //   {
    //     id: 3,
    //     type: 'image',
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    //   }, 
    //   {
    //     id: 4,
    //     type: 'image',
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    //   }, 
    //   {
    //     id: 5,
    //     type: 'image',
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    //   },
    //   {
    //     id: 6,
    //     type: 'image',
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    //   },
    //   ],

  },
  onLoad(options) {
    var compId = options.id;
    if (compId)
      var res = authreq.authGet("comp?id=compId");
    if (res)
      this.setData({
        compDetails: res
      });
    var now = Date.now();
    var i = 0;
    if (this.data.compDetails.time_queue[i] > now)
      this.setData({
        currentStep: -1
      });
    else {
      for (; i < 5 && this.data.compDetails.time_queue[i] * 1000 <= now; ++i);
      this.setData({
        currentStep: i
      })
    }

    var time_queue = this.data.compDetails.time_queue.map(util.formatTimestamp).map(util.formatTime);
    var timeList = [{
      icon: 'usefullfill',
      name: '开始报名',
      time: time_queue[0]
    }, {
      icon: 'radioboxfill',
      name: '结束报名',
      time: time_queue[1]
    }, {
      icon: 'radioboxfill',
      name: '比赛开始',
      time: time_queue[2]
    }, {
      icon: 'radioboxfill',
      name: '比赛结束',
      time: time_queue[3]
    }, {
      icon: 'upstagefill',
      name: '结果发布',
      time: time_queue[4]
    }];
    timeList.splice(i + 1, 0, {
      icon: "timefill",
      name: '现在'
    })
    this.setData({
      timeList: timeList
    });
  },
  // DotStyle(e) {
  //   this.setData({
  //     DotStyle: e.detail.value
  //   })
  // },
  // // cardSwiper
  // cardSwiper(e) {
  //   this.setData({
  //     cardCur: e.detail.current
  //   })
  // },
  // // towerSwiper
  // // 初始化towerSwiper
  // towerSwiper(name) {
  //   let list = this.data[name];
  //   for (let i = 0; i < list.length; i++) {
  //     list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
  //     list[i].mLeft = i - parseInt(list.length / 2)
  //   }
  //   this.setData({
  //     swiperList: list
  //   })
  // },
  // // towerSwiper触摸开始
  // towerStart(e) {
  //   this.setData({
  //     towerStart: e.touches[0].pageX
  //   })
  // },
  // // towerSwiper计算方向
  // towerMove(e) {
  //   this.setData({
  //     direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
  //   })
  // },
  // // towerSwiper计算滚动
  // towerEnd(e) {
  //   let direction = this.data.direction;
  //   let list = this.data.swiperList;
  //   if (direction == 'right') {
  //     let mLeft = list[0].mLeft;
  //     let zIndex = list[0].zIndex;
  //     for (let i = 1; i < list.length; i++) {
  //       list[i - 1].mLeft = list[i].mLeft
  //       list[i - 1].zIndex = list[i].zIndex
  //     }
  //     list[list.length - 1].mLeft = mLeft;
  //     list[list.length - 1].zIndex = zIndex;
  //     this.setData({
  //       swiperList: list
  //     })
  //   } else {
  //     let mLeft = list[list.length - 1].mLeft;
  //     let zIndex = list[list.length - 1].zIndex;
  //     for (let i = list.length - 1; i > 0; i--) {
  //       list[i].mLeft = list[i - 1].mLeft
  //       list[i].zIndex = list[i - 1].zIndex
  //     }
  //     list[0].mLeft = mLeft;
  //     list[0].zIndex = zIndex;
  //     this.setData({
  //       swiperList: list
  //     })
  //   }
  // },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
})