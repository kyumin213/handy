// pages/course/courseDetails/courseDetails.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseY: false,
    courseJs: false,
    courseUse: true,
    currentTab: 1,
    courseReleasePkcode: '',
    detailsData: {},
    price: '',
    names: '',
    start: '',
    end: '',
    datas: '',
    conText: {},
    index: '',
    imgUrl: '',
    ends: true,
    storeCoach: {},
    items1Height: 0,
    items2Height: 0,
    items3Height: 0,
    slideAnimation: {},
    scrollTop: '',
    menuTop: 0,
    menuFixed: false,
    store: '',
    winHeight: '',
    coachType: false,
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var courseReleasePkcode = options.courseReleasePkcode
    var price = options.price
    var names = options.names
    var start = options.start
    var end = options.end
    var datas = options.datas
    var index = options.index
    var imgUrl = options.imgUrl
    var status = options.status
    var store = options.store
    let types = options.types
    let address = options.address

    if (status == 0) {
      that.setData({
        ends: true
      })
    } else if (status == 1) {
      that.setData({
        ends: false
      })
    }
    if (types == 'undefined') {
      that.setData({
        coachType: false
      })
    } else {
      that.setData({
        coachType: true
      })
    }
    that.setData({
      courseReleasePkcode: courseReleasePkcode,
      price: price,
      names: names,
      start: start,
      end: end,
      datas: datas,
      index: index,
      imgUrl: imgUrl,
      store: store,
      address: address
    })
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth
        var calc = clientHeight;
        that.setData({
          winWidth: res.windowWidth,
          winHeight: calc
        })
      }
    })
  },
  // tab切换
  switchNav: function(e) {
    var that = this
    var menuTop = that.data.menuTop
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Heightd
    that.setData({
      scrollTop: menuTop,
      currentTab: 1,
      // menuStatus: true
    });
  },
  // 课程介绍
  courseDes: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var menuTop = that.data.menuTop
    var item1 = that.data.items1Height
    // if (menuStatus === true) {
    that.setData({
      scrollTop: item1 + menuTop - 40,
      currentTab: 2
    })
  },
  // 课程使用
  userCourse: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item2 = that.data.items2Height
    var item1 = that.data.items1Height
    var item3 = that.data.items3Height
    var menuTop = that.data.menuTop
    that.setData({
      scrollTop: item1 + item2 + menuTop + 612,
      currentTab: 3
    })
  },
  // 教练详情
  coachDetails: function(e) {
    var coachId = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../../coachDetails/coachDetails?coachId=' + coachId,
    })
  },
  // 私教详情
  pricoachDetails: function(e) {
    let coachId = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../../privateCoachDetails/privateCoachDetails?coachId=' + coachId,
    })
  },
  // 课程详情信息
  getCourseDetail: function() {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var courseReleasePkcode = that.data.courseReleasePkcode
    app.agriknow.getCourseDetails(id, courseReleasePkcode)
      .then(res => {
        that.setData({
          detailsData: res.data.fitnessCourse,
          storeCoach: res.data.storeCoach
        })
        var dataType = res.data.fitnessCourse.fitnessCourseContext
        var con = null;
        if (typeof(dataType) == "object") {
          var con = dataType;
        } else {
          var con = JSON.parse(dataType.replace(/\n/g, "").replace(/\r/g, ""))
        }
        that.setData({
          conText: con
        })
        if (res.data.fitnessCourseContext) {
          var sssss = JSON.parse(res.data.data.fitnessCourseContext)
          console.log(sssss)
        }

        // }
      })
      .catch(res => {})
  },
  // 预订
  yue: function(e) {
    var that = this
    var pkcode = that.data.courseReleasePkcode
    var index = that.data.index
    var datas = that.data.datas
    var price = that.data.price
    var start = that.data.start
    var store = that.data.store
    var end = that.data.end
    let address = that.data.address
    var names = e.currentTarget.dataset.names
    console.log(names)
    wx.navigateTo({
      url: '../coursePayment/coursePayment?courseReleasePkcode=' + pkcode + '&index=' + index + '&currentData=' + datas + '&price=' + price + '&start=' + start + '&end=' + end + '&names=' + names + '&store=' + store + '&address=' + address,
    })
  },
  // 滚动实现tab切换
  scroll: function(e) {
    var that = this
    var tops = e.detail.scrollTop
    var menuTop = that.data.menuTop
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var item3 = that.data.items3Height
    if (tops >= menuTop) {
      that.setData({
        menuFixed: true
      })
    } else {
      that.setData({
        menuFixed: false
      })
    }
    if (tops <= menuTop) {
      this.setData({
        currentTab: 1
      })
    }
    if (tops > menuTop + item1 && tops <= menuTop + item1 + item2) {
      this.setData({
        currentTab: 2
      })
    }
    if (tops > item1 + item2 + 612) {
      this.setData({
        currentTab: 3
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
    var that = this
    that.getCourseDetail()
    const query = wx.createSelectorQuery()
    query.select('#item1').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      that.setData({
        items1Height: res[0].height
      })
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
    var query1 = wx.createSelectorQuery();
    //选择id
    query1.select('#item2').boundingClientRect()
    query1.selectViewport().scrollOffset()
    query1.exec(function(res) {
      // console.log(res[0].top)
      //取高度
      that.setData({
        items2Height: res[0].height
      })
    })
    var query2 = wx.createSelectorQuery();
    //选择id
    query2.select('#item3').boundingClientRect()
    query2.selectViewport().scrollOffset()
    query2.exec(function(res) {
      //取高度
      that.setData({
        items3Height: res[0].height,
      })
    })
    var query3 = wx.createSelectorQuery();
    //选择id
    query3.select('#headImg').boundingClientRect()
    query3.selectViewport().scrollOffset()
    query3.exec(function(res) {
      //取高度
      that.setData({
        // scrollTop: res[0].height,
        menuTop: res[0].height
      })
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