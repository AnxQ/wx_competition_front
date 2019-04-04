//app.js
var authreq = require('./utils/authreq.js')
App({
  globalData: {
    userInfo: null,
    userDetails: null,
    ColorList: [{
        name: 'red',
      },
      {
        name: 'orange'
      },
      {
        name: 'yellow',
      },
      {
        name: 'olive',
      },
      {
        name: 'green',
      },
      {
        name: 'cyan',
      },
      {
        name: 'blue',
      },
      {
        name: 'purple',
      },
      {
        name: 'mauve',
      },
      {
        name: 'pink',
      },
      {
        name: 'brown',
      },
      {
        name: 'grey',
      }
    ],
    StatusList: [{
      name: "等待报名开始",
      color: "bg-green light"
    },
    {
      name: "报名中",
      color: "bg-gradual-red"
    },
    {
      name: "报名截止",
      color: "bg-blue"
    },
    {
      name: "进行中",
      color: "bg-gradual-orange"
    },
    {
      name: "已结束",
      color: "bg-grey light"
    },
    {
      name: "结果发布",
      color: "bg-gradual-pink"
    },
    ],
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: authreq.serverUrl + 'auth',
          data: {
            code: res.code
          },
          success: res => {
            // 把当前的AuthKey存储
            authreq.header.Authorization = res.header['Authorization'];
            // 直接尝试拉取用户详细信息
            authreq.authGet("user", res => {
              if (res)
                this.globalData.userDetails = res;
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
})