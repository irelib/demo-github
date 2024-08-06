// 协作组成
const CollaborationComposition = {
	// 沟通
	Communication: 1,
	// 反馈
	Feedback: 1,
	// 诚信
	Integrity: 1,
	// 服务
	Service: 1,
	// 创新
	Innovation: 1,
};
// 个人绩效组成
const PersonalPerformanceComposition = {
	// 产出
	Outputs: 1,
	// 质量
	Quality: 1,
	// 协作
	// Collaboration:
	// 	(CollaborationComposition.Communication +
	// 		CollaborationComposition.Feedback +
	// 		CollaborationComposition.Integrity +
	// 		CollaborationComposition.Service +
	// 		CollaborationComposition.Innovation) /
	// 	5,
	Collaboration:
		Object.keys(CollaborationComposition).reduce((prev, prop) => {
			return CollaborationComposition[prop] + prev;
		}, Number('')) / Object.keys(CollaborationComposition).length,
};

// 每月加班次数
const OvertimePerMonth = 8;
// 综合团队绩效
const IntegratedTeamPerformance = 1;

// 个人绩效
const PersonalPerformance =
	PersonalPerformanceComposition.Outputs * 0.5 + PersonalPerformanceComposition.Quality * 0.3 + PersonalPerformanceComposition.Collaboration * 0.2;
// 个人时间投入
const PersonalTimeCommitment = OvertimePerMonth * 0.025 + 0.6;
// 综合个人绩效
const IntegratedPersonalPerformance = PersonalPerformance * 0.7 + PersonalTimeCommitment * 0.3;

// 最终绩效
const FinalPerformance = (IntegratedPersonalPerformance + IntegratedTeamPerformance) / 2;

console.log(FinalPerformance);
