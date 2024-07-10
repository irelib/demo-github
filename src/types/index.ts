export type ColumnsHeightType = {
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
