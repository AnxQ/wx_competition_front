const serverUrl = "https://app.zhangxinchao.top/service/"
var header = {
  'Accept': 'application/json',
  'content-type': 'application/json',
  'Authorization': null,
}

function authRequire(url, method, callback, data=null) {
  wx.showLoading({ title: '少女祈祷中...' });
  wx.request({
    url: serverUrl + url,
    method: method,
    data: data,
    header: header,
    success: function (res) {
      wx.hideLoading();
      return typeof callback == "function" && callback(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof callback == "function" && callback(false)
    }
  })
}

const authGet = (url, callback) => authRequire(url, 'get', callback);
const authPost = (url, callback, data) => authRequire(url, 'post', callback, data);
const authPut = (url, callback, data) => authRequire(url, 'put', callback, data);

module.exports = {
  authGet: authGet,
  authPost: authPost,
  authPut: authPut,
  header: header,
  serverUrl: serverUrl
}