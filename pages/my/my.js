const { http } = require('../../utils/http.js');

Page({
    data: {
        tomatoes: {},
        // 我所有完成的任务在这里
        todos: {},
        my: {}
    },
    onShow: function () {
        this.fetchTomatoes()
        this.fetchTodos()
        this.setData({my: wx.getStorageSync('my')})
    },
    fetchTomatoes(){
        http.get('/tomatoes', { is_group: "yes" })
            .then(response => {
                this.setData({ tomatoes: response.data.resources })
            })
    },
    fetchTodos(){
        http.get('/todos', { is_group: "yes" })
            .then(response => {
                this.setData({ todos: response.data.resources })
            })
    },
})