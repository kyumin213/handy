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
    ends: false,
    storeCoach: {},
    items1Height: 0,
    items2Height: 0,
    items3Height: 0,
    slideAnimation: {},
    scrollTop: '',
    menuTop: 0,
    menuFixed: false,
    store: ''

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
    if (status == 0) {
      that.setData({
        ends: true
      })
    } else if (status == 1) {
      that.setData({
        ends: false
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
      store: store
    })

  },
  // tab切换
  switchNav: function(e) {
    // var that = this
    // if (that.data.currentTab === e.currentTarget.dataset.current) {
    //   return false;
    // } else {
    //   that.setData({
    //     currentTab: e.currentTarget.dataset.current
    //   })
    // }
    var that = this
    var menuTop = that.data.menuTop
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Heightd
    if (menuStatus === true) {
      that.setData({
        scrollTop: menuTop - 80,
        currentTab: 1
      });
    } else {
      that.setData({
        scrollTop: menuTop - 80,
        currentTab: 1
      });
    }
  },
  // 课程介绍
  courseDes: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var menuTop = that.data.menuTop
    var item1 = that.data.items1Height
    // if (menuStatus === true) {
    that.setData({
      scrollTop: item1 + menuTop - 100,
      currentTab: 2
    })
    // } 
    // else {
    //   that.setData({
    //     scrollTop: item1 + menuTop - 50,
    //     currentTab: 2
    //   });
    // }

  },
  // 课程使用
  userCourse: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item2 = that.data.items2Height
    var item1 = that.data.items1Height
    var item3 = that.data.items3Height
    var menuTop = that.data.menuTop
    if (menuStatus) {
      that.setData({
        scrollTop: item1 + item2 + menuTop + 612,
        currentTab: 3
      })
    } else {
      that.setData({
        scrollTop: item2 + item1 + item3 + menuTop + 612,
        currentTab: 3
      });
    }

  },
  // 教练详情
  coachDetails: function(e) {
    var coachId = e.currentTarget.dataset.code
    wx.navigateTo({
      url: '../../coachDetails/coachDetails?coachId=' + coachId,
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
        // console.log(res.data.storeCoach)
        that.setData({
          detailsData: res.data.fitnessCourse,
          storeCoach: res.data.storeCoach
        })
        var dataType = res.data.fitnessCourse.fitnessCourseContext
        var con = null;
        if (typeof(dataType) == "object") {
          var con = dataType;
          // console.log(con)
        } else {
          var con = JSON.parse(dataType.replace(/\n/g, "").replace(/\r/g, ""))
        }
        // console.log(con)
        that.setData({
          conText: con
        })
        // var con = JSON.parse(res.data.fitnessCourseContext)
        // that.setData({
        //   conText: con
        // })
        // if (res.data.success = '200') {
        if (res.data.fitnessCourseContext) {
          var sssss = JSON.parse(res.data.data.fitnessCourseContext)
          console.log(sssss)
        }

        // }
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
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
    var names = e.currentTarget.dataset.names
    console.log(names)
    wx.navigateTo({
      url: '../coursePayment/coursePayment?courseReleasePkcode=' + pkcode + '&index=' + index + '&currentData=' + datas + '&price=' + price + '&start=' + start + '&end=' + end + '&names=' + names + '&store=' + store,
    })
  },
  // 滚动实现tab切换
  scroll: function(e) {
    var that = this
    // console.log(e)
    var tops = e.detail.scrollTop
    // console.log(tops)
    var menuTop = that.data.menuTop
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var item3 = that.data.items3Height
    // console.log(item1)
    if (tops > 180) {
      that.setData({
        menuFixed: true
      })
    } else {
      that.setData({
        menuFixed: false
      })
    }
    // console.log(tops)
    if (tops <= menuTop - 40) {
      this.setData({
        currentTab: 1
      })
    }
    if (tops > menuTop - 30 && tops <= item1 + item2 + 612) {
      this.setData({
        currentTab: 2
      })
    }
    if (tops > item1 + item2 + 612) {
      this.setData({
        currentTab: 3
      })
    }
    // const query = wx.createSelectorQuery()
    // query.select('#items').boundingClientRect((rect) => {
    //   // console.log(rect)
    // }).exec()
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
      console.log(res)
      console.log(res[0].height)
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
      // console.log(res)
      wx.pageScrollTo({
        scrollTop: res[0].height,
        duration: 1500
      })
      // console.log(res[0].height)
      //取高度
      that.setData({
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