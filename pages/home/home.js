const {http} = require('../../utils/http.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible: false,
        lists: []
    },
    onShow(){
        http.get('/todos?completed=false').then(respsonse=>{
            let unCompleted = respsonse.data.resources
            this.setData({lists:unCompleted})
        })
    },
    // 确认任务创建
    confirm(event) {
        console.log('confirm');
        let content = event.detail;
        if (content) {
            http.post(
                '/todos',
                { description: content }
            ).then(response => {
                let todo = response.data.resource;
                let newArr = []
                newArr.push(todo)
                this.setData({lists:newArr})
                this.setData({visible:false})
            })
        }
    },
    // 取消点击confirm框
    cancel(event) {
        this.setData({visible: false})
    },
    //创建一个任务
    createTask() {
        this.setData({visible: true})

    },
    finishTask(event) {
        let index = event.currentTarget.dataset.index;
        this.data.lists[index].completed = true;
        this.setData({lists: this.data.lists})
    },
    //点击开始闹钟
    startTiming() {
        wx.navigateTo({
            url: '/pages/tomato/tomato'
        })
    },
})