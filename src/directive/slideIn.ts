import { App, DirectiveBinding } from "vue";

type Binding = DirectiveBinding & {
  value: {
    // 初始偏移距离
    distance: number;
    // 动画时间
    duration: number;
  };
};

export const slideIn = (app: App) => {
  // 元素与其动画对象的映射关系
  const map = new WeakMap();

  // 元素是否在视口下面
  function isBelowViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    // 元素上边框位置大于视口高度
    return rect.top > window.innerHeight;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // 元素进入视口时
      if (entry.isIntersecting) {
        // 获取该元素的动画对象
        const animation = map.get(entry.target) as Animation;
        // 播放动画
        animation && animation.play();
        // 播放完就停止观察元素：一个元素只能播放一次动画
        observer.unobserve(entry.target);
      }
    });
  });

  app.directive("slideIn", {
    mounted(el: HTMLElement, binding: Binding) {
      // 元素在视口内及上面时不做任何处理，即不需要动画效果
      if (!isBelowViewport(el)) return;

      const animation = el.animate(
        [
          {
            transform: `translateY(${binding?.value?.distance || 80}px)`,
            opacity: 0.3,
          },
          {
            transform: "translateY(0)",
            opacity: 1,
          },
        ],
        {
          duration: binding?.value?.duration || 500,
          easing: "ease-out",
        },
      );
      // 首先暂停动画
      animation.pause();
      // 将元素与其动画对象设置映射，方便后续使用它的动画对象
      map.set(el, animation);
      // 观察元素是否进入视口
      observer.observe(el);
    },
  });
};
