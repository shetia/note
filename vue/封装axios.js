import axios from 'axios'

export default function (arr) {
    function _myaxios() {
        this.vueob = null
        this.status = true
    }
    _myaxios.prototype.v = function (ob) {
        this.vueob = ob
    }
    // 生成请求
    _myaxios.prototype.getAxios = function (config) {
        let _url = config.url
        let _type = config.type
        let _data = config.data
        let fatory = {
            get: function () {
                return axios.get(_url)
            },
            post: function () {
                return axios.post(_url, _data)
            }
        }
        return fatory[_type]
    }
    // 发送请求
    _myaxios.prototype.sendAxios = function (config) {
        let _axios = this.getAxios(config)
        let self = this
        if (this.status) {
            this.status = false
            _axios().then(function (res) {
                self.status = true
                config.success === 'default' ? self.handleAixos(config.dataname, res.data) : config.success.call(self.vueob, res)
            })
        }
    }
    // 处理请求
    _myaxios.prototype.handleAixos = function (dataname, data) {
        this.vueob[dataname] = data
    }
    let _a = new _myaxios()
    arr.forEach((item, index) => {
        _a[item.name] = function (config) {
            _a.sendAxios({
                url: item.url,
                type: (config && config.type) || 'get',
                success: (config && config.success) || 'default',
                data: (config && config.data) || {},
                dataname: (config && config.dataname) || item.name
            })
        }
    })
    return _a
}