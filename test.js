const counts = [
    {
        "_id": "59bc3cdd8474a60b1cf5ac0e",
        "__v": 0,
        "skills": [
            {
                "name": "javascript",
                "stackOverflow": 1471335,
                "indeed": 433,
                "twitter": 187,
                "_id": "59bc3cdd8474a60b1cf5ac72"
            },
            {
                "name": "java",
                "stackOverflow": 1312646,
                "indeed": 552,
                "twitter": 62,
                "_id": "59bc3cdd8474a60b1cf5ac71"
            },
            {
                "name": "c#",
                "stackOverflow": 1136582,
                "indeed": 72,
                "twitter": 0,
                "_id": "59bc3cdd8474a60b1cf5ac70"
            }
        ]
    },
    {
        "_id": "59bc3cdd8474a60b1cf5ac0e",
        "__v": 0,
        "skills": [
            {
                "name": "javascript",
                "stackOverflow": 1471335,
                "indeed": 433,
                "twitter": 187,
                "_id": "59bc3cdd8474a60b1cf5ac72"
            },
            {
                "name": "java",
                "stackOverflow": 1312646,
                "indeed": 552,
                "twitter": 62,
                "_id": "59bc3cdd8474a60b1cf5ac71"
            },
            {
                "name": "c#",
                "stackOverflow": 1136582,
                "indeed": 72,
                "twitter": 0,
                "_id": "59bc3cdd8474a60b1cf5ac70"
            }
        ]
    }
]
counts.map(count =>{
  return count.skills.filter( skill => {
    return skill.name === 'javascript';
  });
});
function reduceIt(skillName) {
const requested = [].concat.apply([], counts.map(count =>{
  return count.skills.filter( skill => {
    return skill.name === skillName;
  });
}));

let initialValue = {
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
			//console.log(aggregate);
      return aggregate;
}

var total = counts[0].skills.map(skill => {
  return reduceIt(skill.name);
});

console.log(total);