// pages/attention/attention.js
var agri = require("../../utils/agriknow.js")
var login = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followStatus: true,
    item: '已关注',
    coachList: {},
    hashList: false,
    currentTab: 0,
    teamList: {},
    teamTab: false,
    winHeight: '',
    ios: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
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
    });
    
    that.teamList()
    that.coachList()
    
  },
  // 私教教练列表
  coachList: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var coachType = 2
    var storeProvince = ''
    var storeCity = ''
    var storeDistrict = ''
    // that.setData({
    //   currentTab: 1
    // })
    app.agriknow.getCoachList(id, coachType, storeProvince, storeCity, storeDistrict)
      .then(res => {
        if (res.data.success = '200') {
          that.setData({
            coachList: res.data
          })
          if (res.data.length > 0) {
            that.setData({
              hashList: true
            })
          } else {
            that.setData({
              hashList: false
            })
          }
        }
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  // 团操教练列表
  teamList: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var coachType = 1
    var storeProvince = ''
    var storeCity = ''
    var storeDistrict = ''
    // that.setData({
    //   currentTab: 0
    // })
    app.agriknow.getCoachList(id, coachType, storeProvince, storeCity, storeDistrict)
      .then(res => {
        if (res.data.length > 0) {
          that.setData({
            teamList: res.data
          })
          setTimeout(() => {
            this.setData({
              teamTab: true
            });
          }, 250)
        } else {
          that.setData({
            hashList: false
          })
        }
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  // 教练详情
  coachDetails: function(e) {
    var coachId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../coachDetails/coachDetails?coachId=' + coachId,
    })
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 私教详情
  precoachDetails: function(e) {
    var coachType = 2
    var coachId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../privateCoachDetails/privateCoachDetails?coachId=' + coachId + '&coachType=' + coachType,
    })
  },
  // 教练tab切换
  coachTab: function(e) {
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
  /**
   * 取消关注
   */
  follow: function() {
    var that = this
    var follow = that.data.followStatus
    if (follow == true) {
      that.setData({
        item: "关注",
        followStatus: false
      })

    } else if (follow == false) {
      that.setData({
        item: "已关注",
        followStatus: true
      })
    }
  },
  onLaunch: function () {
    var that = this;
    var phoneInfo = wx.getSystemInfo({
      success: function (res) {
        if (res.system.indexOf("iOS") != -1) {
          that.data.ios = true
        }
      }
    });
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
    // this.teamList()
    login.login()
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
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
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