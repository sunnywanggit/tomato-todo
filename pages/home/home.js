//引入id生成器
let {idGenerator} = require('../../utils/idGenerator.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible: false,
        lists: [
            {id: 1, text: 'do', finished:false},
            {id: 2, text: 'what', finished:false},
            {id: 3, text: 'tomorrow', finished:false},
            {id: 4, text: 'do what tomorrow', finished:false}
        ]

    },
    confirm(event) {
        let obj = {}
        obj.id = this.data.lists.length + 1
        obj.text = event.detail;
        obj.finished = false
        let newLists = this.data.lists
        if (event.detail) {
            newLists.push(obj)
            this.setData({lists: newLists})
            this.setData({visible: false})
        }
    },
    // 取消点击confirm框
    cancel(event) {
        this.setData({visible: false})
    },
    createTask() {
        this.setData({visible: true})
    },
    finishTask(event){
        let index = event.currentTarget.dataset.index;
        this.data.lists[index].finished = true;
        this.setData({lists:this.data.lists})
    },
    //点击开始闹钟
    startTiming(){
        wx.navigateTo({
            url: '/pages/tomato/tomato'
        })
    },
    onLoad: function (options) {

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