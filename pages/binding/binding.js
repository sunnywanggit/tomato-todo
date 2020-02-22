Page({
    data: {
        accountValue: '',
        passwordValue: '',
        onOff:true
    },
    inputAccount: function (event) {
        let value = event.detail.value
        this.setData({accountValue:value})
        console.log(this.data.accountValue);
    },
    passwordInput:function(event){
        let value = event.detail.value
        this.setData({passwordValue:value})
        console.log(this.data.passwordValue);

    },
    register:function(){

        if(this.data.onOff){
            this.setData({onOff:false})
        }else{
            this.setData({onOff:true})
        }


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