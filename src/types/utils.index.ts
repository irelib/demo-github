type TransformToValueType = {
	// translateX值
	x: number;
	// translateY值
	y: number;
};

type VideoThumbnailsConfig = {
	// 每行显示的缩略图数量
	row?: number;
	// 每列显示的缩略图数量
	col?: number;
	// 缩略图生成完成后是否立刻下载
	download?: boolean;
	// 预览图文件的格式
	imageType?: 'png' | 'jpeg';
	// 预览图文件的最大大小（单位：kb）
	imageMaxSize?: number;
	// 每张缩略图短边的最小长度（单位：px）
	thumbnailsMinLength?: number;
};
