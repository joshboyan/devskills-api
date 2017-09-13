import React from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import FaPlus from 'react-icons/lib/fa/plus';

class Skill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  render() {
    const buttonStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#DFDFDF',
      color: '#757575',
      boderColor: '#757575',
      borderBottom: 'transparent',
      borderRadius: '2px 2px 0 0'
    }
    const moreStyle = {
      float: 'right',
      color: '#FFC107'
    }
    const panelStyle = { 
      backgroundColor: '#DFDFDF',
      color: '#757575',     
      boderColor: '#757575',
      borderTop: 'transparent',
      borderRadius: '0 0 2px 2px'
    }
    const {name, indeed, twitter, stackOverflow} = this.props.props
    return (
      <div>
        <Button 
          onClick={ ()=> this.setState({ open: !this.state.open })}
          style = {buttonStyle}>
          <h2>{name}</h2>
          <div>
          <p>
            mentions: { indeed + twitter + stackOverflow }
          </p>
          
          <p>
            trending: 
            {/* this.state.trending < 1 ? < FaArrowDown />: <FaArrowUp />*/}
          </p>
          <p style={moreStyle}>more <FaPlus /></p>
          </div>
        </Button>
        <Panel 
          collapsible expanded={this.state.open}
          style={panelStyle}>
          <Row></Row>
          <Col xs={12} sm={7}></Col>
          <Col xs={12} sm={5}>
            <h4>Free Resources</h4>
            <ul>
              <li>this resource</li>
              <li>that resource</li>
              <li>new thing</li>
              <li>old stuff</li>
            </ul>
          </Col>
        </Panel>
      </div>
    );
  }
}

export default Skill;