// pages/course/course.js
var agri = require("../../utils/agriknow.js")
var login = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: {},
    week: {},
    dataWeek: {},
    dates: {},
    storeCityList: {}, //门店所有城市
    storeList: {}, //城市所有门店
    storeActive: -1, //门店选中下标
    allActive: true, //默认全城选中
    id: '',
    checkStatus: false,
    hashList: false,
    check: 0,
    currentData: '',
    region: '',
    detailInfo: '',
    city: '',
    province: '城市/区域',
    maskDisplay: 'none', //遮罩层隐藏
    //侧边菜单的一些属性
    slideHeight: 0,
    slideRight: 0,
    slideWidth: 0,
    slideDisplay: 'block',
    screenHeight: 0,
    screenWidth: 0,
    slideAnimation: {},
    open: false,
    storeCityName: '深圳市', //城市
    storeNames: '全城门店', //门店
    hour: '',
    buyBtn: {},
    courseDay: '',
    nowDay: '',
    storePkcode: '',
    flags: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWeekData()
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var storeCity = that.data.storeCityName
    var id = loginData.id
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
          slideHeight: res.windowHeight,
          slideRight: res.windowWidth,
          slideWidth: res.windowWidth * 0.7
        });
      }
    })

    app.agriknow.getStoreListByCity(id, storeCity)
      .then(res => {
        // if (res.data.success = '200') {
        that.setData({
          storeList: res.data
        })
        // }
      }).catch(res => {
        console.log(res)
      })
    that.getAllCourse()
  },
  // 点击全城
  allCity: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var allDate = that.data.dataWeek
    var storeCity = that.data.storeCityName
    var index = that.data.check
    var day = allDate[index]
    var storeCoachId = ''
    var storeProvince = ''
    var storeDistrict = ''
    var storePkcode = ''
    that.setData({
      allActive: true,
      storeActive: -1,
      storeNames: '全城门店',
      storePkcode: storePkcode
    })
    app.agriknow.getCourseRelease(day, id, storeCoachId, storePkcode, storeCity, storeProvince, storeDistrict)
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
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  // 初始化全部课程
  getAllCourse: function() {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    var check = that.data.checkStatus
    var list = that.data.dates
    var allDate = that.data.dataWeek
    var storeCity = that.data.storeCityName
    var storeCoachId = ''
    var storeProvince = ''
    var storeDistrict = ''
    var storePkcode = ''
    var day = allDate[0]
    that.setData({
      currentData: day
    })

    app.agriknow.getCourseRelease(day, id, storeCoachId, storePkcode, storeCity, storeProvince, storeDistrict)
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
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  //点击选择城市按钮显示picker-view
  translate: function(e) {
    // model.animationEvents(this, 0, true, 400);
    var address = e.detail.value
    var reg = address.toString()
    var index = find(reg, ',', -1);
    var area = reg.substring(index)
    var region = area.replace(/,/g, '')
    this.setData({
      region: region
    })

  },
  filter: function(e) { //点击筛选事件
    var animation = wx.createAnimation({
      duration: 600
    });
    this.setData({
      maskDisplay: 'block'
    });
    animation.translateX('100%').step();
    this.setData({
      slideAnimation: animation.export()
    })
  },

  // 预约
  yue: function(e) {
    var that = this
    var pkcode = e.currentTarget.id
    var index = e.currentTarget.dataset.index
    var datas = that.data.currentData
    var store = e.currentTarget.dataset.store
    var start = e.currentTarget.dataset.start
    var end = e.currentTarget.dataset.end
    var store = e.currentTarget.dataset.store
    var price = e.currentTarget.dataset.price
    var names = e.currentTarget.dataset.names
    wx.navigateTo({
      url: './coursePayment/coursePayment?courseReleasePkcode=' + pkcode + '&index=' + index + '&currentData=' + datas + '&store=' + store + '&start=' + start + '&end=' + end + '&price=' + price + '&names=' + names,
    })
  },
  // 课程详情
  courseDetails: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var courseReleasePkcode = e.currentTarget.dataset.id
    var price = e.currentTarget.dataset.price
    var names = e.currentTarget.dataset.names
    // console.log(names)
    var start = e.currentTarget.dataset.start
    var imgUrl = e.currentTarget.dataset.url
    var end = e.currentTarget.dataset.end
    var status = e.currentTarget.dataset.status
    var datas = that.data.currentData
    var store = e.currentTarget.dataset.store
    wx.navigateTo({
      url: './courseDetails/courseDetails?courseReleasePkcode=' + courseReleasePkcode + '&price=' + price + '&names=' + names + '&start=' + start + '&end=' + end + '&datas=' + datas + '&index=' + index + '&imgUrl=' + imgUrl + '&status=' + status + '&store=' + store,
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
  // 选择日期
  checkData: function(e) {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var now = new Date()
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours()
    var minu = now.getMinutes()
    var sec = now.getSeconds()
    if (date < 10) {
      date = '0' + date
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minu < 10) {
      minu = '0' + minu
    }
    var check = that.data.checkStatus
    var storePkcode = that.data.storePkcode
    var storeCity = that.data.storeCityName
    var storeCoachId = ''
    var storeProvince = ''
    var storeDistrict = ''
    var list = that.data.dates
    var allDate = that.data.dataWeek
    var index = e.currentTarget.dataset.index
    var day = allDate[index]
    that.setData({
      check: index,
      currentData: day
    })
    app.agriknow.getCourseRelease(day, id, storeCoachId, storePkcode, storeCity, storeProvince, storeDistrict)
      .then(res => {
        var thisDayDate = new Date()
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
          if (res.data[i].courseReleaseFlag){
            var flag = res.data[i].courseReleaseFlag
            var flagJson = flag.split(",")
            res.data[i].flag = flagJson

          }else{
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
  // 查询门店所有城市
  getStoreCitys: function() {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    app.agriknow.getStoreCity(id)
      .then(res => {
        if (res.data.success = '200') {
          that.setData({
            storeCityList: res.data
          })
        }
      }).catch(res => {
        console.log(res)
      })
  },
  // 查询城市所有门店
  getByCityStore: function(e) {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var storeCity = e.currentTarget.dataset.name
    that.setData({
      storeCityName: storeCity
    })
    app.agriknow.getStoreListByCity(id, storeCity)
      .then(res => {
        if (res.data.success = '200') {
          that.setData({
            storeList: res.data
          })
        }
      }).catch(res => {
        console.log(res)
      })
  },
  // 选择门店
  selectStore: function(e) {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var day = that.data.currentData
    var storeCoachId = ''
    var storeProvince = ''
    var storeDistrict = ''
    var storeCity = that.data.storeCityName
    var index = e.currentTarget.dataset.index
    var names = e.currentTarget.dataset.name
    var storePkcode = e.currentTarget.dataset.code
    var active = that.data.storeActive
    that.setData({
      storeActive: index,
      allActive: false,
      storeNames: names,
      storePkcode: storePkcode
    })
    that.hiddenModel()
    app.agriknow.getCourseRelease(day, id, storeCoachId, storePkcode, storeCity, storeProvince, storeDistrict)
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
      }).catch(res => {
        console.log(res)
      })
  },
  // 获取门店位置信息
  getStoreAddress: function() {
    this.getStoreCitys()
    var that = this
    var opens = that.data.open
    if (opens) {
      that.setData({
        open: false
      })
    } else {
      that.setData({
        open: true
      })
    }
  },
  // 隐藏左侧菜单
  hiddenModel: function() {
    this.setData({
      open: false
    })
  },
  // 搜索门店课程信息
  searchStoreCourse: function() {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var storePkcode = that.data.storePkcode
    var storeCity = that.data.storeCityName
    console.log(storeCity)
    var day = that.data.currentData
    var storeCoachId = ''
    var storeProvince = ''
    var storeDistrict = ''
    app.agriknow.getCourseRelease(day, id, storeCoachId, storePkcode, storeCity, storeProvince, storeDistrict)
      .then(res => {
        if (res.data.success = '200') {
          if (res.data.length > 0) {
            that.setData({
              hashList: true
            })
          } else {
            that.setData({
              hashList: false
            })
          }
          that.setData({
            courseList: res.data
          })
        }
      }).catch(res => {
        console.log(res)
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
  onShow: function(e) {
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

function find(str, cha, num) {
  var x = str.indexOf(cha);
  for (var i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
}

function slideUp() {
  var animation = wx.createAnimation({
    duration: 600
  });
  this.setData({
    maskDisplay: 'block'
  });
  animation.translateX('100%').step();
  this.setData({
    slideAnimation: animation.export()
  });
}
//侧栏关闭
function slideDown() {
  var animation = wx.createAnimation({
    duration: 800
  });
  animation.translateX('-100%').step();
  this.setData({
    slideAnimation: animation.export()
  });
  this.setData({
    maskDisplay: 'none'
  });
}