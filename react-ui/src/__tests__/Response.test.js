import React from 'react';
import ReactDOM from 'react-dom';
import { Response } from '../Response';
import routeData from '../data.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Response
							selected={ 0 }
							routes={ routeData }
							skills={ ['java', 'c++'] }
							selectedValue={ 'java' }
							results={ [] }
							handleSelectChange={ null }
							handleFetch={ null } />, div);
});
