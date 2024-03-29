
require('./index.css')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')

var formError = {
  show: function(errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg)
  },
  hide: function() {
    $('.error-item').hide().find('.err-msg').text('')
  }
}

var page = {
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init: function() {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function() {
    this.loadStepUsername()
  },
  bindEvent: function() {
    var _this = this
    $('#submit-username').click(function() {
      var username = $('#username').val().trim()
      if (username) {
        _user.getQuestion(username, function(res) {
          _this.data.username = username
          _this.data.question = res
          _this.loadStepQuestion()
        }, function(errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入用户名')
      }
    })
    
    $('#submit-question').click(function() {
      var answer = $('#answer').val().trim()
      if (answer) {
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function(res) {
          _this.data.answer = answer
          _this.data.token = res
          _this.loadStepPassword()
        }, function(errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入密码提示问题的答案')
      }
    })
    
    $('#submit-password').click(function() {
      var password = $('#password').val().trim()
      if (password && password.length >= 6) {
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function(res) {
          window.location.href = './result.html?type=pass-reset'
        }, function(errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入不少于6位的新密码')
      }
    })
    
  },
  submit: function() {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    }
    var validateResult = this.formValidate(formData)
    
    if (validateResult.status) {
      _user.login(formData, function(res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html'
      }, function(errMsg) {
        formError.show(errMsg)
      } )
    } else {
      formError.show(validateResult.msg)
    }
  },
  loadStepUsername: function() {
    $('.step-username').show()
  },
  loadStepQuestion: function() {
    formError.hide()
    $('.step-username').hide()
      .siblings('.step-question').show()
      .find('.question').text(this.data.question)
  },
  loadStepPassword: function() {
    formError.hide()
    $('.step-question').hide()
      .siblings('.step-password').show()
  }
  
}

$(function () {
  page.init()
})
