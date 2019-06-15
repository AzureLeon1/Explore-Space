<template>
  <div class="login">
    <img src="../assets/login_bg.jpg" alt="Login Background" class="login-bg">
    <div style="background:rgba(0,0,0,0.2);height:100%;width:100%;">
      <div class="top">
        <div class="login-wrap-top">
          <el-row>
            <img
              src="../assets/logo.png"
              style="width:200px;"
              alt="Login Logo"
            />
          </el-row>
          <el-row style="margin-top: 5px;">
            <span>基于太空的模型展示与数据可视化</span>
          </el-row>
          <el-row style="margin-top: 20px;">
            <span>太阳系教学/科普场景  /  3D地球数据可视化  /  基于手部运动追踪ML模型的交互</span>
          </el-row>
        </div>
      </div>
      <div class="login-wrap">
        <div class="login-form">
          <el-row type="flex" justify="center">
            <el-col :span="18">
              <el-form :model="loginForm" class="form">
                <el-form-item prop="email">
                  <el-input v-model="loginForm.email" placeholder="邮箱" class="login-input">
                    <i slot="prefix" class="el-icon-user"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" class="password">
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    placeholder="密码"
                    class="login-input"
                    style="margin-top:20px;"
                  >
                    <i slot="prefix" class="el-icon-lock"></i>
                  </el-input>
                </el-form-item>
                <el-form-item class="login-button">
                  <el-button
                    type="primary"
                    @click="handleLogin"
                    style="margin:30px 0 0 0;width:100%"
                  >登录</el-button>
                </el-form-item>
                <el-form-item class="login-button">
                  <el-button
                    type="primary"
                    @click="handleSignup"
                    style="margin:10px 0 0 0;width:100%"
                  >注册</el-button>
                </el-form-item>
                <!-- <el-button type="text" style="color:#ddd;">重置密码</el-button> -->
              </el-form>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleSignup() {
      console.log(this.loginForm);
      this.$axios({
        method: 'post',
        baseURL: 'http://localhost:1323',
        url: '/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.loginForm
      })
        .then(res => {
          console.log(res);
          if(res.status == 201) {
            this.$message({
              message: "注册成功",
              type: "success",
              duration: 1000
            })
          }
        })
    },
    handleLogin() {
      console.log(this.loginForm);
      this.$axios({
        method: 'post',
        baseURL: 'http://localhost:1323',
        url: '/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.loginForm
      })
        .then(res => {
          console.log(res);
          if(res.status == 200) {
            this.$router.push({
              name: 'Earth'
            })
          }
        })
        .catch(e => {
          this.$message({
            message: "账户无效",
            type: "error",
            duration: 1000
          })
        })
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.login {
  height: 100%;
  width: 100%;
  text-align: center;
}

.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.top {
  width: 100%;
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0);
}

.login-wrap {
  width: 30%;
  position: absolute;
  top: 470px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0);
}

.login-wrap-top {
  height: 100px;
  margin: 25px;
  font-size: 20px;
  color: white;
  font-weight: 400;
}

.login-button {
  .el-button--primary:hover {
    color: #fff;
    background-color: #81ecec;
    border: #81ecec solid 1px;
  }

  .el-button--primary {
    color: #fff;
    background-color: #00cec9;
    border: #00cec9 solid 1px;
  }
}

.login-input .el-input__inner {
  background: rgba(255, 255, 255, 0.2);
  border: 0;
  color: #fff;
}

.title {
  color: white;
  font-size: 54px;
  font-weight: 500;
  width: 100% !important;
}
</style>


