<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <span>{{ userName }}</span>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/center/myorder">我的订单</router-link>
          <!-- <a href="###">我的购物车</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    // 通过全局事件总线清空keyword
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
  methods: {
    // 跳转search事件函数
    goSearch() {
      // 路由传参第一种写法：字符串写法
      // this.$router.push('/search/' + this.keyword +'?k=' + this.keyword.toUpperCase())
      // 路由传参第二种写法：模板字符串写法
      // this.$router.push(`/search/'${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 路由传参第三种写法：对象写法
      if (this.$route.query) {
        //判断是否有query参数 如果有就一起带过去
        let loction = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        loction.query = this.$route.query;
        this.$router.push(loction);
      }

      // 如何指定params参数可传可不传？
      //答：使用params传递参数时这里需要占位，当我们不知道会不会有参数传进来的时候，在占位后面加个问号表示参数可传可不传
      // 当params传递的是空字符串该如何解决？
      //答：params:{keyword:''||undefined},

      /* 路由能否使用props传参？  可以
                使用props传参的第一种写法 布尔值写法
                props:true
                使用props传参的第二种写法 对象写法
                props: { a: 1, b: 2 }
                使用props传参的第三种写法 函数写法
                props: ($route) => {
                    return { keyword: $route.params.keyword, k: $route.query.k }
                } */
    },
    // 退出登录事件函数
    async logout() {
      try {
        // 派发actions 发起退出登录请求以及清除用户信息token
        await this.$store.dispatch("userLogout");
        // 并且跳转到首页home
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    // 计算属性获取用户名
    userName() {
      // 获取用户名
      return this.$store.state.user.userInfo.name;
    },
  },
  beforeDestroy() {
    this.$bus.$off("clear");
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
          .register:hover {
            color: red;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>