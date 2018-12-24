// pages/me/viewComplete/viewComplete.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    carefulDes: "1．本会所向会员免费提供WIFI、热水沐浴、沐浴用品、吹风机、体重秤、自助手机充电宝租借、休息区。 2．会员会籍只限本人使用。 3．会员单日单次入场使用费20元/次。 4．当日预约私教课程及团操课程可免全日入场费，课程取消将自动扣除入场费。 5．私教课程须提前至少24小时预约，取消需在上课前6小时，未取消及未上课系统自带扣除课时及费用。 6．团操课程预约后，取消需在开课前2小时，未取消及未上课系统自带扣除课时及费用。 7．团操课程开课后15分钟，会员不可进入课室上课，已缴纳费用无需退还。8． 私教课程及团操课程收费需按照课程标准收费（ 详见各课程合同收费条款）",
    jianShow: '',
    more: false,
    begin: '',
    end: '',
    names: '',
    dates: '',
    times: '',
    code: '',
    loadingTimes: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var des = that.data.carefulDes
    let begin = options.begin
    let end = options.end
    let names = options.names
    let dates = options.dates
    let code = options.code
    var conDes = des.slice(0, 100)
    that.setData({
      end: end,
      begin: begin,
      names: names,
      dates: dates,
      code: code
    })
    if (conDes.length >= 100) {
      that.setData({
        jianShow: conDes,
        more: true
      })
    } else {
      that.setData({
        carefulDes: des,
        more: false
      })
    }
  },

  // 邀请好友
  invitingFriends: function() {
    var loginData = wx.getStorageSync("userInfo")
    var memberId = loginData.id
    let userId = '0'
    wx.navigateTo({
      url: '../InvitingFriends/InvitingFriends?memberId=' + memberId + '&userId=' + userId,
    })
  },
  // 二维码入场
  codeIn: function(e) {
    let that = this
    let times = that.data.times
    let memberCode = that.data.code
    that.endSetInter()
    wx.navigateTo({
      url: '../../admissionCode/admissionCode?times=' + times + '&memberCode=' + memberCode,
    })
  },
  // 清除定时器
  endSetInter: function() {
    var that = this;
    clearInterval(that.data.loadingTimes)
  },
  // 注意事项查看更多
  moreView: function(e) {
    var that = this
    var des = that.data.carefulDes
    that.setData({
      jianShow: des,
      more: false
    })
  },
  // 注意事项收起
  takeUp: function() {
    var that = this
    var des = that.data.jianShow
    console.log(des.length)
    var conDes = des.slice(0, 100)
    console.log(conDes)
    if (des.length >= 100) {
      that.setData({
        jianShow: conDes,
        more: true
      })
    }
  },
  // 当前时间
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
  // 取消预约
  cancelOrder: function() {
    let that = this
    let loginData = wx.getStorageSync("userInfo")
    let id = loginData.id
    let memberCoursePkcode = that.data.code
    wx.showModal({
      title: '温馨提示',
      content: '是否确定取消预约',
      success(res) { 
        if (res.confirm){
          app.agriknow.teamCourseRefund(id, memberCoursePkcode)
            .then(res => {
              console.log(res.success)
              if (res.success == '200') {
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '../me',
                  })
                }, 1000)
              } else {
                wx.showToast({
                  title: '取消失败',
                  icon: '',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.switchTab({
                    url: '../me',
                  })
                }, 1000)
              }
            })
        } 
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
    let that = this
    let loadingTimes = that.data.loadingTimes
    that.setData({
      loadingTimes: setInterval(function() {
        that.nowTime()
      }, 10000)
    })
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