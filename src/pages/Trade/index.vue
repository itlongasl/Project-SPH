<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="address in addressInfo"
        :key="address.id"
      >
        <span class="username" :class="{ selected: address.isDefault == 1 }">
          {{ address.consignee }}
        </span>
        <p @click="changeDefault(address, addressInfo)">
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-show="address.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="detail in tradeInfoList.detailArrayList"
          :key="detail.skuId"
        >
          <li>
            <img
              style="width: 85px; height: 85px"
              :src="detail.imgUrl"
              alt=""
            />
          </li>
          <li>
            <p style="width: 480px">
              {{ detail.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>{{ detail.orderPrice }}</h3>
          </li>
          <li>X{{ detail.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="msg"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ tradeInfoList.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ tradeInfoList.totalAmount }}.00</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ tradeInfoList.totalAmount }}.00</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ userDefaultAddress.fullAddress }}</span>
        收货人：<span>{{ userDefaultAddress.consignee }}</span>
        <span>{{ userDefaultAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      // 提交订单时的最终地址
      userDefaultAddress: {
        consignee: "史蒂芬啊",
        fullAddress: "北京北京市昌平区北七家镇宏福苑南一区0号楼0单元010",
        id: 1,
        isDefault: "0",
        phoneNum: "18101085318",
        provinceId: 1,
        regionId: 1,
        userAddress: "北京市昌平区北七家镇宏福苑南一区0号楼0单元010",
        userId: 2,
      },
      // 用户留言
      msg: "",
      // 订单号
      orderId: Number,
    };
  },
  mounted() {
    // 派发用户地址信息actions
    this.$store.dispatch("getTrade");
    // 派发商品信息actions
    this.$store.dispatch("getUserAddressList");
  },
  computed: {
    ...mapState({
      addressInfo: (state) => state.trade.address,
      tradeInfoList: (state) => state.trade.tradeInfo,
    }),
    // 提交订单时的最终地址
    // userDefaultAddress() {
    //   // find:查找数组中符合条件的元素并返回，作为最终结果
    //   return (
    //     this.addressInfo.find((item) => {
    //       // isDefault == 1即选中，返回isDefault == 1的元素对象
    //       item.isDefault == "1";
    //     }) || []
    //   );
    // },
  },
  methods: {
    // 修改默认地址
    changeDefault(address, addressInfo) {
      // 排他思想  遍历数组将所有对象的isDefault=0
      addressInfo.forEach((item) => {
        item.isDefault = "0";
      });
      // 将点击的对象isDefault=1
      address.isDefault = "1";
      this.userDefaultAddress = address;
    },
    async submitOrder() {
      let { tradeNo } = this.tradeInfoList; //交易单号
      let data = {
        consignee: this.userDefaultAddress.consignee, //收件人姓名
        consigneeTel: this.userDefaultAddress.phoneNum, //收件人号码
        deliveryAddress: this.userDefaultAddress.fullAddress, //收件人地址
        paymentWay: "ONLINE", //支付方式--只有一种 所以写死
        orderComment: this.msg, //买家留言
        orderDetailList: this.tradeInfoList.detailArrayList, //商品清单
      };
      // 收集完数据后发送请求并传入参数
      let result = await this.$API.reqSubmitOrder(data, tradeNo);
      if (result.data.code == 200) {
        // 存储订单号
        this.orderId = result.data.data;
        // 跳转路由并携带query参数
        this.$router.push({ name: "pay", query: { orderId: this.orderId } });
      } else {
        alert(result.data.data);
      }
    },
  },
  watch: {
    // 有牛马把数据改了，这里用监视属性自己改一下
    addressInfo: {
      handler(newValue, oldValue) {
        // 设置一个默认地址
        this.addressInfo[0].isDefault = "1";
      },
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>