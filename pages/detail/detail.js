// pages/detail/detail.js
let datas = require('../../datas/list-data')
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jdInfo: {},
    // 控制收藏按钮显示
    isCollected: false,
    // 控制音乐播放
    isMusicPlay: true,
    // 索引
    index: null,
    // 本地存储对象
    storageObj: {}
  },
  /** 业务逻辑 */
  // 切换收藏图标
  toggleCollec: function () {
    let isCollected = !this.data.isCollected
    let index = this.data.index
    let obj = this.data.storageObj
    obj[index] = isCollected
    this.setData({
      isCollected
    }),
    wx.showToast({
      title: isCollected ? '收藏成功' : '取消收藏'
    }),
    wx.setStorage({
      data: obj,
      key: 'isCollec',
    })
  },
  // 切换音乐是否播放
  toggleMusic: function () {
    this.setData({
      isMusicPlay: !this.data.isMusicPlay
    })
    if (this.data.isMusicPlay) {
      backgroundAudioManager.play()
    } else {
      backgroundAudioManager.pause()
    }
  },
  // 分享
  share: function () {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到QQ', '分享到微博'],
      itemColor: 'black'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: options.ind,
      jdInfo: datas.list_data[options.ind] 
    })
    // 本地存储
    wx.getStorage({
      key: 'isCollec',
      success: (res) => {
        this.setData({
          storageObj: res.data,
          isCollected: res.data[options.ind]
        })
      } 
    })
    // 播放音乐
    backgroundAudioManager.src = this.data.jdInfo.music.dataUrl,
    backgroundAudioManager.title = this.data.jdInfo.music.title,
    backgroundAudioManager.coverImgUrl  = this.data.jdInfo.music.coverImgUrl
    // 默认播放
    backgroundAudioManager.play()
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