function aggregateSkill(skillName, counts) {
	const requested = [].concat.apply([], counts.map(count =>{
		return count.skills.filter( skill => {
			return skill.name === skillName;
		});
	}));

	const initialValue = {
		name: skillName,
		stackOverflow: 0,
		indeed: 0,
		twitter: 0
	}
	const aggregate = requested.reduce( (accumulator, currentValue) => {
		return {
			name: skillName,
			stackOverflow: accumulator.stackOverflow += currentValue.stackOverflow,
			indeed: accumulator.indeed += currentValue.indeed,
			twitter: accumulator.twitter += currentValue.twitter
		}
	}, initialValue);

	return aggregate;
}

module.exports = aggregateSkill;
