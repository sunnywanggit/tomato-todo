const {
    host,
    t_app_id,
    t_app_secret
} = getApp().globalData
const _http = (url, data, method) => {
    return new Promise((reslove, reject) => {
        wx.request({
            url: `${host}${url}`,
            data,
            header: {
                Authorization: `Bearer ${wx.getStorageSync('X-token')}`,
                "t-app-id": t_app_id,
                "t-app-secret": t_app_secret
            },
            method,
            dataType: 'json',
            success: (response) => {
                let statusCode = response.statusCode
                if (statusCode === 401 || statusCode === 422) {
                    wx.removeStorageSync("me")
                    wx.removeStorageSync("X-token")
                    wx.reLaunch({
                        url: '/pages/login/login',
                    })
                    wx.showToast({
                        icon: 'none',
                        title: '登录已失效，请重新登录',
                    })
                    reject({
                        statusCode,
                        data: response.data
                    })
                } else if (statusCode === 500){
                    wx.showToast({
                        icon:'none',
                        title: '网络异常，请重试',
                    })
                    reject({
                        statusCode,
                        data: response.data
                    })

                } else {
                    reslove(response)
                }
            },
            fail: (error) => {
                wx.showToast({
                    title: '请求失败',
                    icon: 'none'
                })
                reject(error)
            }
        })
    })
}

const http = {
    get: (url, params) => _http(url, params, 'GET'),
    post: (url, params) => _http(url, params, 'POST'),
    put: (url, params) => _http(url, params, 'PUT'),
    delete: (url, params) => _http(url, params, 'DELETE')
}

module.exports = {
    http
}