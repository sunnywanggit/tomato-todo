Page({
    data: {
        //一个番茄的时间
        time: 1500,
        formatedTime: '',
        timer: null,
        switch: '暂停',
        visible: false,
        reasonText: '',
        buttonHidden: true,
        whatFinishedConfirmVisible:false,
        // 完成内容
        finishedText:''
    },
    onShow: function () {
        this.timing()
    },
    // 确认提交完成框
    finishedConfirm:function(event){
        this.setData({whatFinishedConfirmVisible:false})
        this.setData({finishedText:event.detail})
    },
    //取消提交完成框
    cancelFinishedConfirm:function(){
        this.setData({whatFinishedConfirmVisible:false})
    },
    // 再来一组
    onceMore:function(){
        this.setData({buttonHidden:true})
        this.setData({time:1500})
        this.timing()
    },

    // 计时中
    timing: function () {
        this.formatTime()
        this.data.timer = setInterval(() => {
            if (this.data.time === 1) {
                this.setData({buttonHidden:false})
                this.setData({whatFinishedConfirmVisible:true})
                clearInterval(this.data.timer)
            }
            this.data.time--
            this.formatTime()
        }, 1000)
    },
    // 格式化时间
    formatTime: function () {
        let m = Math.floor(this.data.time / 60)
        let s = Math.floor(this.data.time % 60)
        if (s === 0) {
            s = "00"
        }
        if ((s + '').length === 1) {
            s = "0" + s
        }
        if ((m + '').length === 1) {
            m = "0" + m
        }
        this.setData({formatedTime: `${m}:${s}`})
    },
    onPause: function () {
        if (this.data.switch === '暂停') {
            this.setData({switch: '开始'})
            clearInterval(this.data.timer)
        } else if (this.data.switch === '开始') {
            this.setData({switch: '暂停'})
            this.timing()
        }
    },
    // 放弃
    onGiveUp: function () {
        clearInterval(this.data.timer)
        this.setData({visible: true})
    },
    // 点击放弃confirm取消按钮
    onCancel: function () {
        this.timing()
        this.setData({visible: false})
    },
    // 点击放弃confirm确认按钮
    onConfirm: function (event) {
        this.setData({reasonText: event.detail})
        this.setData({visible: false})
        this.setData({time: 0})
        // 路由跳转
        wx.navigateBack({
            to:-1
        })
    },
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