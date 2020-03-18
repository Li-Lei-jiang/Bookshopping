// components/classify/classify.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book_classify:{
      type:Object,
      default:''
    },
    count:{
      type:Number,
      default:''
    },
    seniority:{
      type: Object,
      default: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goSubclass(e){
      // console.log(e);
      let index = e.currentTarget.dataset.index;
      let male = e.currentTarget.dataset.male;
      let name = e.currentTarget.dataset.item.name;
      wx.navigateTo({
        url: `/pages/subclass/subclass?index=${index}&name=${name}&male=${male}`,
      }),
      wx.setNavigationBarTitle({
        title: e.currentTarget.dataset.item.name,
      })
    },
  
  }
})
