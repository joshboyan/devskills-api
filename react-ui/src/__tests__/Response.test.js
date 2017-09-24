import React from 'react';
import ReactDOM from 'react-dom';
import { Response } from '../Response';
import routeData from '../data.json';
import { mount } from 'enzyme';

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

it('Calls handleSelectChange on click', function() {
	const testFunc = jest.fn();
	const wrapper = mount(<Response
							selected={ 4 }
							routes={ routeData }
							skills={ ['java', 'c++'] }
							selectedValue={ 'java' }
							results={ [] }
							handleSelectChange={ testFunc }
							handleFetch={ null } />);
	const select = wrapper.find('select');
	select.simulate('change');
	expect(testFunc.mock.instances.length).toBe(1);
});

it('Calls handleFetch on button click', function() {
	const testFunc = jest.fn();
	const wrapper = mount(<Response
							selected={ 4 }
							routes={ routeData }
							skills={ ['java', 'c++'] }
							selectedValue={ 'java' }
							results={ [] }
							handleSelectChange={ null }
							handleFetch={ testFunc } />);
	const button = wrapper.find('button');
	button.simulate('click');
	expect(testFunc.mock.instances.length).toBe(1);
});
