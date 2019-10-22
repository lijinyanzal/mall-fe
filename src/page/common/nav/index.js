require('./index.css')

var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var _cart = require('service/cart-service.js')

var nav = {
  //初始化
  init: function() {
    this.bindEvent()
    this.loadUserInfo()
    this.loadCartCount()
    return this
  },
  //点击事件
  bindEvent: function() {
    //登录
    $('.js-login').click(function() {
      _mm.doLogin()
    })
    //注册
    $('js-register').click(function() {
      window.location.href = './register.html'
    })
    //登出
    $('js-logout').click(function() {
      _user.logout(function(res) {
        window.location.reload()
      }, function(err) {
        _mm.errTips(err)
      })
    })
  },
  //加载用户信息
  loadUserInfo: function() {
    _user.checkLogin(function(res) {
      $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username)
    }, function(err) {
      //do nothing
    })
  },
  //加载购物车数量
  loadCartCount: function() {
    _cart.getCartCount(function(res) {
      $('.nav .cart-count').text(res || 0)
    }, function(err) {
      $('.nav .cart-count').text(0)
    })
  }
}

module.exports = nav.init()
