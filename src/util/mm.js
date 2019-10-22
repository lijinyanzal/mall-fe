

var Hogan = require('hogan.js')

var conf = {
  serverHost: ''
}


var _mm = {
  request: function(param) {
    var _this = this
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res) {
        if (res.status === 0) {
          typeof param.success === 'function' ? 
          param.success(res.data, res.msg) : null
        } else if (res.status === 10) {
          _this.doLogin()
        } else if (res.status === 1) {
          typeof param.error === 'function' ? 
          param.error(res.msg) : null
        }
      },
      error: function(err) {
        typeof param.error === 'function' ? 
          param.error(err.statusText) : null
      }
    })
  },
  
  getServerUrl: function(path) {
    return conf.serverHost + path
  },
  
  getUrlParam: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*(&|$))')
    var result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  
  renderHtml: function(htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate)
    var result = template.render(data)
    return result
  },
  
  successTips: function(msg) {
    alert(msg || '操作成功' )
  },
  
  errorTips: function(msg) {
    alert(msg || '哪里出错了~~' )
  },
  
  validata: function(value, type) {
    var value = value.trim()
    if (type === 'require') {
      return !!value
    }
    if (type === 'phone') {
      return /^1\d{10}$/.test(value)
    }
    if (type === 'email') {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
    }
  },
  
  doLogin: function() {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
  },
  goHome: function() {
    window.location.href = './index.html'
  } 
}

module.exports = _mm
