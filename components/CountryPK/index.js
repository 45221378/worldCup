import React, { Component } from 'react';
import { CountryBtn } from '../Button';
import './countryPK.less';
import classnames from 'classnames';

export default class CountryPK extends Component {
  constructor(props) {
    super(props);
    const { fightInfo } = this.props;
    this.state = {
      fightInfo: fightInfo,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps;
  }

  handleImageErrored = (item, team) => {
    item[team].imgError = true;
    item[team].photo = require(`../../assets/images/countryDefault.png`);
    this.setState({
      fightInfo: item,
    });
  };

  render() {
    const { onClick } = this.props;
    const { fightInfo } = this.state;
    return (
      <article className="country" onClick={onClick}>
        <p>* 竞猜截止时间：{fightInfo.endTime} *</p>
        <ul>
          <li>
            <div className="img-border">
              {fightInfo.teamA && (
                <img
                  src={fightInfo.teamA.photo}
                  alt={fightInfo.teamA.name}
                  className={classnames({ error: fightInfo.teamA.imgError })}
                  onError={this.handleImageErrored.bind(this, fightInfo, 'teamA')}
                />
              )}
            </div>
            <span>{fightInfo.teamA && fightInfo.teamA.name}</span>
          </li>
          <li className="li-second">
            <b className="span-img" />
          </li>
          <li>
            <div className="img-border">
              {fightInfo.teamB && (
                <img
                  src={fightInfo.teamB.photo}
                  alt={fightInfo.teamB.name}
                  className={classnames({ error: fightInfo.teamB.imgError })}
                  onError={this.handleImageErrored.bind(this, fightInfo, 'teamB')}
                />
              )}
            </div>
            <span>{fightInfo.teamB && fightInfo.teamB.name}</span>
          </li>
        </ul>
        <CountryBtn children="立即下注" />
      </article>
    );
  }
}
