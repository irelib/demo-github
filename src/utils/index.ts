// 常用颜色数组
export const colorList = ['#e59191', '#dbc585', '#69c09b', '#b199e4', '#d760a8', '#afca66', '#5aa497', '#5e84e4', '#d7a076', '#71b968'];

// 导入静态资源，返回完整路径
export const importAssetsFile = (url: string) => {
	if (url.startsWith('/')) throw new Error('路径从根目录开始，不能以/开头');
	return new URL(`../${url}`, import.meta.url).href;
};

// 将元素的transform字符串转换成对象形式
export const transformToValue = (transform: string): transformToValueType => {
	let transformObj: transformToValueType = {
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
