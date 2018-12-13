// pages/course/useCoupon/useCoupon.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useCoupons: true,
    unUse: false,
    select: false,
    usecouponList: {},
    winHeight: '',
    currentTab: 0,
    hashList: true,
    uncouponList: {},
    unList: false,
    useList: false,
    code: '',
    price: '',
    money: '',
    useCoupon: false,
    checkCoupon: false,
    checkUse: false,
    couShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let price = options.price
    let checkCoupon = options.checkCoupon
    let couponIndex = options.couponIndex
    console.log(couponIndex)
    that.setData({
      price: price,
      checkCoupon: checkCoupon,
      check: couponIndex
    })
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
    that.getCouponList()
  },
  // 选择可用
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
    that.getCouponList()
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  // 选择优惠券
  selectCard: function(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let code = e.currentTarget.dataset.code
    let money = e.currentTarget.dataset.money
    let check = that.data.check
    if (check != index) {
      that.setData({
        check: index,
        code: code,
        money: money,
        checkCoupon: true
      })
    } else {
      that.setData({
        check: null,
        checkCoupon: false
      })
    }
  },
  // 查询优惠券
  getCouponList: function() {
    let that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    let price = that.data.price
    let currentTab = that.data.currentTab
    let list = that.data.usecouponList
    app.agriknow.getCoupon(id)
      .then(res => {
        let datas = res.data
        var _usecouponList = []
        var _uncouponList = []
        var _use_i = 0,_un_i=0;
        for (var i = 0; i < datas.length; i++) {
          var ss = datas[i].begtime
          var endtime = datas[i].endtime
          var lastStr = ss.substring(0, 10)
          var lastEnd = endtime.substring(0, 10)
          datas[i].begin = lastStr
          datas[i].end = lastEnd
          let status = datas[i].useStatus
          let moneys = datas[i].couponWorthMoney
          let types = datas[i].couponType
          let row = datas[i]
          if (currentTab == 0 && (
            types == 2 || (types == 1 && (price - moneys) > 0)
            )
          ) {
            _usecouponList[_use_i] = row
            _usecouponList[_use_i].couShow = true;
            _use_i++;
          }
          if (currentTab == 1 && 
            (
              status == 1 || 
              (status == 0 && (price - moneys) < 0 && types == 1)
            )
          ){
            _uncouponList[_un_i] = row
            _uncouponList[_un_i].couShow = true;
            _un_i++;
          }
        }

        that.setData({
          usecouponList: _usecouponList,
          uncouponList: _uncouponList,
        })
        if (_usecouponList.length>0){
          that.setData({
            useList:true
          })
        } if (_uncouponList.length>0){
          that.setData({
            unList:true
          })
        }

      })
      .catch(res => {

      })
  },
  // 确认返回
  userBack: function(e) {
    let that = this
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    let code = that.data.code
    let price = that.data.price
    let money = that.data.money
    let check = that.data.check
    let checkCoupon = that.data.checkCoupon
    let usecouponList = that.data.usecouponList
    console.log('chec' + checkCoupon)
    let totalPrice = price - money
    if (money == '9999' && checkCoupon) {
      prevPage.setData({
        discountPkcode: code,
        useCoupon: true,
        couponNum: price,
        totalPrice: '0.00',
        checkCoupon: check,
        coupons: true,
        couponIndex: check
      })
    }
    if (money != '9999' && checkCoupon) {
      prevPage.setData({
        discountPkcode: code,
        useCoupon: false,
        couponNum: money,
        totalPrice: totalPrice,
        checkCoupon: checkCoupon,
        coupons: true,
        couponIndex: check
      })
    } else if (!checkCoupon) {
      prevPage.setData({
        useCoupon: false,
        checkCoupon: checkCoupon,
        coupons: false,
        couponIndex: null,
        couponNum: usecouponList.length
      })
    }

    wx.navigateBack({
      delta: 1 // 返回上一级页面。
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