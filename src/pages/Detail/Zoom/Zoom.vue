<template>
  <div class="spec-preview">
    <img :src="skuImage.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImage.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    this.$bus.$on("getIndex", (index) => {
      // 将接受的索引值存到currentIndex
      this.currentIndex = index;
    });
  },
  computed: {
    // 让skuImageList的第0项至少是一个空对象而不是undefined，防止控制台报一些无意义的错误
    skuImage() {
      // 这里不将数据写死 this.currentIndex：索引值
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      //（1）offsetX:offsetX 属性返回鼠标指针相对于目标元素的 x 坐标  （2）offsetY:offsetY 属性返回鼠标指针相对于目标元素的 y 坐标。
      //offsetWidth:offsetWidth 属性是一个只读属性，它返回该元素的像素宽度，宽度包含内边距（padding）和边框（border），不包含外边距（margin），是一个整数，单位是像素 px
      //offsetHeigth:offsetHeigth 属性是一个只读属性，它返回该元素的像素高度，宽度包含内边距（padding）和边框（border），不包含外边距（margin），是一个整数，单位是像素 px
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;

      // 约束left与top值
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;

      // 修改mask的left与top值
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 大图移动距离是遮罩层的两倍，并且方向是相反的
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
  // 组件销毁前解除getIndex事件
  beforeDestroy() {
    this.$bus.$off("getIndex");
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>