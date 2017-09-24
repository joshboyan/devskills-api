const averageSkill = (total, length) => {
	return {
		name: total.name,
		stackOverflow: Math.round(total.stackOverflow / length),
		indeed: Math.round(total.indeed / length),
		twitter: Math.round(total.twitter / length)
	}
}

module.exports = averageSkill;
