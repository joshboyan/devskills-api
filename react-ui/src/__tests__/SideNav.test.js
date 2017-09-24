import React from 'react';
import ReactDOM from 'react-dom';
import { SideNav } from '../SideNav';
import routeData from '../data.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideNav
		routes={ routeData }
		selected={ 0 }
		updateSideNavLinks={ null } />, div);
});
