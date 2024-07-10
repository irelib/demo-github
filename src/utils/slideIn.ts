import { transformToValue } from "@/utils/index.ts";

// 元素与其缓入动画对象的映射关系
let slideInMap = new WeakMap();

// 元素是否在视口下面
const isBelowViewport = (DOM: HTMLDivElement) => {
  const domBounding = DOM.getBoundingClientRect();
  // 元素上边框位置大于视口高度
  return domBounding.top > window.innerHeight;
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 元素进入视口时
    if (entry.isIntersecting) {
      // 获取该元素的动画对象
      const animation = slideInMap.get(entry.target) as Animation;
      // 播放动画
      animation && animation.play();
      // 播放完就停止观察元素：一个元素只能播放一次动画
      observer.unobserve(entry.target);
    }
  });
});

// 给卡片注册缓入动画
export const registerCardSlideInAnimation = (DOM: HTMLDivElement, distance = 80, duration = 500) => {
  // 元素在视口内及上面时不做任何处理，即不需要动画效果
  if (!isBelowViewport(DOM)) return;

  // 卡片原始的transformY值
  const transform = transformToValue(DOM.style.transform);
  // 卡片偏移后的transformY值
  const finallyDistance = transform.y + distance;

  const animation = DOM.animate(
    [
      {
        transform: `translate(${transform.x}px, ${finallyDistance}px)`,
        opacity: 0,
      },
      {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: 1,
      },
    ],
    {
      duration: duration,
      easing: "ease-out",
    },
  );
  // 首先暂停动画
  animation.pause();
  // 将元素与其动画对象设置映射，方便后续使用它的动画对象
  slideInMap.set(DOM, animation);
  // 观察元素是否进入视口
  observer.observe(DOM);
};
