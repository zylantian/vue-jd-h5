<template>
  <div class="login">
    <cm-header>
      <span slot="left" @click="$router.go(-1)">
        <svg-icon icon-class="close-popup"></svg-icon>
      </span>
    </cm-header>
    <div class="mall-logo">
      <img src="../../assets/image/setting/logo.png" />
    </div>
    <section class="login-info">
      <van-cell-group class="info-list">
        <van-field v-model="loginForm.user" clearable placeholder="手机/邮箱" />
        <van-field
          v-model="loginForm.password"
          @keyup.enter.native="handleUserLogin"
          type="password"
          clearable
          placeholder="请输入密码"
        />
        <van-field class="temp-empty" />
        <router-link class="forget-pwd" to="/mine/forgetPassword" tag="span">
          <svg-icon icon-class="question-mark"></svg-icon>
          <i>忘记密码？</i>
        </router-link>
      </van-cell-group>
    </section>

    <div class="login-register-btns">
      <span class="login-btn" @click="handleUserLogin">登录</span>
      <router-link class="register-btn" tag="span" to="/register/phoneRegister">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    handleUserLogin () {
      this.$http.post(`/api/user/login`, this.loginForm).then(response => {
        if (response.data.code === 0) {
          // 登录成功后应该查看购物车的数量 TODO
          localStorage.setItem('token', response.data.content.token)
          this.$router.push('/index')
        } else {
          this.$toast({
            mask: false,
            duration: 1000,
            message: response.data.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  padding: 0 16px;
  min-height: 667px;
  max-height: 812px;
  background: linear-gradient(#fdfdfd, #ffecf0);

  .mall-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 32px;
  }
  .login-info {
    padding: 0 34px;
    .info-list {
      position: relative;
      .forget-pwd {
        position: absolute;
        bottom: -30px;
        left: 15px;
        color: #ec3924;
        font-size: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        .svg-icon {
          padding-right: 4px;
          width: 12px;
          height: 12px;
        }
      }
    }
    /deep/ .temp-empty {
      display: none;
    }
    /deep/ .van-cell-group {
      background-color: transparent;
    }
    /deep/ .van-cell {
      background-color: transparent;
      font-size: 17px;
      padding-top: 60px;
    }
    /deep/ .van-hairline--top-bottom::after {
      font-size: 17px;
      border-width: 0;
    }
  }
  .other-login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
    .top-login {
      font-size: 13px;
      color: #3a3a3a;
      padding-bottom: 10px;
    }
  }
  .login-register-btns {
    text-align: center;
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    .login-btn {
      display: inline-block;
      width: 150px;
      height: 44px;
      line-height: 44px;
      color: white;
      font-size: 17px;
      border: 1px solid #ec3924;
      border-radius: 4px;
      background-color: #ec3924;
    }
    .register-btn {
      line-height: 44px;
      display: inline-block;
      color: #949497;
      font-size: 17px;
      border: 1px solid #949497;
      background-color: transparent;
      border-radius: 4px;
      width: 150px;
      height: 44px;
      margin-left: 15px;
    }
  }
}
</style>
