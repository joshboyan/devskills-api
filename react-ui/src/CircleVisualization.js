import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const CircleVisualization = React.createClass({
  getInitialState() {
    return {
      key: 1
    };
  },

  handleSelect(key) {
    //alert('selected ' + key);
    this.setState({key});
  },

  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={1} title="Overall">Tab 1 content</Tab>
        <Tab eventKey={2} title="Stack Overflow">Tab 2 content</Tab>
        <Tab eventKey={3} title="Twitter">Tab 3 content</Tab>
        <Tab eventKey={4} title="Indeed">Tab 4 content</Tab>
      </Tabs>
    );
  }
});

export default CircleVisualization;