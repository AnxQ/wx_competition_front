// pages/about/home/home.js
const app = getApp();
var authreq = require('../../../utils/authreq.js')
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    userDetails: {},
    userInfo:{},
    userStatus: {
      group: 0,
      notify: 0
    },
  },

  attached() {
    authreq.authGet("user", res => {
      if (res)
        app.globalData.userDetails = res;
    });
    this.setData({
      userInfo: app.globalData.userInfo,
      userDetails: app.globalData.userDetails,
      hasUserInfo: true
    });
    wx.hideLoading()
  },
  methods: {
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  }
})