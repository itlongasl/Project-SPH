<template>
  <div class="pagination">
    <!-- 分页器组件 -->

    <!-- 上部分 -->
    <button :disabled="pageNo == 1" @click="$emit('currentPage', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('currentPage', 1)" :class="{ active: pageNo == page }">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">...</button>

    <!-- 中间部分 -->
    <span v-for="page in startNumAndEndNum.end" :key="page">
      <button v-if="page >= startNumAndEndNum.start" :class="{ active: pageNo == page }"
        @click="$emit('currentPage', page)">
        {{ page }}
      </button>
    </span>

    <!-- 下部分 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">...</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('currentPage', totalPage)">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('currentPage', pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      page: ''
    }
  },
  //pageNo:当前页数 pageSize：每页展示数据数量 total：总商品数 continues：分页连续页码
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共展示页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { totalPage, pageNo, continues } = this;
      // 定义两个变量存储连续页码的起始数字与结束数字
      let start = 0,
        end = 0;
      // 连续页码为5页，总页数则必须大于5，但有不正常现象：总页数小于连续页码数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象：总页码大于连续页码
        // 判断起始页 一般连续页码数为5【4，5，6，7，8】、7【3，4，5，6，7，8，9】
        //当前页为6 ：两种不同情况：连续页码为5 start为4，连续页码为7，start为3
        // 求start:pageNo(当前页)-parseInt(continues / 2)(连续页码数/2 向下取整)
        //比如连续页码数为5 start = 6(当前页) - 2(5 / 2 = 2 向下取整) = 4
        start = pageNo - parseInt(continues / 2);
        // 结束数字同理 end = 6(当前页) + 2(5 / 2 = 2 向下取整) = 8
        end = pageNo + parseInt(continues / 2);
        // 当前页为1或2时，start（起始页）就是0或负数而start最小为1
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 当前页为页码总数时，end（结束页）会大于总页数，但end最大只能等于总页数
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style scoped lang="less">
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>