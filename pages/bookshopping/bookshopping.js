let app =  getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_classify:[],//分类所有数据 总
    seniority:[],//排行所有数据 总
    count:1
  },
  getCats(){//拿到分类数据
    app.globalData.fly.get('/cats/lv2/statistics').then(res=>{
      let book_classify = res.data;
      this.setData({//赋值
        book_classify,
      })
      // console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  },
  getseniority() {//拿到排行数据
    app.globalData.fly.get('/ranking/gender').then(res => {
      let seniority = res.data;
      this.setData({//赋值
        seniority,
      })
      // console.log(res)
    }).catch(err => {
      // console.log(err)
    })
  },
  set_classify(){
    this.setData({
      count:1
    })
  },
  set_sisters(){
    this.setData({
      count: 2,
    })
    this.getseniority()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCats()
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