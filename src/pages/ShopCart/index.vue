<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="changeCheck(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('mins', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length != 0"
          @change="updateAllCheckCart"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckCart">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="addTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入lodash插件 按需引入throttle节流
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartListData();
  },
  methods: {
    // 获取个人购物车数据
    getCartListData() {
      this.$store.dispatch("getCartList");
    },
    // 购物车商品数量的修改
    handler: throttle(async function (type, disNum, cart) {
      // 对于参数的解释：
      // type:类型，因为加商品和减商品以及输入框改商品数量都是这个事件，所以此参数用于区分是加还是减
      // disNnm:修改的数量，加变化量为1，减变化量为-1，如果是input框disNum为input的值
      // cart:所修改商品的全部数据
      switch (type) {
        case "add":
          // 点击加号每次加1
          disNum == 1;
          break;
        case "mins":
          // 点击减号判断 如果skuNum（商品数量）大于1，disNum为-1，skuNum小于1，disNum为0，因为商品数量最少是1，disNum==0点击减号就不会减
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          let result = /^\d{1,5}$/; //匹配5位正整数的正则表达式
          if (result.test(disNum) && disNum != 0) {
            disNum = disNum - cart.skuNum;
          } else {
            disNum = 0;
          }
          break;
      }

      try {
        // 成功后派发actions
        await this.$store.dispatch("getAddToCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 重新发请求渲染数据
        this.getCartListData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    // 删除商品回调
    async deleteCart(cart) {
      try {
        await this.$store.dispatch("deleteCart", cart.skuId);
        this.getCartListData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 切换商品选中状态回调函数
    async changeCheck(cart, $event) {
      // 带给服务器的isChecked值不应该是布尔值, 而是1或0
      let isChecked = $event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("checkCart", {
          // 派发actions传递id与选中状态给服务器
          skuId: cart.skuId,
          isChecked,
        });
        // 重新发请求渲染页面
        this.getCartListData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除全部选中的商品
    deleteAllCheckCart() {
      // 遍历cartInfoList数组 里面每一项就是一个商品 符合条件的都删除
      this.cartInfoList.forEach(async (item) => {
        // 判断每一个商品的isChecked（是否为选中状态）
        if (item.isChecked == 1) {
          // 如果为选中状态则调用deleteCart函数删除该商品  deleteCart在上面
          this.deleteCart(item);
        }
      });
    },
    // 全选框判断事件
    async updateAllCheckCart(e) {
      try {
        let isChecked = e.target.checked ? "1" : "0"; //如果全选框为选中状态isChecked=1，否则等于0
        await this.$store.dispatch("updateAllCartChecked", isChecked);
        // 重新请求数据渲染页面
        this.getCartListData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 派发获取订单sctions以及跳转路由
    addTrade() {
      // 派发用户地址信息actions
      this.$store.dispatch("getTrade");
      // 派发商品信息actions
      this.$store.dispatch("getUserAddressList");
      // 派发完后跳转到订单页面
      this.$router.push("/trade");
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 计算获取数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算全部商品总价钱
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.cartPrice;
      });
      return sum;
    },
    // 判断底部全选框是否全选
    isAllCheck() {
      // 判断底部全选框是否全选  every：遍历数组  下面遍历cartInfoList，里面item为数组的每一个元素，如果每一个item的isChecked属性值都为1，返回true，只要有一个不符合条件返回false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>