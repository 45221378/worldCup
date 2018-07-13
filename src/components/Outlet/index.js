import { Component } from 'react';
import ajax from '../../utils/ajax';
//import { searchObj } from '../../utils/config';

import { OutletItem } from '../../components';
//import { Toast } from 'antd-mobile';

import { connect } from 'react-redux';

@connect(({ outletData, scoreData, urlInfo }) => ({ outletData, scoreData, urlInfo }))
export default class Outlet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessList: {},
      baseNum: 40, //每下一场扣除的积分
      betNum: 0, //投注的积分
      type: 2, //竞猜类型，1为小组赛
    };
  }

  componentDidMount() {
    this.guess();
  }

  guess = () => {
    const { type } = this.state;
    const { urlInfo } = this.props;
    const { mobile } = urlInfo;

    ajax({
      method: 'get',
      url: 'fifa/match/guess',
      params: {
        mobile: mobile,
        type: type,
      },
    }).then(({ list = [], score, guessStatus }) => {
      let { dispatch, outletData } = this.props;
      let { betNum } = this.state;

      if (Object.keys(outletData).length > 0) {
        let outletList = outletData.guessList;
        for (let i in outletList) {
          if (outletList[i].hasOwnProperty('count') && outletList[i].result === 1) {
            list[i] = outletList[i];
          }
        }
        if (outletData.betNum > 0) {
          betNum = outletData.betNum;
          //this.props.bet(betNum); //传递投注积分给底部组件
          let betDisabled = betNum <= 0; // 底部投注按钮是否可点击 true不可点击
          if (!betDisabled) {
            for (let value of outletList) {
              if (value.count === 1) {
                //如果有只选了一场 不可点击
                betDisabled = true;
                break;
              }
            }
          }

          this.props.bet(betNum, betDisabled);
        }
      }

      this.setState({
        score: score,
        guessList: list,
        betNum: betNum,
      });

      this.props.tabStatus(guessStatus); //设置tab标签页状态

      //缓存小组赛单场数据
      outletData.type = '2';
      outletData.guessList = list;
      dispatch({
        type: 'outletData/save',
        payload: outletData,
      });

      //缓存总积分
      dispatch({
        type: 'scoreData/save',
        payload: score,
      });
    });
  };

  //一二名下注
  setBet = (index, it, ind, bet) => {
    // index 小组赛A组 B组数字引索
    // it 小组国家信息
    // ind 小组国家引索
    // bet 小组国家投注

    // baseNum, score, betNum
    let { guessList, baseNum, betNum } = this.state;
    const { scoreData } = this.props; //总积分

    let item = guessList[index]; //小组国家信息数组
    let teams = item.teams;

    if (teams[ind].bet === 1) {
      //如果是已经选中的，则取消选中

      delete teams[ind].bet;
      if (--item.count === 1) {
        betNum -= baseNum; //如果原本选中了两个，清除积分
        delete item.bet;
      }
    } else {
      if (item.count === 2) {
        //选中了两个国家
        //Toast.info("小组赛一二名竞猜最多选择两队");
        return;
      } else if (betNum + baseNum <= scoreData) {
        //如果下注积分小于总积分
        teams[ind].bet = 1; //标识选中的国家已下注
        item.count = item.count ? item.count : 0;
        if (++item.count === 2) {
          betNum += baseNum;
          item.bet = 1;
        } else {
          delete item.bet;
        }
      } else {
        this.props.modal('modal'); //积分不足
        return;
      }
    }
    this.setState({
      guessList: guessList,
      betNum: betNum,
    });

    let betDisabled = betNum <= 0; // 底部投注按钮是否可点击 true不可点击
    if (!betDisabled) {
      for (let value of guessList) {
        if (value.count === 1) {
          //如果有只选了一场 不可点击
          betDisabled = true;
          break;
        }
      }
    }

    this.props.bet(betNum, betDisabled);

    let { outletData, dispatch } = this.props; //更新缓存的比赛信息，添加投注信息
    outletData.guessList = guessList;
    outletData.betNum = betNum;
    outletData.type = '2';
    dispatch({
      type: 'outletData/save',
      payload: outletData,
    });
  };

  render() {
    const { guessList } = this.state;
    // <div className="betTip">可竞猜近两日比赛，我们会每日更新比赛场次</div>
    return (
      <div className="betContent">
        <div className="outletBetTip" />
        <div className="betBody outlet">
          {Object.keys(guessList).length > 0 &&
            guessList.map((item, index) => {
              return (
                <OutletItem item={item} index={index} key={index} setBet={this.setBet.bind(this)} />
              );
            })}
        </div>
      </div>
    );
  }
}
