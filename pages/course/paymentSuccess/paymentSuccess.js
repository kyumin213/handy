// pages/course/paymentSuccess/paymentSuccess.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    success: '',
    hashList: false,
    message: '',
    names: '',
    times: '',
    store: '',
    start: '',
    end: '',
    showList: false,
    money: '',
    courseName: null,
    coachName: null,
    hour: null,
    tm: null,
    coachList: false,
    storeMsgList: false,
    storeCoachId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var success = options.success
    var names = options.names
    var times = options.times
    var store = options.store
    var start = options.start
    var courseName = options.courseName
    var coachName = options.coachName
    let hour = options.hour
    let tm = options.tm
    var end = options.end
    var message = options.message
    var money = options.money
    if (courseName != undefined || coachName != undefined || hour != undefined || tm != undefined) {
      that.setData({
        coachName: coachName,
        courseName: courseName,
        hour: hour,
        tm: tm,
        coachList: true
      })
    }
    if (money != undefined) {
      that.setData({
        showList: true,
        money: money,
      })
    } else if (money === undefined) {
      that.setData({
        showList: false
      })
    }
    if (names != undefined || times != undefined || store != undefined || start != undefined || end != undefined) {
      that.setData({
        names: names,
        times: times,
        store: store,
        start: start,
        end: end,
        storeMsgList: true
      })
    } else {
      that.setData({
        storeMsgList: false
      })
    }
    that.setData({
      message: message
    })
    if (success === '200') {
      that.setData({
        hashList: true
      })
    } else {
      that.setData({
        hashList: false
      })
    }

    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 邀请好友
  invitingFriends: function() {
    wx.navigateTo({
      url: '../../me/InvitingFriends/InvitingFriends',
    })
  },
  // 返回
  backBtn: function() {
    var that = this
    var shows = that.data.showList
    let coachId = that.data.storeCoachId
    var coachList = that.data.coachList
    if (shows) {
      wx.switchTab({
        url: '../../me/me',
      })
    } else if (coachList) {
      wx.switchTab({
        url: '../../attention/attention',
      })
      // wx.navigateTo({
      //   url: '../../privateCoachDetails/privateCoachDetails?coachId=' + coachId,
      // })
    } else {
      wx.switchTab({
        url: '../course'
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