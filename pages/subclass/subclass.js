// pages/subclass/subclass.js
let app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    flag: false, //
    Minor: ['全部'], //小类的导标
    type: 'hot', //顶部的分类id
    gender: '', //性别
    start: 0,//5参数
    book_list:[],//书籍列表
    tolerant:[],
  },
  getMinor() { //拿到小分类
    app.globalData.fly.get('/cats/lv2').then(res => {
      let tolerant = res.data.male[this.options.index].mins;
      // console.log(this.options.index,111)
      this.setData({ //赋值
        tolerant,
      })
      
    }).catch(err => {
      console.log(err)
    })
  },
  getindex(e) { //一层栏目下标 
  let that = this;
    let type = e.currentTarget.dataset.item.id;
    // console.log(e)
    this.setData({//赋值
      type
    })
  },
  scrollData(e) { //横向滚动事件2
  // console.log(e);
    let minor = e.currentTarget.dataset.item;
    this.setData({
      minor: minor
    }) 
    // console.log(minor)
    let screenWidth = wx.getSystemInfoSync().windowWidth; //屏幕的宽度
    let itemWidth = screenWidth / 5; //每一项的宽度 =总宽/5  
    let {
      index,
      type
    } = e.currentTarget.dataset; //拿到每一个以及
    const {
      tolerant
    } = this.data; //得到总个数
    let scrollX = itemWidth * index - itemWidth * 2; //移动的宽度
    let maxScrollX = (tolerant.length + 1) * itemWidth; //最大宽度
    if (scrollX < 0) { //判断是否滚动
      scrollX = 0;
    } else if (scrollX >= maxScrollX) {
      scrollX = maxScrollX;
    }
    this.setData({
      x: scrollX
    })
    this.triggerEvent("scrollData", type); //点击了导航,通知父组件重新渲染列表数据
    //点击获取数据
    this.getCatsBooks_1()
  },
  //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
  getCatsBooks_1(gender, type, major, minor, start) {
    wx.showLoading({//加载动画
      title: '加载中...',
    })
    app.globalData.fly.get(`${"https://api.zhuishushenqi.com"}/book/by-categories?gender=${this.data.gender}&type=${this.data.type}&major=${this.data.major}&minor=${this.data.minor}&start=${this.data.start}&limit=20`).then(res => {
      let book_list = res.data.books;
      wx.hideLoading()//加载完成隐藏方法
      // console.log(book_list)
      this.setData({ //赋值
        book_list
      })
      // console.log(res)
      // this.getindex();
    }).catch(err => {
      console.log(err)
    })
  },
  tolerant(){
    wx.showLoading({//加载动画
      title: '加载中...',
    })

  },
  goDetails(e){//跳转详情页
    let _id = e.currentTarget.dataset.item._id;
    // this.setData({
    //   _id:_id
    // })
    // console.log(_id)
    wx.showLoading({//加载动画
      title: '加载中...',
    })
    wx.navigateTo({
      url: `/pages/details/details?_id=${_id}`,
    })
    wx.setNavigationBarTitle({
      title: '详情',
    })
    wx.hideLoading()
    // this.getcid()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let major = options.name; //大类4
    let gender = options.male; //性别5
    this.setData({
      major : major,
      gender : gender
    })
    this.getMinor()
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