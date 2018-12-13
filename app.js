//app.js
import agriknow from './utils/agriknow.js'
App({
  onLaunch: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo
          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    mini_user_id: '',
    keys:'',
    access:'',
    mini_user_phoneNumber: '',
    memberId:null,
    http_address: 'https://www.linkgooo.com/test_mini_member_api', //测试地址
     // http_address: 'https://www.handyfitness.com.cn/mini_member_api' //正式地址
    temporaryLogin: function (encryptedData, iv) {
      wx.hideLoading();
      wx.login({
        success: function(res) {
          if (res.code) {
            wx.request({
              url: getApp().globalData.http_address + '/wechatLogin',
              data: {
                // id: getApp().globalData.mini_user_id,
                encryptedData: encryptedData,
                iv: iv,
                js_code: res.code
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success: function(rs) {
                if (rs.data.success != '200') {
                  wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: rs.data.message
                  })
                  return false
                } else {
                  // wx.switchTab({
                  //   url: '/pages/index/index',
                  // })
                  wx.navigateBack({
                    delta: -1
                  })
                }

              }
            })
          }
        }
      })
    },
    temporaryLogins: function (encryptedData, iv,memberId) {
      wx.hideLoading();
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: getApp().globalData.http_address + '/wechatLogin',
              data: {
                // id: getApp().globalData.mini_user_id,
                encryptedData: encryptedData,
                iv: iv,
                js_code: res.code,
                memberId: memberId
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              success: function (rs) {
                if (rs.data.success != '200') {
                  wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: rs.data.message
                  })
                  return false
                } else {
                  // wx.switchTab({
                  //   url: '/pages/index/index',
                  // })
                  wx.navigateBack({
                    delta: -1
                  })
                }

              }
            })
          }
        }
      })
    },
  },
  agriknow: new agriknow()
})