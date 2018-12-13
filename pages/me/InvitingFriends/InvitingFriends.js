// pages/me/InvitingFriends/InvitingFriends.js
var agri = require("../../../utils/agriknow.js")
// var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: 'http://112.74.169.46:8094/api/file/uploadfile/file/images/me/invitingFriends.png',
    memberId: '',
    userId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let loginData = wx.getStorageSync("userInfo")
    let id = loginData.id
    let userId = options.userId
    let memberId = options.memberId
    if (id != undefined && userId == '1') {
      wx.switchTab({
        url: '../../index/index',
      })
    }
    that.setData({
      memberId: memberId,
      userId: userId
    })
    that.getLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getLogin: function() {
    let that = this
    let memberId = that.data.memberId
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: app.globalData.http_address + '/tempLogin',
            data: {
              js_code: res.code
            },
            method: "POST",
            success: function(rs) {
              if (rs.data.success == '200') {
                let loginData = wx.getStorageSync('userInfo') || {}
                let login = rs.data.data
                wx.setStorageSync('userInfo', login)
                var Mobile = rs.data.data.mobile
                app.userInfo = login
              }
              if (Mobile) { //判断是否存在手机号，否则跳转授权微信页面
                app.mini_user_phoneNumber = Mobile
              } else {
                // wx.navigateTo({
                //   url: '../wechatLogin/wechatLogin'
                // })
                if (memberId){
                  wx.navigateTo({
                    url: '../../authorization/authorization?memberId=' + memberId,
                  })
                }else{
                  
                }
              }
            },
            fail: function(e) {
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // login.login()
    // let that = this
    let that = this
    that.getLogin()
    let loginData = wx.getStorageSync("userInfo")
    let id = loginData.id
    let userId = that.data.userId
    if (id != undefined && userId == '1') {
      wx.switchTab({
        url: '../../index/index',
      })
    }
    // if (id != undefined && userId == '1') {
    //   wx.switchTab({
    //     url: '../../index/index',
    //   })
    // } else if (id === undefined && userId == '1') {
    //   that.getLogin()
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let that = this
    // let loginData = wx.getStorageSync("userInfo")
    let memberId = that.data.memberId
    console.log('me---' + memberId)
    return {
      title: '邀请好友',
      // desc: '分享页面的内容',
      path: 'pages/me/InvitingFriends/InvitingFriends?userId=1' + '&memberId=' + memberId, // 路径，传递参数到指定页面。

    }
  }
})

function login() {
  wx.login({
    success: function(res) {
      if (res.code) {
        wx.request({
          url: app.globalData.http_address + '/tempLogin',
          data: {
            js_code: res.code
          },
          method: "POST",
          success: function(rs) {
            if (rs.data.success == '200') {
              let loginData = wx.getStorageSync('userInfo') || {}
              let login = rs.data.data
              wx.setStorageSync('userInfo', login)
              var Mobile = rs.data.data.mobile
              app.userInfo = login
            }
            if (Mobile) { //判断是否存在手机号，否则跳转授权微信页面
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
          fail: function(e) {
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