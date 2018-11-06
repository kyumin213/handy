// pages/me/myAappointment/myAppointment.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stayConduct: true,
    // stayAssess: false,
    allele: false,
    completed: false,
    cancelled: false,
    teamCourseList: {},
    cancelList: {},
    wcList: {},
    jxzList: {},
    djxList: {},
    hashList: false,
    cancelledList: false,
    completedList: false,
    stayConductList: false,
    alleleList: false,
    begin: '',
    end: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var status = options.status
    // var stayConduct = that.data.stayConduct
    var that = this
    if (status == 'djx') {
      that.setData({
        stayConduct: true,
        completed: false,
        cancelled: false,
        allele: false,
      })
      // that.myTeamCourse()
      that.conduct()
    } else if (status == 'jxz') {
      that.setData({
        allele: true,
        stayConduct: false,
        completed: false,
        cancelled: false,
      })
      that.allele()
    } else if (status == 'ywc') {
      that.setData({
        allele: false,
        stayConduct: false,
        completed: true,
        cancelled: false,
      })
      that.completed()
    } else if (status == 'yqx') {
      that.setData({
        allele: false,
        stayConduct: false,
        completed: false,
        cancelled: true,
      })
      that.cancelled()
    }
    
  },
  // 我的团体课程
  myTeamCourse: function() {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var status = 1
    app.agriknow.getMyTeamCourse(id, status)
      .then(res => {
        that.setData({
          djxList: res.data
        })
        if (res.data.length > 0) {
          that.setData({
            stayConductList: true
          })
        } else {
          that.setData({
            stayConductList: false
          })
        }
          var datas = res.data
          for (var i = 0; i < datas.length; i++) {
            var ss = datas[i].begtime
            var endtime = datas[i].endtime
            var lastStr = ss.substring(10, 16)
            var lastEnd = endtime.substring(10, 16)
            datas[i].begin = lastStr
            
            datas[i].end = lastEnd
            // that.setData({
            //   begin: lastStr,
            //   end: lastEnd
            // })
        }
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 待进行
  conduct: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    that.setData({
      stayConduct: true,
      stayAssess: false,
      allele: false,
      completed: false,
      cancelled: false
    })
    var status = 1
    app.agriknow.getMyTeamCourse(id, status)
      .then(res => {
        var datas = res.data
        for (var i = 0; i < datas.length; i++) {
          var ss = datas[i].begtime
          var endtime = datas[i].endtime
          // var da = ss.lastIndexOf(' ')
          var lastStr = ss.substring(10, 16)
          var lastEnd = endtime.substring(10, 16)
          datas[i].begin = lastStr
          datas[i].end = lastEnd
          console.log(res.data[i].begin)
        }
        if (res.data.length > 0) {
          that.setData({
            stayConductList: true,
            djxList: res.data
          })
        } else {
          that.setData({
            stayConductList: false
          })
        }
    
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 进行中
  allele: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    that.setData({
      stayConduct: false,
      stayAssess: false,
      allele: true,
      completed: false,
      cancelled: false
    })
    var status = 2
    app.agriknow.getMyTeamCourse(id, status)
      .then(res => {
        var datas = res.data
        for (var i = 0; i < datas.length; i++) {
          var ss = datas[i].begtime
          var endtime = datas[i].endtime
          // var da = ss.lastIndexOf(' ')
          var lastStr = ss.substring(10, 16)
          var lastEnd = endtime.substring(10, 16)
          datas[i].begin = lastStr
          datas[i].end = lastEnd
        }
        if (res.data.length > 0) {
          that.setData({
            alleleList: true,
            jxzList: res.data
          })
        } else {
          that.setData({
            alleleList: false
          })
        }
  
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 已完成
  completed: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    that.setData({
      stayConduct: false,
      stayAssess: false,
      allele: false,
      completed: true,
      cancelled: false
    })
    var status = 3
    app.agriknow.getMyTeamCourse(id, status)
      .then(res => {
        var datas = res.data
        for (var i = 0; i < datas.length; i++) {
          var ss = datas[i].begtime
          var endtime = datas[i].endtime
          // var da = ss.lastIndexOf(' ')
          var lastStr = ss.substring(10, 16)
          var lastEnd = endtime.substring(10, 16)
          datas[i].begin = lastStr
          datas[i].end = lastEnd
        }
        if (res.data.length > 0) {
          that.setData({
            completedList: true,
            wcList: res.data
          })
        } else {
          that.setData({
            completedList: false
          })
        }

      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 全部
  assess: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    that.setData({
      stayConduct: false,
      stayAssess: true,
      allele: false,
      completed: false,
      cancelled: false
    })
    // var status = 3
    app.agriknow.getMyTeamCourse(id)
      .then(res => {
        if (res.data.length > 0) {
          that.setData({
            hashList: true
          })
        } else {
          that.setData({
            hashList: false
          })
        }
        if (res.data.success = '200') {
          that.setData({
            wcList: res.data
          })
        }
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 已取消
  cancelled: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    that.setData({
      stayConduct: false,
      stayAssess: false,
      allele: false,
      completed: false,
      cancelled: true
    })
    var status = 4
    app.agriknow.getMyTeamCourse(id, status)
      .then(res => {
        var datas = res.data
        for (var i = 0; i < datas.length; i++) {
          var ss = datas[i].begtime
          var endtime = datas[i].endtime
          // var da = ss.lastIndexOf(' ')
          var lastStr = ss.substring(10, 16)
          var lastEnd = endtime.substring(10, 16)
          datas[i].begin = lastStr
          datas[i].end = lastEnd
        }
        if (res.data.length > 0) {
          that.setData({
            hashList: true,
            cancelList: res.data
          })
        } else {
          that.setData({
            hashList: false
          })
        }

      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 查看详情
  viewDetails: function() {
    wx.navigateTo({
      url: '../viewComplete/viewComplete',
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
    // this.myTeamCourse()
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