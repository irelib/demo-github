import { registerCardSlideInAnimation } from '@/utils/slideIn.ts';
import { App, DirectiveBinding } from 'vue';

type Binding = DirectiveBinding & {
	value: {
		// 初始偏移距离
		distance: number;
		// 动画时间
		duration: number;
	};
};

export const slideIn = (app: App) => {
	app.directive('slideIn', {
		mounted(el: HTMLElement, binding: Binding) {
			registerCardSlideInAnimation(el, binding?.value?.distance, binding?.value?.duration);
		},
	});
};
