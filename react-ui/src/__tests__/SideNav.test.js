import React from 'react';
import ReactDOM from 'react-dom';
import { SideNav } from '../SideNav';
import routeData from '../data.json';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideNav
		routes={ routeData }
		selected={ 0 }
		updateSideNavLinks={ null } />, div);
});

it('Links call updateSideNavLinks when clicked', function() {
	const testFunc = jest.fn()
	const wrapper = mount(<SideNav
		routes={ routeData }
		selected={ 0 }
		updateSideNavLinks={ testFunc } />);
	const li = wrapper.find('li').first();
	li.simulate('click');
	expect(testFunc).toBeCalledWith({"selected": 1});
});
