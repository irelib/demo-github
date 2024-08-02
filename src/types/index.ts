export type WaterfallLayoutType = {
	// 当前布局下卡片的宽度
	width: number;
	// 当前布局下有几列
	columns: number;
	// 重新布局过渡动画时间
	transition: number;
};

export type WaterfallColumnsHeightType = {
	// 最高列的高度
	maxHeight: number;
	// 最矮列的高度
	minHeight: number;
	// 最矮列的索引
	minHeightIndex: number;
	// 当前卡片之前所有卡片的累计高度
	cardTotalHeight: number;
	// 当前每一列的高度（几个元素就是几列）
	height: number[];
};
