import React, { Component } from 'react';
import './rule.less';
export default class NewRule extends Component {
  render() {
    return (
      <div className="rule">
        <img src={require('../../assets/images/rule.png')} alt="" />
      </div>
    );
  }
}
