// pages/me/me.js
var agri = require("../../utils/agriknow.js")
var login = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    personAll: {},
    times: '',
    stayStatus: false,
    stayNum: '',
    imgs: {
      imgBg: 'http://112.74.169.46:8094/api/file/uploadfile/file/images/me/bg.png'
    },
    level: 1,
    levelWidth: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    login.login()
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    that.setData({
      id: id
    })
    // this.personalLoad()
    that.nowTimes()
    that.getCardList()

  },
  // 查询所有会员卡片
  getCardList: function() {
    let that = this
    let userData = wx.getStorageSync('userInfo')
    let id = userData.id
    app.agriknow.getMyhandyCard(id)
      .then(res => {
        let datas = res.data
        let dat = datas.slice(2)
        // that.setData({
        //   // handyCardList: dat,
        //   // hashList: true
        // })
      })
      .catch(res => {

      })
  },
  // 团操包月支付
  teamCard: function(e) {
    let that = this
    let names = '团操月卡'
    let money = '299.00'
    let pkCode = e.currentTarget.dataset.code
    wx.navigateTo({
      url: './teamCardPay/teamCardPay?names=' + names + '&money=' + money + '&pkCode=' + pkCode,
    })
  },
  coachCard: function(e) {
    let that = this
    let names = '私教月卡'
    let money = '1999.00'
    let pkCode = e.currentTarget.dataset.code
    wx.navigateTo({
      url: './teamCardPay/teamCardPay?names=' + names + '&money=' + money + '&pkCode=' + pkCode,
    })
  },
  // 待进行
  conduct: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
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
            stayStatus: true,
            stayNum: res.data.length
          })
        } else {
          that.setData({
            stayStatus: false
          })
        }

      })
      .catch(res => {
        console.log(res)
      })
  },
  // 当前时间
  nowTimes: function() {
    let that = this
    let newData = new Date()
    let y = newData.getFullYear()
    let month = newData.getMonth() + 1
    let d = newData.getDate()
    let h = newData.getHours()
    let m = newData.getMinutes()
    let s = newData.getSeconds()
    let times = that.data.times
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
    let nowTimes = y + '-' + month + '-' + d + ' ' + h + ':' + m + ':' + s
    that.setData({
      times: nowTimes
    })
  },
  // 二维码入场
  codeAdmission: function() {
    let that = this
    let times = that.data.times
    wx.navigateTo({
      url: './guardCode/guardCode?times=' + times,
    })
  },
  // 获取上课、私教次数
  personalLoad() {
    let that = this
    let loginData = wx.getStorageSync("userInfo")
    let id = loginData.id
    app.agriknow.getPersonalLoad(id)
      .then(res => {
        let courseNum = res.data.entranceCount
        if (res.data.entranceCount < 25) {
          let levelW = courseNum * 4
          that.setData({
            level: 1,
            levelWidth: levelW
          })
        }
        if (res.data.entranceCount > 25 && res.data.entranceCount <= 50) {
          let levelW = (courseNum - parseInt(25)) * 4
          that.setData({
            level: 2,
            levelWidth: levelW
          })
        }
        if (res.data.entranceCount > 50) {
          let levelW = (courseNum - parseInt(50)) * 4
          that.setData({
            level: 3,
            levelWidth: levelW
          })
        }
        that.setData({
          personAll: res.data
        })
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 储物柜
  lockers: function() {
    wx.navigateTo({
      url: './Lockers/Lockers',
    })
  },
  // 我的账单
  myBill: function() {
    wx.navigateTo({
      url: './myBill/myBill',
    })
  },
  // 支付密码
  payPpwd: function() {
    wx.navigateTo({
      url: './payPwd/payPwd',
    })
  },
  // 邀请好友
  fridens: function() {
    var loginData = wx.getStorageSync("userInfo")
    var memberId = loginData.id
    let userId = '0'
    wx.navigateTo({
      url: './InvitingFriends/InvitingFriends?memberId=' + memberId + '&userId=' + userId,
    })
  },
  // 汗滴卡
  myHandyCard: function() {
    wx.navigateTo({
      url: './myCardList/myCardList',
    })
  },
  // 充值卡
  rechargeCard: function() {
    var that = this
    var allMoney = that.data.personAll.memberBalanceMoney
    wx.navigateTo({
      url: './RechargeableCard/RechargeableCard?allMoney=' + allMoney,
    })
  },
  // 开通会员卡
  openMemberCard: function() {
    wx.navigateTo({
      url: './myCardList/myCardList',
    })
  },
  // 我的预约
  myTeamCourse: function() {
    wx.navigateTo({
      url: './myAppointment/myAppointment',
    })
  },
  // 我的预约状态待进行
  djxShow: function() {
    var status = 'djx'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 我的预约状态进行中
  jxzShow: function() {
    var status = 'jxz'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 我的预约状态已完成
  ywcShow: function() {
    var status = 'ywc'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 我的预约状态已取消
  yqxShow: function() {
    var status = 'yqx'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 查看二维码
  viewQRcode: function() {
    wx.navigateTo({
      url: './QRcode/QRcode',
    })
  },
  // 邀请汗友
  invitingFriends: function() {
    wx.navigateTo({
      url: './InvitingFriends/InvitingFriends',
    })
  },
  // 优惠券
  coupon: function() {
    wx.navigateTo({
      url: './myCoupon/myCoupon',
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
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    if (id != null || id != undefined) {
      that.personalLoad()
      that.conduct()
    }
    that.nowTimes()
    // that.personalLoad()


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