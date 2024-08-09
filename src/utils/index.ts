import { ref } from 'vue';

// 常用颜色数组
export const colorList = ['#e59191', '#dbc585', '#69c09b', '#b199e4', '#d760a8', '#afca66', '#5aa497', '#5e84e4', '#d7a076', '#71b968'];

// 导入静态资源，返回完整路径
export const importAssetsFile = (url: string) => {
	if (url.startsWith('/')) throw new Error('路径从根目录开始，不能以/开头');
	return new URL(`../${url}`, import.meta.url).href;
};

// 将元素的transform字符串转换成对象形式
export const transformToValue = (transform: string): TransformToValueType => {
	let transformObj: TransformToValueType = {
		x: 0,
		y: 0,
	};
	if (!transform) return transformObj;
	transform = transform.replace('translate', '');
	transform = transform.replace('(', '');
	transform = transform.replace(')', '');
	const transformArray = transform.split(',');
	transformObj = {
		x: parseFloat(transformArray[0]),
		y: parseFloat(transformArray[1]),
	};
	return transformObj;
};

// 获取组件实例
export const useCompRef = <T extends abstract new (...args: any) => any>(_Component: T) => {
	return ref<InstanceType<T>>();
};

// 生成视频预览图
export async function generateVideoThumbnails(videoFile: File, config: VideoThumbnailsConfig = {}): Promise<File> {
	const { row = 10, col = 10, download = false, imageType = 'png', imageMaxSize = 1024, thumbnailsMinLength = 100 } = config;
	imageMaxSize;

	let fileName = videoFile.name.split('.')[0];
	while (fileName.includes('  ')) {
		fileName = fileName.replace('  ', ' ');
	}
	while (fileName.includes(' ') || fileName.includes('@')) {
		fileName = fileName.replace(' ', '_');
		fileName = fileName.replace('@', '_');
	}

	const video = document.createElement('video');
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('获取canvas失败');
	}

	video.src = URL.createObjectURL(videoFile);

	await new Promise<void>((resolve) => {
		video.onloadedmetadata = () => {
			resolve();
		};
	});

	const videoWidth = video.videoWidth;
	const videoHeight = video.videoHeight;
	const shortSide = Math.min(videoWidth, videoHeight);
	const scaleRatio = thumbnailsMinLength / shortSide;

	const frameWidth = Math.round(videoWidth * scaleRatio);
	const frameHeight = Math.round(videoHeight * scaleRatio);

	canvas.width = frameWidth * col;
	canvas.height = frameHeight * row;

	const totalFrames = row * col;
	const duration = video.duration;
	const interval = duration / totalFrames;

	for (let i = 0; i < totalFrames; i++) {
		const time = i * interval;
		await new Promise<void>((resolve) => {
			video.currentTime = time;
			video.onseeked = () => {
				const x = (i % col) * frameWidth;
				const y = Math.floor(i / col) * frameHeight;
				ctx.drawImage(video, 0, 0, videoWidth, videoHeight, x, y, frameWidth, frameHeight);
				resolve();
			};
		});
	}

	const mimeType = imageType.toLowerCase() === 'jpeg' ? 'image/jpeg' : 'image/png';
	const fileExtension = mimeType.split('/')[1];

	return new Promise<File>((resolve) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				throw new Error('在canvas中生成Blob失败');
			}
			const thumbnailsFileName = `thumbnails_${fileName}@row=${row}&col=${col}.${fileExtension}`;
			const previewFile = new File([blob], thumbnailsFileName, { type: mimeType });

			if (download) {
				const link = document.createElement('a');
				link.href = URL.createObjectURL(previewFile);
				link.download = thumbnailsFileName;
				link.click();
			}

			resolve(previewFile);
		}, mimeType);
	});
}
