// pages/coachDetails/coachDetails.js
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
    more: true,
    more2: false,
    jian: "",
    goodDes: "",
    dayTimes: false,
    check: 0,
    appentCheck: false,
    storeCoachId: '',
    coachData: {},
    courseList: {},
    hashList: false,
    currentData: '',
    conText: {},
    winWidth: '',
    coachType: 0,
    items1Height: 0,
    items2Height: 0,
    items3Height: 0,
    items4Height: 0,
    menuTop: 0,
    menuScrollTop: 0,
    menuFixed: false,
    flags: {},
    hashZS: false,
    toView: 'items1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var coachId = options.coachId
    that.getWeekData()
    var des = that.data.coachDes
    var coachType = options.coachType
    if (coachType != undefined) {
      that.setData({
        coachType: coachType
      })
    }
    if (coachId != undefined) {
      that.setData({
        storeCoachId: coachId
      })
    }

    // if (goodDes.length >= 100 || goodDes.length == good.length) {
    //   that.setData({
    //     goodDes: goodDes,
    //     more2: true
    //   })
    // } else {
    //   that.setData({
    //     goodAt: good,
    //     more2: false
    //   })
    // }
    that.coachDetails()
    that.courseDefaultTime()
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth
        // rpxR = 750 / clientWidth
        var calc = clientHeight;
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
    console.log(e.detail.current)
  },
  // 点击切换教练简介
  coachjj: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var menuTop = that.data.menuTop
    // if (menuStatus) {
    that.setData({
      menuScrollTop: 242,
      currentTab: 1
    });
    // } else {
    //   that.setData({
    //     menuScrollTop: menuTop - 10,
    //     currentTab: 1
    //   });
    // }
  },
  // 点击切换擅长课程
  goodsCourse: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Height
    var menuTop = that.data.menuTop
    that.setData({
      toView: 'items2',
      currentTab: 2,
      menuFixed: true
    })
    if (menuStatus) {
      that.setData({
        menuScrollTop: item1 + menuTop - 10,
        currentTab: 2
      })
    } else {
      that.setData({
        menuScrollTop: item1 + menuTop - 10,
        currentTab: 2
      })
    }
  },
  // 点击切换认证证书
  renz: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var menuTop = that.data.menuTop
    if (menuStatus) {
      that.setData({
        menuScrollTop: item2 + item1 + menuTop + 400,
        currentTab: 3
      });
    } else {
      that.setData({
        menuScrollTop: item1 + item2 + menuTop + 400,
        currentTab: 3
      })
    }
  },
  // 点击切换近期排课
  ReleaseCourse: function(e) {
    var that = this
    var menuStatus = that.data.menuFixed
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var item3 = that.data.items3Height
    var menuTop = that.data.menuTop
    if (menuStatus) {
      that.setData({
        menuScrollTop: item3 + item1 + item2 + menuTop + 612,
        currentTab: 4
      })
    } else {
      that.setData({
        menuScrollTop: item3 + item1 + item2 + menuTop + 612,
        currentTab: 4
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
        let good = res.data.storeCoachSynopsis
        // var coachDes = des.slice(0, 100)
        // let coachDes = good.slice(0, 100)
        // if (coachDes.length >= 100) {
        //   that.setData({
        //     jian: coachDes,
        //     more: true
        //   })
        // } else {
        //   that.setData({
        //     jian: good,
        //     more: false
        //   })
        // }
        that.setData({
          coachData: res.data
        })
        var dataType = res.data.storeCoachIntroduce
        var con = null;
        if (typeof(dataType) == "object") {
          con = dataType;
          if (con.certificateList.length > 0) {
            that.setData({
              hashZS: true
            })
          }
        } else {
          con = JSON.parse(dataType.replace(/\n/g, "").replace(/\r/g, ""))
          if (con.certificateList.length > 0) {
            that.setData({
              hashZS: true
            })
          }
        }
        that.setData({
          conText: con
        })

      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  // 近期排课默认日期
  courseDefaultTime: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var list = that.data.dates
    var allDate = that.data.dataWeek
    // var index = e.currentTarget.dataset.index
    var day = allDate[0]
    var storeCoachId = that.data.storeCoachId
    // that.setData({
    //   // check: index,
    //   currentData: allDate
    // })
    app.agriknow.getCourseRelease(day, id, storeCoachId)
      .then(res => {
        var thisDayDate = new Date();
        for (var i = 0; i < res.data.length; i++) {
          var nowHouse = res.data[i].coursePlanBegtime
          var endtime = res.data[i].coursePlanEndtime;
          var a1 = day + ""
          var a2 = endtime + ""
          var datatime = new Date(a1 + " " + a2)
          if (thisDayDate.getTime() > datatime.getTime()) {
            res.data[i].isbook = 0
          } else {
            res.data[i].isbook = 1
          }
          if (res.data[i].courseReleaseFlag) {
            var flag = res.data[i].courseReleaseFlag
            var flagJson = flag.split(",")
            res.data[i].flag = flagJson
          } else {
            res.data[i].courseReleaseFlag = false
          }
        }
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
  // 近期排课
  courseTime: function(e) {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var check = that.data.checkStatus
    var list = that.data.dates
    var allDate = that.data.dataWeek
    var index = e.currentTarget.dataset.index
    var day = allDate[index]
    var storeCoachId = that.data.storeCoachId
    that.setData({
      check: index,
      currentData: day
    })
    app.agriknow.getCourseRelease(day, id, storeCoachId)
      .then(res => {
        var thisDayDate = new Date();
        for (var i = 0; i < res.data.length; i++) {
          var nowHouse = res.data[i].coursePlanBegtime
          var endtime = res.data[i].coursePlanEndtime;
          var a1 = day + ""
          var a2 = endtime + ""
          var datatime = new Date(a1 + " " + a2)
          if (thisDayDate.getTime() > datatime.getTime()) {
            res.data[i].isbook = 0
          } else {
            res.data[i].isbook = 1
          }
          if (res.data[i].courseReleaseFlag) {
            var flag = res.data[i].courseReleaseFlag
            var flagJson = flag.split(",")
            res.data[i].flag = flagJson
          } else {
            res.data[i].courseReleaseFlag = false
          }
        }
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
  // 课程详情
  courseDetails: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var courseReleasePkcode = e.currentTarget.dataset.id
    var price = e.currentTarget.dataset.price
    var names = e.currentTarget.dataset.names
    var start = e.currentTarget.dataset.start
    var imgUrl = e.currentTarget.dataset.url
    var store = e.currentTarget.dataset.store
    var end = e.currentTarget.dataset.end
    var status = e.currentTarget.dataset.status
    var address = e.currentTarget.dataset.address
    var datas = that.data.currentData
    wx.navigateTo({
      url: '../course/courseDetails/courseDetails?courseReleasePkcode=' + courseReleasePkcode + '&price=' + price + '&names=' + names + '&start=' + start + '&end=' + end + '&datas=' + datas + '&index=' + index + '&imgUrl=' + imgUrl + '&status=' + status + '&store=' + store + '&address=' + address,
    })
  },
  // 预约
  yue: function(e) {
    var that = this
    var pkcode = e.currentTarget.id
    var index = e.currentTarget.dataset.index
    var price = e.currentTarget.dataset.price
    var start = e.currentTarget.dataset.start
    var store = e.currentTarget.dataset.store
    var end = e.currentTarget.dataset.end
    var names = e.currentTarget.dataset.names
    var datas = that.data.currentData
    var storeCoachId = that.data.storeCoachId
    var address = e.currentTarget.dataset.address
    wx.navigateTo({
      url: '../course/comfirPayment/comfirPayment?courseReleasePkcode=' + pkcode + '&index=' + index + '&currentData=' + datas + '&storeCoachId=' + storeCoachId + '&price=' + price + '&start=' + start + '&end=' + end + '&names=' + names + '&store=' + store + '&address=' + address,
    })
  },
  // 最近一周
  getWeekData: function() {
    var that = this
    var dataWeek = []
    var week = []
    var dates = []
    var now = new Date();
    var nowTime = now.getTime();
    var oneDayTime = 24 * 60 * 60 * 1000;
    for (var i = 0; i < 7; i++) { //显示周一		   
      var ShowTime = nowTime + (i) * oneDayTime;
      // var ShowTime = nowTime + (i+1) * oneDayTime;
      //初始化日期时间		
      var myDate = new Date(ShowTime);
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var date = myDate.getDate();
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      var getDatas = year + "-" + month + "-" + date
      // var dates = date
      dataWeek.push(getDatas)
      dates.push(date)
      var str = "日一二三四五六".charAt(myDate.getDay());
      week.push(str)
      // console.log(str)
    }
    that.setData({
      week: week,
      dataWeek: dataWeek,
      dates: dates
    })
    // console.log(dataWeek)
    // console.log(week)
    // console.log(dates)
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
    // console.log(e.detail)
    var that = this
    var tops = e.detail.scrollTop
    var menuTop = that.data.menuTop
    if (tops >= 242) {
      that.setData({
        menuFixed: true
      })
    } else {
      that.setData({
        menuFixed: false
      })
    }
    var item1 = that.data.items1Height
    var item2 = that.data.items2Height
    var item3 = that.data.items3Height
    var item4 = that.data.items4Height
    if (tops <= menuTop + 5) {
      this.setData({
        currentTab: 1
      })
    }
    if (tops > item1 + menuTop && tops <= menuTop + item1 + item2) {
      this.setData({
        currentTab: 2
      })
    }
    // if (tops >= item1 + item2 + menuTop + 200 && tops < item1 + item2 + item3 + menuTop + 100) {
    //   this.setData({
    //     currentTab: 3
    //   })
    // }
    // if (tops > item1 + item2 + item3 + menuTop + 600) {
    //   this.setData({
    //     currentTab: 4
    //   })
    // }
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
    let item3 = that.data.hashZS
    const query = wx.createSelectorQuery()
    query.select('#items1').boundingClientRect()
    // query.selectViewport().scrollOffset()
    query.exec(function(res) {
      that.setData({
        items1Height: res[0].height
      })
    })
    // const query1 = wx.createSelectorQuery();
    // //选择id
    // query1.select('#items2').boundingClientRect()
    // query1.selectViewport().scrollOffset()
    // query1.exec(function(res) {
    //   wx.pageScrollTo({
    //     scrollTop: 0
    //   })

    //   //取高度
    //   that.setData({
    //     items2Height: res[0].height
    //   })
    // })
    // if (item3) {
    //   var query2 = wx.createSelectorQuery();
    //   //选择id
    //   query2.select('#items3').boundingClientRect()
    //   query2.selectViewport().scrollOffset()
    //   query2.exec(function(res) {
    //     //取高度
    //     that.setData({
    //       items3Height: res[0].height
    //     })
    //   })
    // } else {
    //   that.setData({
    //     items3Height: 0
    //   })
    // }
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
      //取高度
      that.setData({
        menuTop: res[0].height
      })
    })
  },
  // onPageScroll: function(e) {
  //   // var scrollTop = e.scrollTop
  //   var that = this
  //   console.log(e.scrollTop)
  // },


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