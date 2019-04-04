const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimestamp = timestamp => {
  return new Date(timestamp*1000);
}
 
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const goLink = link => {
  // 暂时用不了
  // wx.navigateTo({
  //   url: "/pages/component/outpage/outpage?link="+link,
  //   fail: () => { wx.setClipboardData({
  //     data: e.currentTarget.dataset.link,
  //     success: res => {
  //       wx.showToast({
  //         title: '已复制',
  //         duration: 1000,
  //       })
  //     }
  //   })}
  // })

  wx.setClipboardData({
    data: link,
    success: res => {
      wx.showToast({
        title: '已复制',
        duration: 1000,
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatTimestamp: formatTimestamp,
  goLink: goLink
}