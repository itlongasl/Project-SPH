<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    //immediate(立即监听):不管数据有没有发生改变，直接监听
    immediate: true,
    // 当轮播图所需要的数据拿到后执行此函数
    skuImageList(newValue, oldValue) {
      // 当DOM结构渲染完毕后执行$nextTick里面的回调函数
      this.$nextTick(() => {
        new Swiper(this.$refs.mySwiper, {
          //loop: true, // 循环模式选项
          // 如果需要分页器
          /*pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },*/
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 展示几张图片
          slidesPerView: 4,
          // 切换图片数量
          slidesPerGroup: 1,
        });
      });
    },
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit("getIndex", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>