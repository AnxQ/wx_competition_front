//index.js
//获取应用实例
const app = getApp()
var authreq = require("../../utils/authreq.js")
Page({
  data: {
    PageCur: 'discover',
    portrait: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
    status: "报名中",
    textcut: "NAN",
    date: "2019-4-3",
    author: "NJAU",
    views: "9999",
    likes: "999",
    comments: "99",
    CustomBar: app.globalData.CustomBar,
    compList: [
      { id: 2, status: 3, name: "A", tags: [] }, 
      { id: 1, status: 1, name: "B", tags: [] }]
  },
  onLoad: function(options) {
    authreq.authGet("comps", res => {
      if(res)
        this.setData({ compList: res })
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  }
})
