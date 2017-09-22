import React from 'react';
import PropTypes from 'prop-types';

export const Response = ({
	selected, routes, selectValue, handleSelectChange, skills, handleFetch, results }) => {
	return (
		<div>
			{ selected !== 0 ?
          <div>
          <hr />
          <h3>Try it out</h3>
              <div>fetch(https://devskillsapi.herokuapp.com{ routes[selected].route.replace(':skill', selectValue) })</div>
              { selected > 3 ?
              <select
                value={ selectValue }
                onChange={ handleSelectChange }>
                { skills.map((skill, i) => {
                  return <option key={ i } value={ skill }>{ skill }</option>
                }) }
              </select> : null }
              <button
                className='btn'
                onClick={ handleFetch }>Fetch Results</button>
            <pre>{ JSON.stringify(results, null, 2) }</pre>
            </div> : null
          }
		</div>
	)
}

Response.PropTypes = {
	selected: PropTypes.number,
	routes: PropTypes.array,
	selectValue: PropTypes.string,
	handleSelectChange: PropTypes.func,
	skills: PropTypes.array,
	handleFetch: PropTypes.func,
	results: PropTypes.array
}
