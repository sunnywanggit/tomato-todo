let {http} = require('../../utils/http.js')

Page({
    data: {
        //一个番茄的时间
        time: 5,
        formatedTime: '',
        timer: null,
        switch: '暂停',
        visible: false,
        reasonText: '',
        buttonHidden: true,
        whatFinishedConfirmVisible: false,
        // 完成内容
        finishedText: '',
        tomato: {},
        lists: [],
        id:'',
        index:''
    },
    onShow: function () {
        this.timing()
        //创建一个番茄
        http.post('/tomatoes').then(response => {
            this.setData({tomato: response.data.resource})
            console.log(this.data.tomato);
        })

        http.get('/todos?completed=false').then(respsonse => {
            let unCompleted = respsonse.data.resources
            this.setData({lists: unCompleted})
        })
    },
    // 确认提交完成框
    finishedConfirm: function (event) {
        let content = event.detail;
        if (content) {
            http.post(
                '/todos',
                {description: content}
            ).then(response => {
                let todo = response.data.resource;
                let newArr = this.data.lists
                newArr.push(todo)
                this.setData({lists: newArr})
                console.log(this.data.lists.indexOf(todo));
                let todoIndex = this.data.lists.indexOf(todo)
                this.data.id = this.data.lists[todoIndex].id

                this.data.lists[todoIndex].completed = true;
                http.put(`/todos/${this.data.id}`, {
                    completed: true
                }).then(response => {
                    this.setData({lists: this.data.lists})
                })

                this.setData({whatFinishedConfirmVisible:false})
            })
        }
    },
    //取消提交完成框
    cancelFinishedConfirm: function () {
        this.setData({whatFinishedConfirmVisible: false})
    },
    // 再来一组
    onceMore: function () {
        this.setData({buttonHidden: true})
        this.setData({time: 1500})
        this.timing()
    },

    // 计时中
    timing: function () {
        this.formatTime()
        this.data.timer = setInterval(() => {
            if (this.data.time === 1) {
                this.setData({buttonHidden: false})
                this.setData({whatFinishedConfirmVisible: true})
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
        http.put(`/tomatoes/${this.data.tomato.id}`, {
            description: event.detail,
            aborted: true
        }).then(response => {
            // 路由跳转
            wx.navigateBack({
                to: -1
            })
        })

    },
    onHide: function () {
        clearInterval(this.data.timer)
        http.put(`/tomatoes/${this.data.tomato.id}`, {
            description: "退出放弃",
            aborted: true
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(this.data.timer)
        http.put(`/tomatoes/${this.data.tomato.id}`, {
            description: "退出放弃",
            aborted: true
        })
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