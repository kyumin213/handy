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
    allele: true,
    completed: true,
    cancelled: true,
    teamCourseList: {},
    cancelList: {},
    wcList: {},
    jxzList: {},
    djxList: {},
    hashList: true,
    cancelledList: true,
    completedList: true,
    stayConductList: true,
    alleleList: true,
    begin: '',
    end: '',
    memberCode: '',
    times: '',
    loadingTimes: '',
    currentTab: 0,
    winHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var status = options.status
    // var stayConduct = that.data.stayConduct
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    })
    that.cancelled()
    that.conduct()
    that.completed()
    that.allele()
    if (status == 'djx') {
      that.setData({
        // stayConduct: true,
        // completed: false,
        // cancelled: false,
        // allele: false,
        currentTab: 0
      })
      // that.myTeamCourse()
      that.conduct()
    } else if (status == 'jxz') {
      that.setData({
        // allele: true,
        // stayConduct: false,
        // completed: false,
        // cancelled: false,
        currentTab: 1
      })
      that.allele()
    } else if (status == 'ywc') {
      that.setData({
        // allele: false,
        // stayConduct: false,
        // completed: true,
        // cancelled: false,
        currentTab: 2
      })
      that.completed()
    } else if (status == 'yqx') {
      that.setData({
        // allele: false,
        // stayConduct: false,
        // completed: false,
        // cancelled: true,
        currentTab: 3
      })
      that.cancelled()
    }
    that.nowTime()
  },
  // tab切换
  coachTab: function(e) {
    var that = this
    let cur = e.currentTarget.dataset.current
    console.log(cur)
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  nowTime: function() {
    let that = this
    let newData = new Date()
    let y = newData.getFullYear()
    let month = newData.getMonth() + 1
    let d = newData.getDate()
    let h = newData.getHours()
    let m = newData.getMinutes()
    let s = newData.getSeconds()
    let nowData = that.data.nowData
    if (month < 10) {
      month = '0' + month
    }
    if (d < 10) {
      d = '0' + d
    }
    if (h < 10) {
      h = '0' + h
    }
    if (m < 10) {
      m = '0' + m
    }
    if (s < 10) {
      s = '0' + s
    }
    let times = y + '-' + month + '-' + d + ' ' + h + ':' + m + ':' + s
    that.setData({
      times: times
    })
  },
  // 二维码入场
  codeIn: function(e) {
    let that = this
    let times = that.data.times
    let memberCode = e.currentTarget.dataset.code
    that.endSetInter()
    wx.navigateTo({
      url: '../../admissionCode/admissionCode?times=' + times + '&memberCode=' + memberCode,
    })
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
    // that.setData({
    //   stayConduct: true,
    //   stayAssess: false,
    //   allele: false,
    //   completed: false,
    //   cancelled: false
    // })
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
    // that.setData({
    //   stayConduct: false,
    //   stayAssess: false,
    //   allele: true,
    //   completed: false,
    //   cancelled: false
    // })
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
    // that.setData({
    //   stayConduct: false,
    //   stayAssess: false,
    //   allele: false,
    //   completed: true,
    //   cancelled: false
    // })
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
    // that.setData({
    //   stayConduct: false,
    //   stayAssess: true,
    //   allele: false,
    //   completed: false,
    //   cancelled: false
    // })
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
    // that.setData({
    //   // stayConduct: false,
    //   // stayAssess: false,
    //   // allele: false,
    //   // completed: false,
    //   // cancelled: true
    //   currentTab:3
    // })
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
  // 清除定时器
  endSetInter: function() {
    var that = this;
    clearInterval(that.data.loadingTimes)
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
    let that = this
    // that.nowTime()
    let loadingTimes = that.data.loadingTimes
    that.setData({
      loadingTimes: setInterval(function() {
        // qrcode.makeCode(txt)
        that.nowTime()
      }, 10000)
    })
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
    let that = this
    that.endSetInter()
    let loadingTimes = that.data.loadingTimes
    clearInterval(loadingTimes)
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