<template>
  <div>
    <TypeNav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑导航---三级联动 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 面包屑导航---搜索关键字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 面包屑导航---品牌区 -->
            <li class="with-x" v-if="searchParams.trademark">
              <!-- 此时trademark的数据格式为："tmId:tmName",这里只需要展示tmName，所以使用split将字符串切割成以:分隔的数组，tmId为数组的第0项，tmName为第1项 -->
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1]
              }}<i @click="removeAttrValue(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @attrInfo="attrInfo" @tradeMarkInfo="tradeMarkInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click.prevent="changeOrder('1')">
                  <a href="#">综合<span v-show="isOne" class="iconfont" :class="{
                    'icon-paixu': isDesc,
                    'icon-xiangshang': isAsc,
                  }"></span></a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li :class="{ active: isTwoAsc }" @click.prevent="changeOrder('2', 'asc')">
                  <a href="#">价格<span class="iconfont icon-xiangshang"></span></a>
                </li>
                <li :class="{ active: isTwoDesc }" @click.prevent="changeOrder('2', 'desc')">
                  <a href="#">价格<span class="iconfont icon-paixu"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      {{ good.price }}.00
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 全局组件 --- 分页器 -->
          <Pagination :pageNo="this.searchParams.pageNo" :pageSize="this.searchParams.pageSize" :total="total"
            :continues="5" @currentPage="currentPage" />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>94088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "@/pages/Search/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        // 一级商品id
        category1Id: "",
        // 二级商品id
        category2Id: "",
        // 三级商品id
        category3Id: "",
        // 分类名称
        categoryName: "",
        // 搜索框输入的内容
        keyword: "",
        // 商品排序 初始值 综合|降序
        order: "1:desc",
        // 分页器默认初始值（当前第几页）
        pageNo: 1,
        // 每一页展示的商品个数
        pageSize: 10,
        /*商品属性的数组: ["属性ID:属性值:属性名"]
        示例: ["2:6.0～6.24英寸:屏幕尺寸"]*/
        props: [],
        // 品牌
        trademark: "",
        // page: ''
      },
    };
  },
  components: { SearchSelector },
  beforeMount() {
    //Object.assign(合并对象)：把其他参数合并到第一个参数(this.searchParams)里面
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.$store.dispatch("getSearchList");
    // 挂载时发送一次请求
    this.getSearchData();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf(1) != -1;
    },
    isAsc() {
      return (
        this.searchParams.order.indexOf(1) != -1 &&
        this.searchParams.order.indexOf("asc") != -1
      );
    },
    isDesc() {
      return (
        this.searchParams.order.indexOf(1) != -1 &&
        this.searchParams.order.indexOf("desc") != -1
      );
    },
    isTwoAsc() {
      return (
        this.searchParams.order.indexOf(2) != -1 &&
        this.searchParams.order.indexOf("asc") != -1
      );
    },
    isTwoDesc() {
      return (
        this.searchParams.order.indexOf(2) != -1 &&
        this.searchParams.order.indexOf("desc") != -1
      );
    },
    //获取vuex仓库中的total总商品数
    ...mapState({
      total: (state) => {
        return state.search.searchList.total;
      },
    }),
  },
  methods: {
    getSearchData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 面包屑导航删除事件---三级联动
    removeCategoryName() {
      // 删除分类的名字 同时刷新页面将不需要的id清空（既然清空就说明不需要这个属性，可以将属性值设置为undefined，这样请求服务器数据将不会携带这个数据，性能提升）
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 重新请求数据渲染页面
      this.getSearchData();
      // 页面内重新跳转路由，如果有params参数一起带上
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 面包屑导航删除事件---搜索框关键字
    removeKeyword() {
      // 删除搜索框关键字
      this.searchParams.keyword = undefined;
      // 重新请求数据渲染页面
      this.getSearchData();
      // 页面内重新跳转路由，如果有query参数一起带上
      this.$router.push({ name: "search", query: this.$route.query });
      // 组件间通信：删除面包屑导航清空搜索框（keyword），需要在Header组件进行操作，这里使用全局事件总线
      this.$bus.$emit("clear");
    },
    // 面包屑导航删除事件---品牌区
    removeTrademark() {
      // 清空品牌相关信息
      this.searchParams.trademark = undefined;
      // 重新请求数据渲染页面
      this.getSearchData();
    },
    // 品牌数据信息收集及处理回调函数（自定义事件）
    tradeMarkInfo(trademark) {
      // 合并数据
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 合并数据后重新发请求渲染数据
      this.getSearchData();
    },
    // 收集平台商品属性的回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        // 合并数据后重新发请求渲染数据
        this.getSearchData();
      }
    },
    // 商品属性删除事件
    removeAttrValue(index) {
      // splice:参数一：删除元素的索引，参数二：删除元素的数量
      this.searchParams.props.splice(index, 1);
      // 合并数据后重新发请求渲染数据
      this.getSearchData();
    },
    // 排序逻辑
    changeOrder(flag, order) {
      let originOrder = this.searchParams.order.split(":")[1];
      let newOrder = "";
      if (flag == 1) {
        newOrder = `${flag}:${originOrder === "asc" ? "desc" : "asc"}`;
      } else {
        newOrder = `${flag}:${order}`;
      }
      this.searchParams.order = newOrder;
      // 重新发请求渲染数据
      this.getSearchData();
      console.log(this.searchParams.order);
    },
    // 收集分页器分页器数据回调函数（自定义事件）
    currentPage(page) {
      this.searchParams.pageNo = page;
      // 合并数据后重新发请求渲染数据
      this.getSearchData();
    },
  },
  // 数据监视
  watch: {
    // 监视路由的信息是否发生改变，如果发生改变，再次发起请求
    $route(newValue, oldValue) {
      // 路由数据改变后将新的数据再次合并
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 调用函数发送请求
      this.getSearchData();
      // 发送完请求后清除所有id（以防下次请求会有残留id）
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {

              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>