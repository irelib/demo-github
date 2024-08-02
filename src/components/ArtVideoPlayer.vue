<template>
	<div class="ArtVideoPlayer" style="width: 800px; height: 600px"></div>
</template>

<script setup lang="ts">
import Artplayer from 'artplayer';
import { onMounted } from 'vue';

const controls = {
	// 功能：画中画
	pip: true,
	// 功能：截图
	screenshot: true,
	// 功能：移动端长按加速
	fastForward: true,
	// 功能：进度记忆
	autoPlayback: true,
	// 功能：隔空投送
	airplay: true,
	// 功能：迷你进度条（仅在播放中且控制栏收起时显示）
	miniProgressBar: true,
	// 功能：全屏
	fullscreen: true,
	// 功能：网页全屏
	fullscreenWeb: true,
	// 效果：弹出层模糊效果
	backdrop: true,
};

const settings = {
	// 设置项：画面翻转
	flip: true,
	// 设置项：播放速度
	playbackRate: true,
	// 设置项：画面比例
	aspectRatio: true,
	// 设置项：字幕偏移
	subtitleOffset: true,
};

onMounted(() => {
	const art = new Artplayer({
		container: '.ArtVideoPlayer',
		url: 'https://artplayer.org/assets/sample/video.mp4',
		...controls,
		...settings,
		// 是否显示设置按钮
		setting: true,
		// 自定义设置项
		settings: [
			{
				html: '设置项标题1',
				width: 250,
				tooltip: '设置项说明',
				icon: '<img src="/src/assets/play.svg" alt="">',
				selector: [
					{
						default: true,
						html: '<span>option 01</span>',
					},
					{
						html: '<span>option 02</span>',
					},
					{
						html: '<span>option 03</span>',
						aaa: '123',
						selector: [
							{
								html: 'option 03-00',
								switch: true,
							},
							{
								html: '<span>option 03-01</span>',
							},
							{
								html: '<span>option 03-02</span>',
							},
						],
						// 只控制第二层级的选项
						onSelect: (item, dom, event) => {
							item;
							dom;
							event;
							console.log(art);
							return '替换tooltip';
						},
					},
				],
				// 只控制第一层级的选项
				onSelect: (item, dom, event) => {
					item;
					dom;
					event;
					console.log(art);
					return '替换tooltip';
				},
			},
			{
				html: '设置项标题2',
				width: 250,
				tooltip: '设置项说明',
				switch: false,
				onSwitch: (item, dom, event) => {
					item;
					dom;
					event;
					item.tooltip = item.switch ? '关' : '开';
					// 返回选项的布尔状态
					return !item.switch;
				},
			},
			{
				html: '设置项标题3',
				width: 250,
				tooltip: '设置项说明',
				// value, min, max, step
				range: [60, 0, 100, 1],
				// 变化时触发
				onChange: (item, dom, event) => {
					item;
					dom;
					event;
					// 返回选项的布尔状态
					return item.range;
				},
				// 完成变化时触发
				onRange: (item, dom, event) => {
					item;
					dom;
					event;
					art.notice.show = `播放速度已设置为 ${item.range}s`;
					setTimeout(() => {
						art.notice.show = '';
					}, 1000);
					return item.range + 's';
				},
			},
		],
		// 自定义控制栏
		controls: [
			{
				name: 'btn1',
				// 同一位置的按钮按index由小到大从左向右排序
				index: 1,
				position: 'right',
				html: '<img src="/src/assets/play.svg" style="width: 24px;height: 24px;" alt="">',
				tooltip: '按钮1的tooltip',
				// 禁用后会消失不见
				disable: false,
				click: (item, event) => {
					item;
					event;
				},
				mounted: (dom) => {
					dom;
				},
			},
			{
				name: 'btn2',
				index: 2,
				position: 'right',
				html: '自定义按钮',
				style: {
					marginRight: '10px',
				},
			},
			{
				name: 'btn3',
				position: 'right',
				html: 'Subtitle',
				selector: [
					{
						default: true,
						html: '<span>subtitle 01</span>',
					},
					{
						html: '<span>subtitle 02</span>',
					},
				],
				onSelect: (item, dom) => {
					item;
					dom;
					return '选项' + item.html;
				},
			},
		],
		// 自定义右键菜单
		contextmenu: [
			{
				html: '按钮',
			},
		],
		// 进度条预览图
		thumbnails: {
			// 缩略图（很多小预览图拼接成的一张大图）
			url: '/src/assets/thumbnails2.png',
			// 缩略图中，小预览图的总数
			number: 60,
			// 缩略图中，每行小预览图的数量
			column: 10,
			// 计算后单张小预览图的宽度（不写会自动计算）
			width: 160,
			// 计算后单张小预览图的高度（不写会自动计算）
			height: 90,
		},
	});

	art.on('ready', () => {});
});
</script>

<style scoped lang="scss">
.ArtVideoPlayer {
	margin-top: calc(50vh - 300px);
	border-radius: 8px;
	overflow: hidden;
}
</style>
