export const colorList = ["#e59191", "#dbc585", "#69c09b", "#b199e4", "#d760a8", "#afca66", "#5aa497", "#5e84e4", "#d7a076", "#71b968"];

// 导入静态资源，返回完整路径
export const importAssetsFile = (url: string) => {
  if (url.startsWith("/")) throw new Error("路径从根目录开始，不能以/开头");
  return new URL(`../${url}`, import.meta.url).href;
};
