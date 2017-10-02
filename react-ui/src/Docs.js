import React from 'react';
import PropTypes from 'prop-types';
import { Form } from './Form';

export const Docs = ({ selected, updateSideNavLinks }) => {
	return (
		<div>
	{ selected === 0 ?
		<div>
			<h2>Docs</h2>
			<p>This is a RESTful API for accessing the latest trends in developer skills. This information is and aggregate of three sources. The Stack Exchange API that gives the latest data on tags used to mark questions. Listening to Twitters streaming API for how many times each of the top tags on Stack Overflow are hash tagged. Finally a node crawler scrapes the first 300 job entries for 'Remote Developer' and counts how often each of these search terms comes up.</p>
			<p>The main reason this API is built is to power the DevSkills app but it is open for anyone to use. Just sign up for an API key on the left. If you come up with a novel way to use or mashup up this information I would love to hear about it.</p>
			<p>Any issues should be opened on <a href='https://gitub.com/joshboyan/devskills-api/issues'>https://gitub.com/joshboyan/devskills-api/issues.</a></p>
     </div>
			: <div>
					<h2>Get an API key</h2>
					<Form />
				</div>
	}
	</div>
	)
}

Docs.PropTypes = {
	selected: PropTypes.number
}
