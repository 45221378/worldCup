/**
 * Created by yangke on 2018/5/23.
 */
import { Component } from 'react';
import './betFooter.less';
import classnames from 'classnames';
//import { searchObj } from '../../utils/config';
import ajax from '../../utils/ajax';
import { history } from '../../index';
import { connect } from 'dva';
import count from '../../utils/count';

let timer = null,
  unlisten = null;
@connect(({ scoreData, groupData, outletData, eliminateData, urlInfo }) => ({
  scoreData,
  groupData,
  outletData,
  eliminateData,
  urlInfo,
}))
export default class BetFooter extends Component {
  constructor(props) {
    super(props);
    const routerName = this.getRouterName();
    this.state = {
      routerName: routerName,
    };
  }

  static defaultProps = {
    group: 0, //小组赛投注量
    outlet: 0, //小组一二名投注量
    eliminate: 0, //淘汰赛投注量
  };

  //下注
  bet = () => {
    const { routerName } = this.state;
    const { scoreData } = this.props;

    const betNum = this.props[routerName]; //消耗积分

    const cacheData = this.props[routerName + 'Data'];
    const { guessList } = cacheData; //比赛数据

    if (betNum > scoreData) {
      //如果消耗积分大于总积分
      this.props.modal('modal');
      return;
    }
    if (betNum > 0) {
      const { urlInfo } = this.props;
      const { mobile } = urlInfo;
      let data = {
        //请求公共参数
        mobile: mobile, //手机	string
        type: cacheData.type, //竞猜类型	string
        useScore: betNum, //消耗积分 number
      };

      if (cacheData.type === '1') {
        let arr = guessList
          .filter(item => {
            if (item.hasOwnProperty('bet')) {
              return item;
            } else {
              return false;
            }
          })
          .map((item, index) => {
            let obj = {
              matchId: item.matchId, //赛程Id	string	仅小组赛、淘汰赛
              score: 50, //投注积分	number
              team: 1, //队伍Id	string,默认平局
            };
            if (item.bet === 3) {
              obj.team = item.teamA.id;
            } else if (item.bet === 0) {
              obj.team = item.teamB.id;
            }
            return obj;
          });
        data.list = JSON.stringify(arr);
      } else if (cacheData.type === '2') {
        let arr = guessList
          .filter(item => {
            if (item.hasOwnProperty('bet')) {
              return item;
            } else {
              return false;
            }
          })
          .map((item, index) => {
            let listItem = {
              group: item.groups,
              score: 40,
            };
            let teamsIdArr = [];

            let teams = item.teams;
            for (let value of teams) {
              if (value.bet === 1) {
                teamsIdArr.push({ id: value.id, rank: 1 });
              }
            }
            listItem.teams = teamsIdArr;
            return listItem;
          });
        data.list = JSON.stringify(arr);
      } else if (cacheData.type === '3') {
        let arr = guessList
          .filter(item => {
            if (item.hasOwnProperty('bet')) {
              return item;
            } else {
              return false;
            }
          })
          .map((item, index) => {
            let obj = {
              matchId: item.matchId, //赛程Id	string	仅小组赛、淘汰赛
              score: item.betNum, //投注积分	number
            };
            if (item.bet === 3) {
              obj.team = item.teamA.id;
            } else if (item.bet === 0) {
              obj.team = item.teamB.id;
            }
            return obj;
          });
        data.list = JSON.stringify(arr);
      }

      ajax({
        method: 'post',
        url: 'fifa/match/vote',
        data,
      }).then(response => {
        const { dispatch } = this.props;
        dispatch({
          type: `${routerName}Data/save`,
          payload: {},
        });

        history.push('../betSuc');
      });
    }
  };

  getRouterName = () => {
    const path = window.location.pathname.split('/');
    let routerName = path[path.length - 1];
    if (routerName === 'bet') {
      routerName = 'group';
    }
    return routerName;
  };

  componentDidMount() {
    const _this = this;

    //监听路由变化，设置tab页名称
    unlisten = history.listen(({ pathname }) => {
      timer = setTimeout(() => {
        const routerName = this.getRouterName();
        _this.setState({
          routerName: routerName,
        });
      }, 30);
    });
  }
  componentWillUnmount() {
    unlisten();
    clearTimeout(timer);
  }

  // 立即下注百度统计事件埋点
  betCount = () => {
    const { routerName } = this.state;
    let id = null;
    switch (routerName) {
      case 'group':
        id = 'zzw_sjb_jc_xzdc_ljxz';
        break;
      case 'outlet':
        id = 'zzw_sjb_xzyem_ljxz';
        break;
      case 'eliminate':
        id = 'zzw_sjb_tts_ljxz';
        break;
      default:
        id = 'zzw_sjb_jc_xzdc_ljxz';
    }
    count(id);
  };

  render() {
    const { routerName } = this.state;
    let { scoreData, betDisabled } = this.props;
    const betNum = this.props[routerName];

    if (routerName !== 'outlet') {
      betDisabled = betNum <= 0;
    }

    if (typeof scoreData === 'object' && Object.keys(scoreData).length <= 0) {
      scoreData = 0;
    }

    return (
      <div className="fixedFooter">
        <div className="integral">
          <span>
            您共有 {scoreData} 积分，本次竞猜将扣除 {betNum} 积分
          </span>
        </div>
        <div className="betFooter">
          <div className="betWin">
            猜中可赢 <em>{betNum * 2}</em> 积分
          </div>
          <button
            type="button"
            disabled={betDisabled}
            className={classnames('betBtn', { disabledBtn: betDisabled })}
            onClick={() => {
              this.bet();
              this.betCount();
            }}
          >
            立即下注
          </button>
        </div>
      </div>
    );
  }
}
