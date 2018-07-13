import React, { Component } from 'react';
import { Button } from 'antd-mobile';

import './button.less';

class IndexBtn extends Component {
  render() {
    let classNames = require('classnames');
    let { type, onClick, className } = this.props;
    if (!type) {
      type = 'primary';
    }
    let btnClass = classNames('index-btn', className);
    return (
      <Button className={btnClass} type={type} onClick={onClick}>
        {this.props.children}
      </Button>
    );
  }
}

class CountryBtn extends Component {
  render() {
    let classNames = require('classnames');
    let { type, onClick, className } = this.props;
    if (!type) {
      type = 'primary';
    }
    let btnClass = classNames('country-btn', className);
    return (
      <Button className={btnClass} type={type} onClick={onClick}>
        {this.props.children}
      </Button>
    );
  }
}

export { CountryBtn, IndexBtn };
