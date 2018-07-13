import { Component } from 'react';
import classnames from 'classnames';
import count from '../../utils/count';

export default class EliminateItem extends Component {
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

  setBet = (index, bet, betNum) => {
    this.props.setBet(index, bet, betNum);
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

  reduce = index => {
    this.props.reduce(index);
  };

  plus = index => {
    this.props.plus(index);
  };

  maxBet = index => {
    this.props.maxBet(index);
  };

  //获取组名称
  getGroupName = type => {
    let result = '';
    if (type === 2) {
      result = '16 进 8';
    } else if (type === 3) {
      result = '8 进 4';
    } else if (type === 4) {
      result = '4 进 2';
    } else if (type === 5) {
      result = '季军赛';
    } else if (type === 6) {
      result = '决赛';
    }
    return result;
  };

  handleImageErrored = (item, team) => {
    item[team].imgError = true;
    item[team].photo = require(`../../assets/images/countryDefault.png`);
    this.setState({
      item: item,
    });
  };

  render() {
    const { item, index } = this.state;

    if (Object.keys(item).length > 0 && item.teamA && item.teamB) {
      return (
        <div
          className={classnames(
            'game outlet',
            { processing: item.result === 2 },
            { end: item.result === 3 }
          )}
          key={index}
        >
          <div className="groupName">{this.getGroupName(item.type)}</div>
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
                    count('zzw_sjb_tts_xz');
                    this.setBet(index, 3, item.betNum);
                  }
                }}
              >
                <div className="imgShadow">
                  {item.teamA.photo && (
                    <img
                      src={item.teamA.photo}
                      alt={item.teamA.name}
                      className={classnames({ error: item.teamA.imgError })}
                      onError={this.handleImageErrored.bind(this, item, 'teamA')}
                    />
                  )}
                </div>
              </div>

              <p>{item.teamA.name}</p>
              <div className="betButton">
                <button
                  type="button"
                  disabled={item.result === 2 || item.result === 3}
                  onClick={() => {
                    count('zzw_sjb_tts_xz');
                    this.setBet(index, 3, item.betNum);
                  }}
                >
                  胜
                </button>
              </div>
            </div>
            <div className="gameItem">
              {item.result === 1 ? (
                <img src={require(`../../assets/images/vs.png`)} alt="vs" className="vs" />
              ) : (
                <img src={require(`../../assets/images/vs_done.png`)} alt="vs" className="vs" />
              )}
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
                  count('zzw_sjb_tts_xz');
                  this.setBet(index, 0, item.betNum);
                }}
              >
                <div className="imgShadow">
                  {item.teamB.photo && (
                    <img
                      src={item.teamB.photo}
                      alt={item.teamB.name}
                      className={classnames({ error: item.teamB.imgError })}
                      onError={this.handleImageErrored.bind(this, item, 'teamB')}
                    />
                  )}
                </div>
              </div>

              <p>{item.teamB.name}</p>
              <div className="betButton">
                <button
                  type="button"
                  disabled={item.result === 2 || item.result === 3}
                  onClick={() => {
                    count('zzw_sjb_tts_xz');
                    this.setBet(index, 0, item.betNum);
                  }}
                >
                  胜
                </button>
              </div>
            </div>
          </div>

          {item.result === 1 && (
            <div className="gameBet">
              <span>下注积分</span>
              <div className="gameBetBtn">
                <div className="reduce" onClick={this.reduce.bind(this, index)}>
                  -
                </div>
                <div className="betNum">{item.betNum}</div>
                <div className="plus" onClick={this.plus.bind(this, index)}>
                  +
                </div>
              </div>
              <div className="maxBet" onClick={this.maxBet.bind(this, index)}>
                最大
              </div>
              <span>以10的倍数叠加</span>
            </div>
          )}
        </div>
      );
    } else {
      return <div />;
    }
  }
}
