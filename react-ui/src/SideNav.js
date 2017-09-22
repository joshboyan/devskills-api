import React from 'react';
import PropTypes from 'prop-types';



export const SideNav = ({ routes, selected, updateSideNavLinks }) => {

	return (
	<div>
	<div>
		<p className={selected === 0 ? 'active link' : 'link'}
			onClick={ () => updateSideNavLinks({selected: 0})}>Docs</p>
		<hr />
		<p>Routes</p>
	</div>
	<ul>
		{routes.map((route, i) => {
			return(
			route.route ?
				<li key={i}
					className={selected === i ? 'active link' : 'link'}
					onClick={ () => updateSideNavLinks({selected: i})}>
					{route.route}
				</li> :
				null
			)
		})}
	</ul>
	</div>
	)
}

SideNav.PropTypes = {
	routes: PropTypes.array,
	selected: PropTypes.number,
	updateSideNavLinks: PropTypes.func
}
