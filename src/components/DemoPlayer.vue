<template>
	<input type="file" @change="change"></input>
	<div class="DemoPlayer" style="width: 800px; height: 600px"></div>
</template>

<script setup lang="ts">
import ArtPlayer from 'artplayer';
import { onMounted, onUnmounted } from 'vue';
import { generateVideoThumbnails } from '@/utils';

// 设置功能
const settings = {
	// 设置项：画面翻转
	flip: true,
	// 设置项：播放速度
	playbackRate: true,
	// 设置项：画面比例
	aspectRatio: true,
};

// 控制功能
const controls = {
	// 功能：画中画
	pip: true,
	// 功能：进度记忆
	autoPlayback: true,
	// 功能：迷你进度条（仅在播放中且控制栏收起时显示）
	miniProgressBar: true,
	// 功能：全屏
	fullscreen: true,
	// 功能：网页全屏
	fullscreenWeb: true,
	// 效果：弹出层模糊效果
	backdrop: true,
};

// 其他配置
const otherConfig = {
	// 自动播放
	autoplay: true,
	// 主题色
	theme: '#F59A23',
};

// 播放器实例
let art: InstanceType<typeof ArtPlayer>;

// 初始化播放器
const initPlayer = () => {
	art = new ArtPlayer({
		container: '.DemoPlayer',
		id: 'DemoPlayer',
		url: 'https://artplayer.org/assets/sample/video.mp4',
		// 是否显示设置按钮
		setting: true,
		...settings,
		...controls,
		...otherConfig,
		// 视频画质
		quality: [
			{
				html: '超清',
				url: 'https://artplayer.org/assets/sample/video.mp4',
			},
			{
				html: '高清',
				url: 'https://artplayer.org/assets/sample/video.mp4',
			},
			{
				default: true,
				html: '标清',
				url: 'https://artplayer.org/assets/sample/video.mp4',
			},
		],
		// 进度条预览图
		thumbnails: {
			// 预览图（很多小缩略图拼接成的一张大图）
			url: '/src/assets/thumbnails_video@row=10&col=10.png',
			// 缩略图中，小预览图的总数
			number: 100,
			// 缩略图中，每行小预览图的数量
			column: 10,
		},
	});

	// 播放器准备就绪时触发
	art?.on('ready', () => {
		// 视频跳转到5秒处
		art.seek = 5;
	});

	setTimeout(() => {
		console.log({
			// 当前播放时间
			currentTime: art?.currentTime,
			// 当前播放进度（如0.3指播放了30%）
			progress: (art?.currentTime || 0) / (art?.duration || 0) || 0,
		});

		// 变更视频画质列表
		art.quality = [
			{
				html: '4K',
				url: 'https://artplayer.org/assets/sample/video.mp4',
			},
			{
				html: '1080P',
				url: 'https://artplayer.org/assets/sample/video.mp4',
			},
			{
				default: true,
				html: '720P',
				url: 'https://artplayer.org/assets/sample/video.mp4',
			},
		];
	}, 5000);
};

const change = async (e:any) => {
	const file = e.target.files[0];
	const res = await generateVideoThumbnails(file)
	console.log(res);
};

onMounted(() => {
	initPlayer();
});

onUnmounted(() => {
	art?.destroy();
});
</script>

<style scoped lang="scss">
.DemoPlayer {
	margin-top: calc(50vh - 300px);
	border-radius: 8px;
	overflow: hidden;
}
</style>
