//index.js
//获取应用实例
var agri = require("../../utils/agriknow.js")
var login = require("../../utils/util.js")
var app = getApp()

Page({
  data: {
    showModel: false
  },

  onLoad: function() {
    // var that = this
    // var loginData = wx.getStorageSync("userInfo")
    // var userData = wx.getStorageSync('userInfoMsg')
    // var id = loginData.id
    // console.log(id)
    // if (loginData != undefined) {
    //   if (!userData) {
    //     that.setData({
    //       showModel: true
    //     })
    //   } else {
    //     that.setData({
    //       showModel: false
    //     })
    //   }
    // } else {
    //   that.setData({
    //     showModel: false
    //   })
    // }
  },
  agreeGetUser: function(e) {
    //设置用户信息本地存储
    try {
      wx.setStorageSync('userInfoMsg', e.detail.userInfo)
    } catch (e) {
      wx.showToast({
        title: '系统提示:网络错误',
        icon: 'warn',
        duration: 1500,
      })
    }
    wx.showToast({
      title: '授权成功',
      icon: 'success',
      duration: 1500
    })
    let that = this
    that.setData({
      showModel: false
    })

    that.getOP(e.detail.userInfo)
  },
  getOP: function(res) { //提交用户信息 获取用户id
    let that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    let userInfo = res
    var nickName = res.nickName
    var gender = res.gender
    var province = res.province
    var country = res.country
    var city = res.city
    var language = res.language
    var avatarUrl = res.avatarUrl
    app.globalData.userInfo = userInfo
    app.agriknow.getUserInfoData(id, nickName, gender, province, country, city, language, avatarUrl).then(res => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    var loginData = wx.getStorageSync("userInfo")
    var userData = wx.getStorageSync('userInfoMsg')
    var id = loginData.id
    if (loginData != undefined) {
      if (!userData) {
        that.setData({
          showModel: true
        })
      } else {
        that.setData({
          showModel: false
        })
      }
    } else {
      that.setData({
        showModel: false
      })
    }

    login.login()

  },
})