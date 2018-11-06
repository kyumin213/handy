// pages/find/find.js
var app = getApp()
var logins = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnBgColor: '#d71718',
    follow: '关注',
    btnColor: '#FFF'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 关注
   */
  follow: function() {
    var that = this
    var bgColor = that.data.btnBgColor == '#d71718' ? '#fff' : '#d71718'
    var btnColor = that.data.btnColor == '#fff' ? '#d71718' : '#fff'
    that.setData({
      btnBgColor: bgColor,
      btnColor: btnColor
    })
    if (bgColor == '#d71718') {
      that.setData({
        follow: '关注'
      })
      wx.navigateTo({
        url: '../attention/attention'
      })
    } else {
      that.setData({
        follow: '已关注',
        btnColor: '#d71718'
      })
    }
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
    logins.login()
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