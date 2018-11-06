var app = getApp().globalData
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function login() {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.request({
          url: app.http_address + '/tempLogin',
          data: {
            js_code: res.code
          },
          method: "POST",
          success: function (rs) {
            if (rs.data.success == '200') {
              let loginData = wx.getStorageSync('userInfo') || {}
              let login = rs.data.data
              wx.setStorageSync('userInfo', login)
              var Mobile = rs.data.data.mobile
              app.userInfo = login
            }
            if (Mobile) {   //判断是否存在手机号，否则跳转授权微信页面
              app.mini_user_phoneNumber = Mobile
            } else {
              // wx.navigateTo({
              //   url: '../wechatLogin/wechatLogin'
              // })
              wx.navigateTo({
                url: '../authorization/authorization',
              })
            }
          },
          fail: function (e) {
            wx.showToast({
              title: "fail",
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  login:login
}
