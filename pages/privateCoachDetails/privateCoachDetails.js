// pages/privateCoachDetails/privateCoachDetails.js
var agri = require("../../utils/agriknow.js")
var login = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: {},
    dataWeek: {},
    dates: {},
    id: '',
    checkStatus: false,
    winWidth: 0,
    winHeight: 0,
    currentTab: 1,
    scrollHeight: 0,
    more: false,
    more2: false,
    jian: "",
    goodDes: "",
    dayTimes: false,
    appentCheck: false,
    storeCoachId: '',
    coachData: {},
    courseList: {},
    hashList: false,
    currentData: '',
    conText: {},
    winWidth: '',
    winHeight: '',
    coachType: 0,
    items1Height: 0,
    items2Height: 0,
    items3Height: 0,
    items4Height: 0,
    menuTop: 0,
    menuScrollTop: 0,
    menuFixed: false,
    flags: {},
    select: null,
    totalMoney: '',
    courseHour: '',
    modelShow: false,
    animationData: '',
    mobile: null,
    memberId: null,
    pkcode: null,
    fitnessCourseName: null,
    courseIndex: null,
    hourIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var coachId = options.coachId
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var mobile = loginData.mobile
    var des = that.data.coachDes
    var coachType = options.coachType
    if (coachType != undefined) {
      that.setData({
        coachType: coachType
      })
    }
    // var good = that.data.coachData.storeCoachSynopsis
    that.setData({
      storeCoachId: coachId,
      memberId: id,
      mobile: mobile
    })
    that.courseDefaultTime()
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winWidth: res.windowWidth,
          winHeight: calc
        })
      }
    })
  },
  bindChange: function(e) {
    this.setData({
      currentTab: e.detail.current
    })
  },

  // 点击选择私教课程课时
  selectCourseHouse: function(e) {
    let that = this
    // let index = e.currentTarget.dataset.list_index
    let listindex = e.currentTarget.dataset.listindex
    let priceindex = e.currentTarget.dataset.priceindex
    that.setData({
      courseIndex: listindex,
      hourIndex: priceindex
    })
    let cl = that.data.courseList

    // for (var i = 0; i < cl[listindex].courseReleasePriceLevel.length; i++) {
    //   cl[listindex].courseReleasePriceLevel[i].select = false
    // }

    // cl[listindex].courseReleasePriceLevel[priceindex].select = true
    // let check = cl[listindex].courseReleasePriceLevel[priceindex].check
    var total = cl[listindex].courseReleasePriceLevel[priceindex].totalPrice
    var courseTotal = cl[listindex].courseReleasePriceLevel[priceindex].courseTotal
    var pkcode = cl[listindex].courseReleasePkcode
    var courseName = cl[listindex].fitnessCourseName
    var coachName = cl[listindex].storeCoachName
    that.setData({
      courseList: cl,
      totalMoney: total,
      courseHour: courseTotal,
      pkcode: pkcode,
      fitnessCourseName: courseName,
      coachName: coachName,
      modelShow: true
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear"
    })
    that.animation = animation
    animation.translateY(500).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 20)

  },
  // 隐藏弹窗
  hideModal: function() {
    var that = this;
    // that.setData({
    //   modelShow: false
    // })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear"
    })
    that.animation = animation
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function() {
      animation.translateY(500).step()
      that.setData({
        animationData: animation.export()
      })
    }, 20)
    that.setData({
      modelShow: false
    })
  },
  // 取消支付
  cancelBuy: function() {
    var that = this
    var modelShow = that.data.modelShow
    that.setData({
      modelShow: false
    })
  },
  // 确认支付
  submitBuy: function() {
    let that = this
    let coachName = that.data.coachData.storeCoachName
    let hour = that.data.courseHour
    let courseName = that.data.fitnessCourseName
    let tm = that.data.totalMoney
    let id = that.data.memberId
    let mobile = that.data.mobile
    let courseReleasePkcode = that.data.pkcode
    let storeCoachId = that.data.storeCoachId
    let payType = 1
    let courseType = 2
    let discountPkid = null
    let level = that.data.hourIndex
    wx.navigateTo({
      url: './privateCoursePayment/privateCoursePayment?courseName=' + courseName + '&hour=' + hour + '&tm=' + tm + '&coachName=' + coachName + '&level=' + level + '&courseReleasePkcode=' + courseReleasePkcode,
    })
   

  },
  // 点击切换教练简介
  coachjj: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var menuTop = that.data.menuTop
    if (menuStatus) {
      that.setData({
        menuScrollTop: menuTop - 30,
        currentTab: 1
      });
    } else {
      that.setData({
        menuScrollTop: menuTop - 10,
        currentTab: 1
      });
    }
  },
  // 点击切换擅长课程
  goodsCourse: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var menuTop = that.data.menuTop
    if (menuStatus) {
      that.setData({
        menuScrollTop: item1 + item2 + menuTop + 400,
        currentTab: 3
      });
    } else {
      that.setData({
        menuScrollTop: item1 + item2 + menuTop + 400,
        currentTab: 3
      })
    }
  },
  // 点击切换认证证书
  renz: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var item3 = that.data.items3Height
    var menuTop = that.data.menuTop
    if (menuStatus) {
      that.setData({
        menuScrollTop: item2 + item1 + item3 + menuTop + 500,
        currentTab: 4
      });
    } else {
      that.setData({
        menuScrollTop: item1 + item2 + item3 + +menuTop + 500,
        currentTab: 4
      })
    }
  },
  // 点击切换私教课程
  ReleaseCourse: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Height
    var item3 = that.data.items3Height
    var menuTop = that.data.menuTop
    if (menuStatus) {
      that.setData({
        menuScrollTop: item1 + menuTop + 10,
        currentTab: 2
      })
    } else {
      that.setData({
        menuScrollTop: item1 + menuTop + 10,
        currentTab: 2
      })
    }
  },
  // 教练详情
  coachDetails: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var storeCoachId = that.data.storeCoachId
    app.agriknow.getCoachDetails(id, storeCoachId)
      .then(res => {
        that.setData({
          coachData: res.data
        })

        var dataType = res.data.storeCoachIntroduce
        var con = null;
        if (typeof(dataType) == "object") {
          con = dataType;
        } else {
          con = JSON.parse(dataType.replace(/\n/g, "").replace(/\r/g, ""))
        }
        that.setData({
          conText: con
        })
        var good = res.data.storeCoachSynopsis
        var coachDes = good.slice(0, 100)
        if (coachDes.length >= 100) {
          that.setData({
            jian: coachDes,
            more: true
          })
        } else {
          that.setData({
            jian: good,
            more: false
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
  // 私教课程
  courseDefaultTime: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var list = that.data.dates
    var allDate = that.data.dataWeek
    // var index = e.currentTarget.dataset.index
    var day = allDate[0]
    var storeCoachPkid = that.data.storeCoachId
    // that.setData({
    //   // check: index,
    //   currentData: allDate
    // })
    app.agriknow.getPrivateCourse(id, storeCoachPkid)
      .then(res => {
        if (res.data.length > 0) {
          that.setData({
            hashList: true,
            courseList: res.data
          })
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

  /**
   * 教练简介查看更多
   */
  moreView: function(e) {
    var that = this
    var des = that.data.coachData.storeCoachSynopsis
    that.setData({
      jian: des,
      more: false
    })
  },
  /**
   * 擅长课程查看更多
   */
  moreGood: function() {
    var that = this
    var des = that.data.goodAt
    that.setData({
      goodAt: des,
      more2: false
    })
  },

  /**
   * tab切换
   */
  switchNav: function(e) {
    var that = this
    if (that.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
    // this.courseDefaultTime()
  },

  /**
   * 选择教练排课日期
   */
  chooes: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    if (that.data.dayData[index].state == 1) {
      that.data.dayData[index].state = 0;

    } else if (that.data.dayData[index].state == 0) {
      that.data.dayData[index].state = 1;

    }
  },
  /**
   * 点击预约
   */
  appointMent: function() {
    var that = this
    wx.showModal({
      title: '温馨提示',
      content: '是否确定预约该课程？',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            appentCheck: true
          })
        } else if (res.cancel) {
          that.setData({
            appentCheck: false
          })
        }
      }
    })
  },
  // 距离顶部距离
  scroll: function(e) {
    var that = this
    var tops = e.detail.scrollTop
    var menuTop = that.data.menuTop
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var item3 = that.data.items3Height
    var item4 = that.data.items4Height
    if (tops > 180) {
      that.setData({
        menuFixed: true
      })
    } else {
      that.setData({
        menuFixed: false
      })
    }
    if (tops < menuTop + 40) {
      this.setData({
        currentTab: 1
      })
    }
    if (tops > item1 + menuTop - 70 && tops <= menuTop + item1 + item2) {
      this.setData({
        currentTab: 2
      })
    }
    if (tops >= item1 + item2 + menuTop + 50 && tops <= item1 + item2 + item3 + menuTop + 100) {
      this.setData({
        currentTab: 3
      })
    }
    if (tops > item1 + item2 + item3 + menuTop + 500) {
      this.setData({
        currentTab: 4
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
  onShow: function(e) {
    var that = this
    this.coachDetails()
    const query = wx.createSelectorQuery()
    query.select('#items1').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      that.setData({
        items1Height: res[0].height
      })
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
    var query1 = wx.createSelectorQuery();
    //选择id
    query1.select('#items2').boundingClientRect()
    query1.selectViewport().scrollOffset()
    query1.exec(function(res) {
      //取高度
      that.setData({
        items2Height: res[0].height
      })
    })
    var query2 = wx.createSelectorQuery();
    //选择id
    query2.select('#items3').boundingClientRect()
    query2.selectViewport().scrollOffset()
    query2.exec(function(res) {
      //取高度
      that.setData({
        items3Height: res[0].height
      })
    })
    var query3 = wx.createSelectorQuery();
    //选择id
    query3.select('#items4').boundingClientRect()
    query3.selectViewport().scrollOffset()
    query3.exec(function(res) {
      if (res[0] != null) {
        //取高度
        that.setData({
          items4Height: res[0].height
        })
      }
    })
    var query4 = wx.createSelectorQuery();
    //选择id
    query4.select('#headImg').boundingClientRect()
    query4.selectViewport().scrollOffset()
    query4.exec(function(res) {
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
  onPageScroll: function(e) {
    // var scrollTop = e.scrollTop
    var that = this
    console.log(e.scrollTop)
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