const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:'',
    book_Data:{},//书籍数据
    count:0,
    evaluate:[],//评价的数组
    // author:{},//评论读者对象
    catalog:[],//目录总数组
    flag:false,
  },
  bookInfo(_id){
    app.globalData.fly.get(`/book/${this.data._id}`).then(res=>{
      let book_Data = res.data
      this.setData({
        book_Data: book_Data
      })
      console.log(book_Data)
    }).catch(err=>{
      console.log(err)
    })
  },
  // 相关推荐
  // relatedRecommendedBooks: function (book_id) { // @param book_id 书籍id
  //   return `${API_HOST}/book/${book_id}/recommend`
  // },
  more(){//刷新
    app.globalData.fly.get(`${'https://api.zhuishushenqi.com'}/book/${this.data._id}/recommend`).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  joinbook(){//加入书架
  //  this.setData({
  //    count:2
  //  })
  },
  getDetails(){//书籍简介
    this.setData({
      count:1
    })
  },
  getEstimate(){//评价详情
    this.setData({
      count: 2
    })
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get(`${'https://api.zhuishushenqi.com'}/post/short-review?book=${this.data._id}&total=true&sortType=newest`).then(res=>{
      wx.hideLoading()
      let evaluate = res.data.docs;
      this.setData({
        evaluate
      })
      console.log(evaluate)
    }).catch(err=>{
      console.log(err)
    })
  },
  allCatalog(){//总目录
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      flag:!flag
    })
    app.globalData.fly.get(`${'https://api.zhuishushenqi.com'}/mix-atoc/${this.data._id}?view=chapters`).then(res => {
      wx.hideLoading()
      let catalog = res.data.mixToc.chapters;
      this.setData({
        catalog
      })
      console.log(res)
      console.log(catalog)
    }).catch(err => {
      console.log(err)
    })
  },
  shows(){
    this.setData({
      flag:false
    })
  },
  // 章节内容
  // chapterContent: function (link) {  // @param link 章节link
  //   return `https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`
  // },
  begin(){//开始阅读
    this.setData({
      count:1
    })
    console.log(this.setData({
      count: 1
    }))
    // console.log(this.setData({ count: 1 }))
    // app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`).then(res => {
    //   console.log(res)
    //   wx.navigateTo({
    //     url: '',
    //   })
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let _id = options._id;
    this.setData({
      _id:_id
    })
    this.bookInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

