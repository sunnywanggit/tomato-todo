const { http } = require('../../utils/http.js');

Page({
    data: {
        tab: "tomato",
        tomatoes: {},
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
        console.log('tomatoes');
        console.log(this.data.tomatoes);
    },
    fetchTodos(){
        http.get('/todos', { is_group: "yes" })
            .then(response => {
                this.setData({ todos: response.data.resources })
            })
        console.log('todos');
        console.log(this.data.todos);
    },
    changeTab(event){
        let name = event.currentTarget.dataset.name
        this.setData({ tab: name })
    }
})