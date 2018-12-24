// pages/me/payPwd/payPwd.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd: false,
    hiddenPwd: false,
    types: "password",
    pwdType: 'password',
    pwd1: '',
    pwd2: '',
    pwdErr: '',
    disabled: true,
    ispass: true,
    ispass2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //显示密码
  showPwd: function() {
    var that = this
    var showPwd = that.data.pwd
    if (showPwd === true) {
      that.setData({
        pwd: false,
        ispass: true
      })
    } else {
      that.setData({
        pwd: true,
        ispass: false
      })
    }
  },
  // 确认密码显示
  comfirPwd: function() {
    var that = this
    var showPwd = that.data.hiddenPwd
    if (showPwd === true) {
      that.setData({
        hiddenPwd: false,
        ispass2: true
      })
    } else {
      that.setData({
        hiddenPwd: true,
        ispass2: false
      })
    }
  },
  // 密码
  pwd1: function(e) {
    let that = this
    let pwd1 = parseInt(e.detail.value)
    let pwd2 = that.data.pwd2
    console.log(pwd2)
    that.setData({
      pwd1: pwd1
    })
    if (pwd1 != pwd2 && pwd2 != '') {
      that.setData({
        pwdErr: '两次密码不一致'
      })
    } else if (pwd1 == pwd2 && pwd2 != '') {
      that.setData({
        pwdErr: '',
        disabled: false
      })
    }
  },
  // 确认密码
  pwd2: function(e) {
    let that = this
    let pwd2 = parseInt(e.detail.value)
    let pwd1 = that.data.pwd1
    console.log(pwd1)
    that.setData({
      pwd2: pwd2
    })
    if (pwd1 != pwd2 && pwd2 != '') {
      that.setData({
        pwdErr: true
      })
    } else if (pwd1 == pwd2 && pwd2 != '') {
      that.setData({
        pwdErr: false,
        disabled: false
      })
    }
  },
  // 完成
  subPwd: function() {
    let that = this
    let pwd = (that.data.pwd2).toString()
    let userData = wx.getStorageSync('userInfo')
    let id = userData.id
    app.agriknow.updateLockerPwd(id, pwd).then(res => {
      console.log(res.success)
      if (res.success == '400') {
        wx.showToast({
          title: '设置失败',
          icon: '',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(function() {
          wx.switchTab({
            url: '../me',
          })
        }, 1000)

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  }
})