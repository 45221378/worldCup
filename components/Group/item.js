import { Component } from 'react';
import classnames from 'classnames';
import count from '../../utils/count';

export default class GroupItem extends Component {
  constructor(props) {
    super(props);
    let { item, index } = this.props;

    this.state = {
      item: item,
      index: index,
    };
  }

  //获取比赛头部信息，是否开始比赛，比赛时间等
  gameTitle = (status, endTime) => {
    let result = '';
    if (status === 1) {
      result = `* 竞猜截止时间：${endTime} *`;
    } else if (status === 2) {
      result = `本场比赛进行中，不能再竞猜`;
    } else if (status === 3) {
      result = `本场比赛已结束`;
    }
    return result;
  };

  setBet = (index, bet) => {
    this.props.setBet(index, bet);
  };

  componentDidMount() {
    const {
      item: { interval },
    } = this.state;
    this.time(interval); //比赛时间倒计时
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  //比赛倒计时
  time = interval => {
    //如果距离开始时间秒数大于0,开始计时
    if (interval) {
      this.timer = setInterval(() => {
        if (interval-- <= 0) {
          clearInterval(this.timer);

          const { item } = this.state;
          //倒计时结束，比赛开始

          item.interval = 0; //倒计时置0
          if (item.result === 1) {
            //如果比赛是未开始，倒计时结束，状态设置为进行中
            item.result = 2;
          }

          item.status = false; //投注状态设置为不可投注
          this.setState({
            item: item,
          });
        }
      }, 1000);
    }
  };

  handleImageErrored = (item, team) => {
    item[team].imgError = true;
    item[team].photo = require(`../../assets/images/countryDefault.png`);
    this.setState({
      item: item,
    });
  };

  render() {
    let { item, index } = this.state;

    return (
      <div
        className={classnames(
          'game',
          { processing: item.result === 2 },
          { end: item.result === 3 }
        )}
        key={index}
      >
        <div className="gameTime">{this.gameTitle(item.result, item.endTime)}</div>
        <div className="gameInfo">
          <div
            className={classnames(
              'gameItem',
              { selected: item.bet === 3 },
              { win: item.result === 3 && item.gameResult && item.gameResult === item.teamA.id }
            )}
          >
            <div
              className="imgbox"
              onClick={() => {
                if (item.result === 1) {
                  this.setBet(index, 3);
                  count('zzw_sjb_jc_xzdc_xz');
                }
              }}
            >
              <div className="imgShadow">
                <img
                  src={item.teamA.photo}
                  alt={item.teamA.name}
                  className={classnames({ error: item.teamA.imgError })}
                  onError={this.handleImageErrored.bind(this, item, 'teamA')}
                />
              </div>
            </div>
            <p>{item.teamA.name}</p>
            <div className="betButton">
              <button
                type="button"
                disabled={item.result === 2 || item.result === 3}
                onClick={() => {
                  this.setBet(index, 3);
                  count('zzw_sjb_jc_xzdc_xz');
                }}
              >
                胜
              </button>
            </div>
          </div>
          <div
            className={classnames(
              'gameItem',
              { selected: item.bet === 1 },
              { win: item.result === 3 && item.gameResult === 0 }
            )}
          >
            {item.result === 1 ? (
              <img src={require(`../../assets/images/vs.png`)} alt="vs" className="vs" />
            ) : (
              <img src={require(`../../assets/images/vs_done.png`)} alt="vs" className="vs" />
            )}
            <div className="betButton">
              <button
                type="button"
                onClick={() => {
                  if (item.result === 1) {
                    this.setBet(index, 1);
                    count('zzw_sjb_jc_xzdc_xz');
                  }
                }}
              >
                平
              </button>
            </div>
          </div>
          <div
            className={classnames(
              'gameItem',
              { selected: item.bet === 0 },
              { win: item.result === 3 && item.gameResult && item.gameResult === item.teamB.id }
            )}
          >
            <div
              className="imgbox"
              onClick={() => {
                if (item.result === 1) {
                  this.setBet(index, 0);
                  count('zzw_sjb_jc_xzdc_xz');
                }
              }}
            >
              <div className="imgShadow">
                <img
                  src={item.teamB.photo}
                  alt={item.teamB.name}
                  className={classnames({ error: item.teamB.imgError })}
                  onError={this.handleImageErrored.bind(this, item, 'teamB')}
                />
              </div>
            </div>
            <p>{item.teamB.name}</p>
            <div className="betButton">
              <button
                type="button"
                disabled={item.result === 2 || item.result === 3}
                onClick={() => {
                  this.setBet(index, 0);
                  count('zzw_sjb_jc_xzdc_xz');
                }}
              >
                胜
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
