const {http} = require('../../utils/http.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        visible: false,
        lists: [],
        alertConVisible: false,
        taskValue:'',
        id:'',
        index:'',
    },
    onShow() {

        http.get('/todos?completed=false').then(respsonse => {
            let unCompleted = respsonse.data.resources
            console.log(unCompleted);
            this.setData({lists: unCompleted})
        })
    },
    //打开创建个任务
    createTask() {
        console.log('task');
        this.setData({visible: true})
    },
    // 确认任务创建
    confirm(event) {
        console.log('confirm');
        let content = event.detail;
        if (content) {
            http.post(
                '/todos',
                {description: content}
            ).then(response => {
                console.log('response');
                console.log(response);

                let todo = response.data.resource;
                let newArr = this.data.lists
                newArr.push(todo)
                this.setData({lists: newArr})
                this.setData({visible: false})
            })
        }
    },
    addTodo(e) {
        console.log(e.detail);
        if (e.detail === '') {
            wx.showToast({
                icon: 'none',
                title: '请输入任务内容'
            })
            return
        }
        let description = e.detail
        http.post("/todos", {
            description
        })
            .then(response => {
                let newTodo = response.data.resource
                this.data.toDoList.unshift(newTodo)
                this.setData({
                    toDoList: this.data.toDoList,
                    visible: false,
                    content: ""
                })
            })
    },
    // 取消点击confirm框
    cancel(event) {
        this.setData({visible: false})
    },
    // 完成任务
    finishTask(event) {
        let index = event.currentTarget.dataset.index;
        let id = event.currentTarget.dataset.id
        this.data.lists[index].completed = true;
        http.put(`/todos/${id}`, {
            completed: true
        }).then(response => {
            let todo = response.data.resource
            this.data.lists[index] = todo
            this.setData({lists: this.data.lists})
        })
    },
    // 修改已创建的任务内容
    changeTaskCon(event) {
        let id = event.currentTarget.dataset.id
        this.setData({id:id})
        let index = event.currentTarget.dataset.index;
        this.setData({index:index})

        let content = this.data.lists[index].description
        console.log(content);
        // console.log(event);
        this.setData({taskValue:content})
        // console.log(this.data.taskValue);

        this.setData({alertConVisible: true})

    },
    // 确认修改任务内容
    alertCon(event) {
        let id = this.data.id
        let index = this.data.index
        // console.log(this.data.lists[index]);
        http.put(`/todos/${id}`, {
            completed: false,
            description: event.detail
        }).then(response => {
            let todo = response.data.resource
            this.data.lists[index] = todo
            this.setData({lists: this.data.lists})
        })
        this.setData({alertConVisible: false})
    },
    cancelCon() {

        this.setData({alertConVisible: false})
    },
    //点击开始闹钟
    startTiming() {
        wx.navigateTo({
            url: '/pages/tomato/tomato'
        })
    },
})















































