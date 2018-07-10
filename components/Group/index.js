import { Component } from 'react';
//import classnames from 'classnames';
import ajax from '../../utils/ajax';
//import { searchObj } from '../../utils/config';
import { GroupItem } from '../../components';

import { connect } from 'react-redux';

@connect(({ groupData, scoreData, urlInfo }) => ({ groupData, scoreData, urlInfo }))
export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessList: {},
      baseNum: 50, //每下一场扣除的积分
      score: 0, //总积分
      betNum: 0, //投注的积分
      type: 1, //竞猜类型，1为小组赛
    };
  }

  componentDidMount() {
    // const { groupData } = this.props;
    // if (Object.keys(groupData).length > 0) {
    //     this.setGuess(groupData);
    // } else {
    //     this.guess();
    // }
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
    }).then(response => {
      this.setGuess(response);
    });
  };

  setGuess = response => {
    let { guessList, guessStatus, score } = response;
    const { groupData } = this.props;

    let { betNum } = this.state;
    if (Object.keys(groupData).length > 0) {
      let list = groupData.guessList;
      for (let i in list) {
        if (list[i].hasOwnProperty('bet') && list[i].result === 1) {
          guessList[i] = list[i];
        }
      }
      if (groupData.betNum > 0) {
        betNum = groupData.betNum;
        this.props.bet(betNum); //传递投注积分给底部组件
      }
    }

    this.setState({
      score: score,
      guessList: guessList,
      betNum: betNum,
    });

    this.props.tabStatus(guessStatus); //设置tab标签页状态

    //缓存小组赛单场数据
    const { dispatch } = this.props;
    groupData.type = '1';
    dispatch({
      type: 'groupData/save',
      payload: groupData,
    });

    //缓存总积分
    dispatch({
      type: 'scoreData/save',
      payload: score,
    });
  };

  setBet = (index, bet) => {
    let { guessList, baseNum, score, betNum } = this.state;
    //console.log(typeof guessList[index].result)
    if (guessList[index].result !== 1) {
      //如果比赛不是未开始
      return;
    }

    //已有选中跟选择的一样，则取消选中
    if (guessList[index].hasOwnProperty('bet') && guessList[index]['bet'] === bet) {
      delete guessList[index]['bet'];
      betNum -= baseNum;
    } else {
      if (!guessList[index].hasOwnProperty('bet')) {
        //如果没有进行过投注，则叠加积分
        betNum += baseNum;
      }

      if (betNum <= score) {
        //如果投注积分小于总积分，则进行投注

        guessList[index]['bet'] = bet;
      } else {
        //否则弹出提示
        this.props.modal('modal');
        return;
      }
    }
    this.setState({
      gameData: guessList,
      betNum: betNum,
    });
    this.props.bet(betNum); //传递投注积分给底部组件

    let { groupData, dispatch } = this.props; //更新缓存的比赛信息，添加投注信息
    groupData.guessList = guessList;
    groupData.betNum = betNum;
    groupData.type = '1';
    dispatch({
      type: 'groupData/save',
      payload: groupData,
    });
  };

  render() {
    const { guessList } = this.state;

    return (
      <div className="betContent">
        <div className="betTip">可竞猜近两日比赛，我们会每日更新比赛场次</div>
        <div className="betBody">
          {Object.keys(guessList).length > 0 &&
            guessList.map((item, index) => {
              return (
                <GroupItem item={item} index={index} key={index} setBet={this.setBet.bind(this)} />
              );
            })}
        </div>
      </div>
    );
  }
}
