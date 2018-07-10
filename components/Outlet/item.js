import { Component } from 'react';
import classnames from 'classnames';
import count from '../../utils/count';

export default class OutletItem extends Component {
  constructor(props) {
    super(props);
    let { item, index } = this.props;

    this.state = {
      item: item,
      index: index,
    };
  }

  //获取比赛头部信息，是否开始比赛，比赛时间等
  gameTitle = (status, endTime, groups) => {
    let result = '';
    if (status === 1) {
      result = `* 竞猜截止时间：${endTime} *`;
    } else if (status === 2) {
      result = `本组比赛进行中，不能再竞猜`;
    } else if (status === 3) {
      result = `${groups}组小组赛已产生一二名`;
    }
    return result;
  };

  setBet = (index, it, ind, bet) => {
    this.props.setBet(index, it, ind, bet);
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

  handleImageErrored = (item, ind) => {
    item.teams[ind].imgError = true;
    item.teams[ind].photo = require(`../../assets/images/countryDefault.png`);
    this.setState({
      item: item,
    });
  };

  render() {
    const { item, index } = this.state;

    return (
      <div
        className={classnames(
          'game outlet',
          { processing: item.result === 2 },
          { end: item.result === 3 }
        )}
        key={index}
      >
        <div className="groupName">{`${item.groups} 组`}</div>
        <div className="gameTime small">
          {this.gameTitle(item.result, item.endTime, item.groups)}
        </div>
        <div className="gameInfo">
          {item.teams.map((it, ind) => {
            return (
              <div
                className={classnames(
                  'gameItem',
                  { selected: it.bet === 1 },
                  { win: it.rank === 'Y' }
                )}
                key={ind}
                onClick={() => {
                  if (item.result === 1) {
                    count('zzw_sjb_xzyem_xz');
                    this.setBet(index, it, ind, 1);
                  }
                }}
              >
                <div className="imgbox">
                  <div className="imgShadow">
                    <img
                      src={it.photo}
                      alt={it.name}
                      className={classnames({ error: it.imgError })}
                      onError={this.handleImageErrored.bind(this, item, ind)}
                    />
                  </div>
                </div>
                <p>{it.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
