// pages/me/myCoupon/myCoupon.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: {},
    hashList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.getCouponList()
  },
  // 查询优惠券
  getCouponList: function() {
    let that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    app.agriknow.getCoupon(id)
      .then(res => {
        let datas = res.data
        if (res.data.length > 0) {
          for (var i = 0; i < datas.length; i++) {
            var ss = datas[i].begtime
            var endtime = datas[i].endtime
            var lastStr = ss.substring(0, 10)
            var lastEnd = endtime.substring(0, 10)
            datas[i].begin = lastStr
            datas[i].end = lastEnd
            let status = datas[i].useStatus
            if(status == 0){
              that.setData({
                couponList: res.data,
                hashList: true
              })
            }
          }
   
        }

      })
      .catch(res => {

      })
  },
  // 使用
  buyCourse: function() {
    wx.switchTab({
      url: '../../course/course',
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