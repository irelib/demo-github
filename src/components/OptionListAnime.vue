<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import anime from "animejs/lib/anime.es";

const showList = ref(false);
const animation = ref();

const setAnimation = () => {
  const divs = document.querySelectorAll(".box div");

  animation.value = anime({
    targets: divs,
    duration: 1300,
    translateY: [100, 0],
    opacity: [0, 1],
    delay: anime.stagger(50),
    autoplay: false,
  });
};

onMounted(() => {
  const animeBtn = document.querySelector(".animeBtn") as HTMLElement;

  animeBtn.addEventListener("click", () => {
    showList.value = !showList.value;
    nextTick(() => animation.value.play());
  });

  setAnimation();
});
</script>

<template>
  <div class="OptionListAnime">
    <button class="animeBtn">{{ showList ? "hide" : "show" }}</button>

    <div class="box" v-show="showList">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.OptionListAnime {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 500px;
  height: 100%;

  .animeBtn {
    position: absolute;
    top: 10px;
    left: 0;
  }

  .box {
    display: flex;
    flex-direction: column;
    gap: 12px;

    div {
      width: 500px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      border: 2px solid #191b1d;
      border-radius: 6px;
      background-color: #1e1f22;
      opacity: 0;
    }
  }
}

@media (prefers-color-scheme: light) {
  .OptionListAnime .box div {
    border: 2px solid #cbcbcb !important;
    background-color: #ebebeb !important;
  }
}
</style>
