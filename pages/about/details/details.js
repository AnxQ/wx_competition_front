// pages/about/details/details.js
const app = getApp();
var authreq = require("../../../utils/authreq.js")
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userDetails: app.globalData.userDetails,
    detailsChanged: false,
    genderPicker: ['男', '女'],
    genderIndex: null,
    rolePicker: ['其他', '教师', '学生'],
    roleIndex: null
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {
    // 鉴于Page将先于request被加载
    this.setData({
      userDetails: app.globalData.userDetails,
      genderIndex: app.globalData.userDetails.gender,
      roleIndex: app.globalData.userDetails.role
    })


  },
  GenderPickerChange(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  RolePickerChange(e) {
    this.setData({
      roleIndex: e.detail.value
    })
  },
  hideGender: function(e) {
    this.setData({ hideGender: e.detail.value }); 
  },
  formSubmit: function(e) {
    var currentValues = e.detail.value;
    var stagingData = this.data.userDetails;
    for(var setting in stagingData.settings)
      stagingData.settings[setting] = currentValues[setting]
    stagingData.name = currentValues.name ? currentValues.name : stagingData.name;
    stagingData.school = currentValues.school ? currentValues.school : stagingData.school;
    stagingData.school_num = currentValues.school_num ? currentValues.school_num : stagingData.school_num;
    stagingData.tel = currentValues.tel ? currentValues.tel : stagingData.tel;
    stagingData.role = this.data.roleIndex;
    stagingData.gender = this.data.genderIndex;
    authreq.authPost("user", res => {
      if(res.result == "success") {
        wx.showToast({ title: '修改成功', duration: 1000, complete: wx.navigateBack() });
        app.globalData.userDetails = stagingData;
      }
      else
        wx.showToast({ title: '修改失败', duration: 1000 })
    }, stagingData)
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})