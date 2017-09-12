const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
	name: 'String',
	resource:[
		{
			url: {
				type:[
					{
						submittedBy: {
						type: String,
						required: true
						},
						verified: {
						type: Boolean,
						default: false
						},
						upvotes: Number,
						downvotes: Number
					}
				],
				required: true,
				unique: true
			}		
		}
	]
});

const ResourceModel = mongoose.model('resources', ResourceSchema);

module.exports = ResourceModel;

/**
 * {
  name: 'String',
  resource:[
    {
      url: 'https://goodResource.com',
      submittedBy: 'username@email.com',
      verified: false,
      upvotes: 6,
      downvotes: 3
    }
  ],
}
 */