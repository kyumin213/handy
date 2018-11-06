// pages/me/myBill/myBill.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBillData: {},
    hashList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 获取我的账单
  getMyBillList() {
    var that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    app.agriknow.getMyBillData(id)
      .then(res => {
        if (res.data.success = '200') {
          that.setData({
            myBillData: res.data
          })
        }
        if (res.data.length > 0) {
          that.setData({
            hashList: true
          })
        } else {
          that.setData({
            hashList: false
          })
        }
      })
      .catch(res => {
        console.log(res)
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
    this.getMyBillList()
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