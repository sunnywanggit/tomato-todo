let {http}= require('../../utils/http.js')

Page({
    data: {
        accountValue: '',
        passwordValue: '',
    },
    inputAccount: function (event) {
        let value = event.detail.value
        this.setData({accountValue: value})
    },
    passwordInput: function (event) {
        let value = event.detail.value
        this.setData({passwordValue: value})

    },
    onRegister: function () {
        console.log(this.data.accountValue);
        console.log(this.data.passwordValue);
        http.post('/bindings',{
            account: this.data.accountValue,
            password_digest: this.data.passwordValue
        }).then(response=>{
            console.log(response);
            wx.setStorageSync('my',response.data.resource)
            wx.redirectTo({
                url: '/pages/home/home'
            })
        })


    },
})