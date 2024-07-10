<template>
  <div class="Waterfall">
    <div class="mask" v-if="activeCard.src">
      <div class="cardDetail">
        <div class="imgContainer">
          <img :src="activeCard.src" alt="" />
        </div>

        <div class="detailInfoContainer">
          <div class="detailInfoContent">安哦我能否你我符号放进去哦发外国文化个人去我非常发额分隔板访问该合同出去吃高人给我去外地去</div>
        </div>
      </div>
    </div>

    <div :id="`card-${index + 1}`" class="card" v-for="index in loadImageTotal" @mousedown="mousedown" @mouseup="mouseup($event, index + 1)">
      <img :src="`${baseUrl}?a=${index}`" alt="" @load="loadedImageCount++" />

      <div class="info">
        <div class="title">安哦我能否你我符号放进去哦发外国文化个人去我非常发额分隔板访问该合同出去吃高人给我去外地去</div>
        <div class="author">@艾瑞莉波</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ColumnsHeightType } from "@/types";
import { AnimeParams } from "animejs";
import anime from "animejs/lib/anime.es";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { registerCardSlideInAnimation } from "@/utils/slideIn.ts";

// 检测系统是否为暗色主题
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
let isDarkTheme = colorSchemeQuery.matches;
colorSchemeQuery.addEventListener("change", (e) => {
  isDarkTheme = e.matches;
});

// 页面resize重新布局的定时器
const timer1 = ref();
// 图片API失效重连定时器
const timer2 = ref();
// 需要加载本地图片的数量
const loadImageTotal = ref<number>(30);
// 加载完成的图片的数量
const loadedImageCount = ref<number>(0);
// 图片API地址
const baseUrlList = ref<string[]>([
  "https://api.yimian.xyz/img",
  "https://img.xjh.me/random_img.php",
  "https://www.dmoe.cc/random.php",
  "https://imgapi.xl0408.top/index.php",
  "https://img.paulzzh.com/touhou/random",
]);
const baseUrl = ref<string>(baseUrlList.value[0]);

// 卡片间距
const cardSpace = ref(20);
// 瀑布流布局信息
const layout = ref<{ width: number; columns: number; transition: number }>({
  // 当前布局下卡片的宽度
  width: 0,
  // 当前布局下有几列
  columns: 1,
  // 重新布局过渡动画时间
  transition: 250,
});
// 瀑布流列高信息
const columnsHeight = ref<ColumnsHeightType>({
  // 最高列的高度
  maxHeight: 0,
  // 最矮列的高度
  minHeight: 0,
  // 最矮列的索引
  minHeightIndex: 0,
  // 当前卡片之前所有卡片的累计高度
  cardTotalHeight: 0,
  // 当前每一列的高度（几个元素就是几列）
  height: [],
});
// 当前打开的卡片的信息
const activeCard = ref({
  index: NaN,
  src: "",
});
// 卡片打开前的图片尺寸位置信息
const originImageBounding = ref();
// 卡片动画对象
const animationToCard = ref();
// 卡片详情信息动画对象
const animationToCardInfo = ref();
// 动画时间
const animationDuration = ref(500);

// 计算当前布局
const calcLayout = (container: HTMLDivElement, space = cardSpace.value, minWidth = 300) => {
  let contentWidth = 0;
  let columns = 1;

  while (contentWidth < container.clientWidth) {
    contentWidth = minWidth * columns + space * (columns - 1);
    if (contentWidth < container.clientWidth) columns++;
  }

  columns -= 1;

  return {
    columns: columns,
    width: (container.clientWidth - (columns - 1) * space) / columns,
    transition: layout.value.transition,
  };
};
// 计算该卡片的定位信息
const calcPosition = (card: HTMLDivElement) => {
  const X = columnsHeight.value.minHeightIndex * (layout.value.width + cardSpace.value);
  const Y = -(columnsHeight.value.cardTotalHeight - columnsHeight.value.minHeight);

  columnsHeight.value.height[columnsHeight.value.minHeightIndex] += card.clientHeight + cardSpace.value;
  columnsHeight.value.maxHeight = Math.max(...columnsHeight.value.height);
  columnsHeight.value.minHeight = Math.min(...columnsHeight.value.height);
  columnsHeight.value.minHeightIndex = columnsHeight.value.height.findIndex((item) => item === columnsHeight.value.minHeight);
  columnsHeight.value.cardTotalHeight += card.clientHeight;
  return {
    X,
    Y,
  };
};
// 重新布局
const reLayout = (resize = false) => {
  const Waterfall = document.querySelector(".Waterfall") as HTMLDivElement;
  const CardList = document.querySelectorAll(".Waterfall .card");

  layout.value = calcLayout(Waterfall as HTMLDivElement);
  for (let i = 0; i < layout.value.columns; i++) {
    columnsHeight.value.height.push(0);
  }

  CardList.forEach((card: any) => {
    if (resize) card.style.transition = `transform ${layout.value.transition / 1000}s`;
    card.style.width = (layout.value?.width || 0) + "px";
    const translate = calcPosition(card as HTMLDivElement);
    card.style.transform = `translate(${translate.X}px, ${translate.Y}px)`;
  });

  Waterfall.style.height = columnsHeight.value.maxHeight - cardSpace.value + "px";

  // 记录重新布局后卡片原始的图片尺寸位置信息
  if (activeCard.value.src) {
    setTimeout(() => {
      const img = document.querySelector(`#card-${activeCard.value.index} img`) as HTMLImageElement;
      const imgBounding = img.getBoundingClientRect();
      originImageBounding.value = imgBounding;
      originImageBounding.value.imgRatio = imgBounding.width / imgBounding.height;
    }, layout.value.transition);
  }
};
// 重置布局信息
const resetLayout = () => {
  layout.value = {
    width: 0,
    columns: 1,
    transition: layout.value.transition,
  };
  columnsHeight.value = {
    maxHeight: 0,
    minHeight: 0,
    minHeightIndex: 0,
    cardTotalHeight: 0,
    height: [],
  };
};

// 处理当卡片只有点击时才触发打开详情，点击拖动时不触发
let startX = 0;
let startY = 0;
const mousedown = (e: MouseEvent) => {
  startX = e.clientX;
  startY = e.clientY;
};
const mouseup = (e: MouseEvent, index: number) => {
  let endX = e.clientX;
  let endY = e.clientY;
  let distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  if (distance < 5) {
    // 在阈值内，取消 click 事件的触发
    e.preventDefault();
    if (e) {
      openCardDetail(index);
    }
  }
};

// 点击卡片时打开详情
const openCardDetail = (index: number) => {
  // 禁止页面滚动
  document.body.style.overflow = "hidden";

  // 设置详情卡片初始尺寸位置
  const img = document.querySelector(`#card-${index} img`) as HTMLImageElement;
  const imgBounding = img.getBoundingClientRect();
  activeCard.value = {
    index,
    src: img.src,
  };
  img.style.opacity = "0";
  nextTick(() => {
    const cardDetail = document.querySelector(".Waterfall .cardDetail") as HTMLDivElement;
    cardDetail.style.top = imgBounding.top + "px";
    cardDetail.style.left = imgBounding.left + "px";
    cardDetail.style.width = imgBounding.width + "px";
    cardDetail.style.height = imgBounding.height + "px";
    originImageBounding.value = imgBounding;
    // 添加卡片打开中的类名，播放圆角css动画
    cardDetail.classList.add("cardDetailOpening");

    // 打开时的动画
    animationToOpen(imgBounding);
  });

  // 设置遮罩样式和点击关闭详情
  setTimeout(() => {
    const mask = document.querySelector(".Waterfall > .mask") as HTMLDivElement;
    if (isDarkTheme) {
      mask.style.backgroundColor = "rgba(0, 0, 0, 0.45)";
    } else {
      mask.style.backgroundColor = "rgba(255, 255, 255, 0.45)";
    }
    mask.style.backdropFilter = "blur(30px)";
    mask.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLDivElement).classList.contains("mask")) closeCardDetail(mask, index);
    });
  }, 0);
};
// 关闭卡片详情
const closeCardDetail = (maskDOM: HTMLDivElement, index: number) => {
  if (isDarkTheme) {
    maskDOM.style.backgroundColor = "rgba(0, 0, 0, 0)";
  } else {
    maskDOM.style.backgroundColor = "rgba(255, 255, 255, 0)";
  }
  maskDOM.style.backdropFilter = "blur(0)";

  // 添加卡片关闭中的类名，播放圆角css动画
  const cardDetail = document.querySelector(".Waterfall .cardDetail") as HTMLDivElement;
  cardDetail.classList.remove("cardDetailOpening");
  cardDetail.classList.add("cardDetailClosing");

  // 关闭时的动画
  animationToClose();

  // 关闭卡片详情
  setTimeout(() => {
    const img = document.querySelector(`#card-${index} img`) as HTMLImageElement;
    img.style.opacity = "1";
    activeCard.value = {
      index: NaN,
      src: "",
    };
    document.body.style.overflow = "auto";
  }, animationDuration.value);
};
// 按Esc键时关闭卡片详情
const registerRemoveMaskOfEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    const mask = document.querySelector(".Waterfall > .mask") as HTMLDivElement;
    closeCardDetail(mask, activeCard.value.index);
  }
};
// 打开时的动画
const animationToOpen = (imgBounding: any) => {
  const cardDetail = document.querySelector(".Waterfall .cardDetail") as HTMLDivElement;
  const img = document.querySelector(".Waterfall .cardDetail img") as HTMLImageElement;
  const cardDetailInfoContainer = document.querySelector(".Waterfall .cardDetail .detailInfoContainer") as HTMLDivElement;

  const imgRatio = imgBounding.width / imgBounding.height;
  const height = window.innerHeight * 0.95;
  let width = height * imgRatio + 420;
  if (width > window.innerWidth * 0.9) {
    img.style.objectFit = "contain";
    width = window.innerWidth * 0.9;
  }
  const top = (window.innerHeight - height) / 2;
  const left = (window.innerWidth - width) / 2;

  // 额外记录图片原始宽高比（resizeCardDetail时使用）
  originImageBounding.value.imgRatio = imgRatio;

  // 卡片动画
  animationToCard.value = anime({
    targets: cardDetail,
    duration: animationDuration.value,
    width,
    height,
    top,
    left,
    easing: "easeOutQuart",
  } as AnimeParams);
  // 卡片信息动画
  animationToCardInfo.value = anime({
    targets: cardDetailInfoContainer,
    duration: animationDuration.value * 0.75,
    width: 420,
    keyframes: [
      {
        opacity: 1,
        color: isDarkTheme ? "rgba(255, 255, 255, 1)" : "rgba(45, 45, 45, 1)",
        delay: animationDuration.value * 0.25,
      },
    ],
    easing: "easeOutQuart",
  } as AnimeParams);
};
// 关闭时的动画
const animationToClose = () => {
  const cardDetail = document.querySelector(".Waterfall .cardDetail") as HTMLDivElement;
  const cardDetailInfoContainer = document.querySelector(".Waterfall .cardDetail .detailInfoContainer") as HTMLDivElement;

  // 卡片动画
  animationToCard.value = anime({
    targets: cardDetail,
    duration: animationDuration.value,
    width: originImageBounding.value.width,
    height: originImageBounding.value.height,
    top: originImageBounding.value.top,
    left: originImageBounding.value.left,
    easing: "easeOutQuart",
  } as AnimeParams);
  // 卡片信息动画
  animationToCardInfo.value = anime({
    targets: cardDetailInfoContainer,
    duration: animationDuration.value * 0.75,
    width: 0,
    opacity: 0,
    color: isDarkTheme ? "rgba(255, 255, 255, 0)" : "rgba(45, 45, 45, 0)",
    easing: "easeOutQuart",
  } as AnimeParams);
};

// 重新计算卡片详情尺寸位置
const resizeCardDetail = () => {
  const cardDetail = document.querySelector(".Waterfall .cardDetail") as HTMLDivElement;
  const img = document.querySelector(".Waterfall .cardDetail img") as HTMLImageElement;

  const imgRatio = originImageBounding.value.imgRatio;
  const height = window.innerHeight * 0.95;
  let width = height * imgRatio + 420;
  if (width > window.innerWidth * 0.9) {
    img.style.objectFit = "contain";
    width = window.innerWidth * 0.9;
  }
  const top = (window.innerHeight - height) / 2;
  const left = (window.innerWidth - width) / 2;

  animationToCard.value = anime({
    targets: cardDetail,
    duration: animationDuration.value,
    width,
    height,
    top,
    left,
    easing: "easeOutQuart",
  } as AnimeParams);
};

// 当所有图片全部加载完时重新布局
watch(
  () => loadedImageCount.value,
  (val) => {
    clearInterval(timer2.value);
    if (val === loadImageTotal.value) {
      reLayout();
      nextTick(() => {
        const domList = document.querySelectorAll(".Waterfall .card");
        domList.forEach((dom) => {
          registerCardSlideInAnimation(dom as HTMLDivElement);
        });
      });
    }
  },
);

onMounted(() => {
  window.addEventListener("resize", () => {
    clearTimeout(timer1.value);
    if (loadedImageCount.value === 0) return;
    timer1.value = setTimeout(() => {
      resetLayout();
      reLayout(true);
      if (activeCard.value.src) resizeCardDetail();
    }, 100);
  });

  window.addEventListener("keydown", registerRemoveMaskOfEscape);

  // 当图片API地址失效时重试其他API
  let retryCount = 0;
  timer2.value = setInterval(() => {
    retryCount++;
    if (retryCount === baseUrlList.value.length) return clearInterval(timer2.value);
    if (!loadedImageCount.value) baseUrl.value = baseUrlList.value[retryCount];
    if (retryCount >= baseUrlList.value.length - 1) return clearInterval(timer2.value);
  }, 3000);
});
onUnmounted(() => {
  clearTimeout(timer1.value);
  window.removeEventListener("keydown", registerRemoveMaskOfEscape);
});
</script>

<style scoped lang="scss">
.Waterfall {
  width: 60vw;

  .card {
    width: 0;
    background-color: #181818;
    border-radius: 16px;
    overflow: hidden;
    backdrop-filter: blur(16px);
    position: relative;

    img {
      cursor: pointer;
    }

    .info {
      text-align: left;
      padding: 12px 16px;

      .title {
        color: #cac8c5;
        overflow: hidden;
        display: -webkit-box;
        word-break: break-all;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 6px;
      }

      .author {
        color: #979698;
      }
    }
  }

  .cardDetail {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    display: flex;
    background-color: #0e0f0f;
    border-radius: 16px 16px 16px 16px;
    overflow: hidden;

    .imgContainer {
      flex: 1;

      img {
        height: 100%;
      }
    }

    .detailInfoContainer {
      width: 0;
      color: rgba(255, 255, 255, 0);
      opacity: 0;
      position: relative;

      .detailInfoContent {
        width: calc(420px - 20px * 2);
        padding: 16px 20px;
      }

      &:before {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        background-color: #1b1b1b;
      }
    }

    &.cardDetailOpening {
      animation: cardDetailOpening 0.15s ease-in-out forwards;
    }

    &.cardDetailClosing {
      animation: cardDetailClosing 0.5s ease-in-out forwards;
    }
  }
}

@keyframes cardDetailOpening {
  from {
    border-radius: 16px 16px 0 0;
  }
  to {
    border-radius: 16px 16px 16px 16px;
  }
}
@keyframes cardDetailClosing {
  from {
    border-radius: 16px 16px 16px 16px;
  }
  to {
    border-radius: 16px 16px 0 0;
  }
}

@media (prefers-color-scheme: light) {
  .Waterfall {
    .card {
      background-color: #f1f1f1 !important;

      .title {
        color: #484848 !important;
      }

      .author {
        color: #2d2d2d !important;
      }
    }

    .mask {
      background-color: rgba(255, 255, 255, 0.45);

      .cardDetail {
        background-color: #f1f1f1 !important;

        .detailInfoContainer {
          color: rgba(45, 45, 45, 1);

          &:before {
            background-color: #e7e7e7 !important;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
body:has(.Waterfall) {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
