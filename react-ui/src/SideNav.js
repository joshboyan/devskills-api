import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link, Route} from 'react-router-dom';

export const SideNav = ({ routes, updateSideNavLinks }) => {

	return (
	<div>

	<BrowserRouter>
	<div>
		<Link to={'/'}
			onClick={ () => updateSideNavLinks({selected: 0})}>
			Docs
		</Link>
		<hr />
		<p>Routes</p>
	</div>
	</BrowserRouter>
	<BrowserRouter>
	<ul>
		{routes.map((route, i) => {
			return(
			route.route ?
				<li key={i}>
					<Link to={`/routes${route.route}`}
						onClick={ () => updateSideNavLinks({selected: i})}>
						{route.route}
					</Link>
				</li> :
				null
			)
		})}
	</ul>
	</BrowserRouter>
	</div>
	)
}

SideNav.PropTypes = {
	routes: PropTypes.array
}
