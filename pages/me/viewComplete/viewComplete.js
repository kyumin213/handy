// pages/me/viewComplete/viewComplete.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    carefulDes: "1．本会所向会员免费提供WIFI、热水沐浴、沐浴用品、吹风机、体重秤、自助手机充电宝租借、休息区。 2．会员会籍只限本人使用。 3．会员单日单次入场使用费20元/次。 4．当日预约私教课程及团操课程可免全日入场费，课程取消将自动扣除入场费。 5．私教课程须提前至少24小时预约，取消需在上课前6小时，未取消及未上课系统自带扣除课时及费用。 6．团操课程预约后，取消需在开课前2小时，未取消及未上课系统自带扣除课时及费用。 7．团操课程开课后15分钟，会员不可进入课室上课，已缴纳费用无需退还。8． 私教课程及团操课程收费需按照课程标准收费（ 详见各课程合同收费条款）",
    jianShow:'',
    more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    var des = that.data.carefulDes
    var conDes = des.slice(0, 100)
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
    if (app.globalData.userInfo) {
      var that = this
      this.setData({
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
  invitingFriends:function(){
    wx.navigateTo({
      url: '../InvitingFriends/InvitingFriends',
    })
  },
  // 注意事项查看更多
  moreView: function (e) {
    var that = this
    var des = that.data.carefulDes
    that.setData({
      jianShow: des,
      more: false
    })
  },
  // 注意事项收起
  takeUp:function(){
    var that=this
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