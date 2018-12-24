// pages/me/Lockers/Lockers.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: '',
    tempLockerList: {},
    hashList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    })
    that.tempLockerList()
  },
  // 柜子类型切换
  selectTab: function(e) {
    var that = this
    let cur = e.currentTarget.dataset.current
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 选择柜子
  cabinetList: function() {
    wx.navigateTo({
      url: '../SelectCabinetList/SelectCabinetList',
    })
  },
  // 临时柜列表
  tempLockerList: function() {
    let that = this
    let loginData = wx.getStorageSync("userInfo")
    let id = loginData.id
    app.agriknow.getTempLockerOrderList(id)
      .then(res => {
        let datas = res.data
        for (var i = 0; i < datas.length; i++) {
          let begin = datas[i].lockerOrderBegtime
          let end = datas[i].lockerOrderEndtime
          var dateBegin = new Date(begin.replace(/-/g, "/")); //将-转化为/，使用new Date
          var dateEnd = new Date(end.replace(/-/g, "/")); //获取当前时间
          var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
          var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
          var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
          var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
          //计算相差分钟数
          var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
          var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
          //计算相差秒数
          var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
          var seconds = Math.round(leave3 / 1000)
          // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
          // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数", hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
          datas[i].hours = hours
          datas[i].min = minutes
        }

        if (res.data.length > 0) {
          that.setData({
            hashList: true,
            tempLockerList: res.data,
          })
        }
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })

  },
  // 租柜时间
  lockerTime: function(d1) {
    var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
    var dateEnd = new Date(); //获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数", hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");
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
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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