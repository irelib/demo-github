<script setup lang="ts">
// 歌词字符串
import { onMounted } from "vue";

const lyricsString = `[00:00.00]作词 : 艾福杰尼
[00:01.00]作曲 : 艾福杰尼
[00:15.61]I'm so sorry about that
[00:17.24]I can’t give up on that
[00:19.07]You can say what u like
[00:20.99]不痛不痒发呆
[00:22.89]不开心 可以不听 废话我选择不听
[00:26.61]我要把音乐开最大声  犯唱歌跳舞病
[00:30.54]till i die till i die ……
[00:36.17]I am so sorry 我要唱歌 till i die
[00:39.88]till i die till i die
[00:43.66]I am so sorry 我要
[00:46.14]Sorry about that我们始终还在追逐
[00:47.94]Sorry about that没有时间一一回复
[00:49.85]Sorry about that电话还是无法接通
[00:51.72]Sorry about that无法阻止演出结束
[00:53.61]I am sorry about that
[00:54.65]I am sorry about that
[00:55.42]I am sorry about that 我们作品不分好坏
[00:57.42]每个敏感词汇每个刺耳旋律每个不屑口气
[00:59.55]让你听完气的只想倒带 ha
[01:02.29]Trippy again
[01:04.05]sing for my Fans
[01:05.92]都说我太啰嗦rapper的废话像拉拉拉面
[01:09.72]sorry again
[01:11.47]这原因太简单
[01:13.43]我单纯的做音乐都会被莫名其妙琐事为难
[01:16.56]sorry about that聚会一直打手机
[01:18.15]and i sorry about that 慢慢开始变得无趣
[01:19.98]当我经历过这一切变得更加急切
[01:21.64]明显打了鸡血发现因为时间嘀嗒嗒嘀嗒嘀
[01:23.95]yo man 我不可能站着不动
[01:25.59]我的cd机还是请你别碰
[01:27.65]sorry忘记我们现在都用流媒体
[01:29.44]对这首歌的感情可以写在留言里
[01:31.52]Sorry about the future
[01:32.51]i dont need u help
[01:33.33]Sorry about my selfish
[01:34.18]Sorry 没想好
[01:35.25]Sorry about my hater
[01:36.18]You can’t pay the bill
[01:37.11]my new watch ，Pristine jewelry shop
[01:39.05]最难做的事当属抽时间 现在
[01:41.17]上海那场为何忍不住的哭 见怪
[01:43.05]很多的误会 不经意的掩盖
[01:44.62]吝啬的抱歉是问题的潜在
[01:46.55]sorry  不好意思还是对不起
[01:48.36]sorry总是带着笑脸内心骗自己
[01:50.31]sorry一直爱你却说一直不喜欢
[01:52.19]sorry做了大事因为简单不一般
[01:54.11]sorry总有一天会凉 就算你在烫
[01:55.96]sorry被迫戴上皇冠感觉太亮
[01:57.89]所以我想小火在慢炖
[01:59.64]目标得奖 而不是战胜
[02:02.58]You working so hard why you sorry for it
[02:06.26]You working so hard why you sorry for it
[02:10.02]You working so hard why you sorry for it
[02:14.19]why you  why you sorry for it
[02:16.55]I am so sorry about that
[02:18.18]you can hate me on that
[02:19.99]I am so sorry about that
[02:21.88]you can say what u like
[02:23.80]不开心 我选择不听 谁我都不信
[02:27.60]一辈子都握着麦克风可能这是我的命
[02:31.47]till i die……
[02:37.20]就算最后一个人去paradise
[02:40.88]till i die till i die paradise
[02:44.65]可能自私某天也会精彩
[02:48.50]ttill i die……
[02:52.35]可能自私某天也会精彩
[02:55.98]till i die……
[02:59.75]就算一个人去paradise
[03:02.18]sorry学会说了实话惹的事端 and
[03:04.04]sorry用了太多 太多的双关
[03:05.93]偶像的光环还是 行业的皇冠
[03:07.75]站在机场等待 无尽的航班
[03:09.66]是背后的叹气换来台前的狂欢
[03:11.56]有跟着唱的就有不理解的旁观
[03:13.53]不断的切换从网络到场馆
[03:15.35]从白天到黑夜从凌晨到傍晚
[03:17.24]wo
[03:18.14]现在又是几个战队
[03:20.08]难不难过 后不后悔
[03:21.95]没别的意思根本不想斗嘴
[03:23.45]之前带我父母看了我演唱会
[03:25.76]想起巡演跑断了腿
[03:27.63]基本没赚每站都赔
[03:29.54]但我相信最闪亮的烟火绽放
[03:31.04]需要我们费点口水
[03:33.50]失败就再来过
[03:35.18]sorry会经常说
[03:37.06]废话都快带过
[03:38.95]困境都快摆脱
[03:40.82]And what u sorry for
[03:42.68]你不必再自责
[03:44.68]成功的Passport
[03:46.54]That's what i Fight for
[04:02.45]I am so sorry about that
[04:03.97]you can hate me on that
[04:05.85]I am so sorry about that
[04:07.73]you can say what u like
[04:09.65]不开心 我选择不听 谁我都不信
[04:13.42]一辈子都握着麦克风可能这是我的命
[04:17.26]till i die……
[04:22.97]就算最后一个人去paradise
[04:26.68]till i die till i die paradise
[04:30.49]可能自私某天也会精彩
[04:35.07]混音：rollpitch
[04:36.58]出品：DMOB沙漠兄弟工作室
[04:38.28]发行：自在天浩
`;

// 歌词对象数组
const lyricsList = parseLrcString(lyricsString);

// 中间行
const centerIndex = 8;
// 是否开启歌词滚动
let lyricsScrollFlag = true;
// 当前高亮行
let activeIndex = 0;
// 用户选中行
let selectedActiveIndex = 0;
// 上一次用户选中行
let lastSelectedActiveIndex = 0;

const registerEvents = () => {
  const audio = document.querySelector("audio") as HTMLAudioElement;
  const lyricsContainer = document.querySelector(".lyricsContainer") as HTMLDivElement;
  const lyricsBox = document.querySelector(".box") as HTMLDivElement;
  const lyricsRowList = document.querySelectorAll(".box div");

  audio.volume = 0.1;
  audio.addEventListener("timeupdate", (e: any) => {
    const currentTime = e.target.currentTime;
    activeIndex = lyricsList.findIndex((item) => currentTime < item.time);
    selectedActiveIndex ? (activeIndex = selectedActiveIndex) : null;
    lyricsRowList.forEach((item) => item.classList.remove("active"));
    lyricsRowList[(activeIndex > 0 ? activeIndex : lyricsRowList.length) - 1].classList.add("active");
    if (!lyricsScrollFlag) return;
    if (activeIndex >= centerIndex) {
      lyricsBox.style.transform = `translateY(-${(activeIndex - centerIndex) * 46}px)`;
    }
    selectedActiveIndex = 0;
  });

  lyricsContainer.addEventListener("mouseleave", () => {
    setTimeout(() => (lyricsScrollFlag = true), 1000);
  });
  lyricsContainer.addEventListener("wheel", (e: any) => {
    lyricsScrollFlag = false;
    lyricsBox.style.transition = "all 0.2s";
    const currentTransformY = lyricsBox.style.transform.substring(11) || 0;
    let newTransformY = Number.parseInt(currentTransformY + "") - e.deltaY;
    if (newTransformY < -(lyricsRowList.length - 15) * 46) {
      newTransformY = -(lyricsRowList.length - 15) * 46;
    } else if (newTransformY >= 0) {
      newTransformY = 0;
    } else if (newTransformY === -(lyricsRowList.length - 15) * 46) return;
    lyricsBox.style.transform = `translateY(${newTransformY}px)`;
    lyricsBox.clientWidth;
    lyricsBox.style.transition = "all 0.5s";
  });
  lyricsContainer.addEventListener("click", async (e: any) => {
    lyricsRowList.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
    selectedActiveIndex = e.target.dataset.index ?? lastSelectedActiveIndex;
    lastSelectedActiveIndex = selectedActiveIndex;
    audio.currentTime = lyricsList[selectedActiveIndex - 1].time;
    await audio.play();
    lyricsScrollFlag = true;
  });
};

/**
 * 解析歌词字符串，返回歌词对象数组
 * @param lrcString 歌词字符串
 */
function parseLrcString(lrcString: string) {
  const lrc: { time: number; text: string }[] = [];
  let lineList = lrcString.split("\n");
  lineList = lineList.filter((item) => item.length > 0);
  lineList.forEach((item) => {
    const [minutes, seconds, milliseconds] = item.substring(1, 9).split(/[:.]/);
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds) + parseFloat("0." + milliseconds);
    const itemObj = {
      time: totalSeconds,
      text: item.substring(10),
    };
    lrc.push(itemObj);
  });
  return lrc;
}

onMounted(() => {
  registerEvents();
});
</script>

<template>
  <div class="LyricsScroll">
    <audio src="/src/assets/艾福杰尼%20-%20SORRY.mp3" controls></audio>

    <div class="lyricsContainer">
      <div class="box">
        <div v-for="(item, index) in lyricsList" :data-index="index + 1">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.LyricsScroll {
  width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(50vh - 385px);

  audio {
    width: 500px;
  }

  .lyricsContainer {
    width: 100%;
    height: 690px;
    overflow: hidden;
    margin-top: 25px;

    .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translateY(0);
      transition: all 0.5s;

      div {
        width: 100%;
        text-align: center;
        color: #4d4d4d;
        font-size: 22px;
        height: 46px;
        flex-shrink: 0;
        line-height: 46px;
        -webkit-user-select: none;
        border-radius: 6px;
        cursor: pointer;
        filter: blur(0px);
        transition:
          all 0.7s,
          background-color 0.35s;

        &:hover {
          color: #cbcbcb;
          background-color: #2d2d2d;
        }
      }

      .active {
        color: #cbcbcb;
        font-size: 24px;
      }
    }
  }
}

@media (prefers-color-scheme: light) {
  .lyricsContainer .box div {
    color: #b1b1b1 !important;

    &:hover {
      color: #2d2d2d !important;
      background-color: #ebebeb !important;
    }

    &.active {
      color: #2d2d2d !important;
    }
  }
}
</style>
