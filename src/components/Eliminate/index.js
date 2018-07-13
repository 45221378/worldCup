import { Component } from 'react';
import ajax from '../../utils/ajax';
//import { searchObj } from '../../utils/config';
import { EliminateItem } from '../../components';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';

@connect(({ scoreData, eliminateData, urlInfo }) => ({ scoreData, eliminateData, urlInfo }))
export default class Eliminate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessList: {},
      baseNum: 10, //每下一场扣除的积分
      type: 3, //竞猜类型，1为小组赛
      totalBetNum: 0, // 总共投注的积分
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
    }).then(response => {
      let { dispatch, eliminateData } = this.props;

      let { guessList, score, guessStatus } = response;
      let { baseNum, totalBetNum } = this.state;

      if (Object.keys(eliminateData).length > 0) {
        let list = eliminateData.guessList || eliminateData;
        for (let i in list) {
          if (list[i].hasOwnProperty('bet') && list[i].betNum > 0 && list[i].result === 1) {
            guessList[i] = list[i];
            totalBetNum += list[i].betNum;
          } else if (guessList[i]) {
            guessList[i].betNum = baseNum;
          }
        }
      } else {
        guessList = guessList.map(item => {
          item.betNum = baseNum; //赋值初始投注金额
          return item;
        });
      }

      this.setState({
        score: score,
        guessList: guessList,
        totalBetNum: totalBetNum,
      });

      //缓存总积分
      dispatch({
        type: 'scoreData/save',
        payload: score,
      });

      this.props.tabStatus(guessStatus); //设置tab标签页状态
      this.props.bet(totalBetNum); //传递投注积分给底部组件

      //缓存小组赛单场数据
      let obj = {};
      obj.guessList = guessList;
      obj.type = '3';
      dispatch({
        type: 'eliminateData/save',
        payload: obj,
      });
    });
  };

  //减小投注金额
  reduce = index => {
    let { guessList, totalBetNum } = this.state;
    if (guessList[index].hasOwnProperty('bet')) {
      //选择了投注
      if (guessList[index].betNum > 10) {
        guessList[index].betNum -= 10;
        totalBetNum -= 10;
      }

      this.setState({
        guessList: guessList,
        totalBetNum: totalBetNum,
      });
      this.props.bet(totalBetNum); //传递投注积分给底部组件

      let { eliminateData, dispatch } = this.props; //更新缓存的比赛信息，添加投注信息
      let obj = {};
      obj.guessList = guessList;
      obj.type = '3';
      dispatch({
        type: 'eliminateData/save',
        payload: eliminateData,
      });
    } else {
      this.betTip();
    }
  };

  //增大投注金额
  plus = index => {
    let { guessList, baseNum, totalBetNum } = this.state;
    if (guessList[index].hasOwnProperty('bet')) {
      //选择了投注

      const { scoreData } = this.props;
      if (baseNum + totalBetNum <= scoreData) {
        guessList[index].betNum += baseNum;
        totalBetNum += baseNum;
        this.setState({
          guessList: guessList,
          totalBetNum: totalBetNum,
        });
        this.props.bet(totalBetNum); //传递投注积分给底部组件

        let { eliminateData, dispatch } = this.props; //更新缓存的比赛信息，添加投注信息
        let obj = {};
        obj.guessList = guessList;
        obj.type = '3';
        dispatch({
          type: 'eliminateData/save',
          payload: eliminateData,
        });
      }
    } else {
      this.betTip();
    }
  };

  //最大化投注，梭哈
  maxBet = index => {
    let { guessList, totalBetNum } = this.state;
    if (guessList[index].hasOwnProperty('bet')) {
      //选择了投注

      const { scoreData } = this.props;

      if (guessList[index].betNum < scoreData - totalBetNum + guessList[index].betNum) {
        guessList[index].betNum = scoreData - totalBetNum + guessList[index].betNum;
        totalBetNum = scoreData;

        this.setState({
          guessList: guessList,
          totalBetNum: totalBetNum,
        });
        this.props.bet(totalBetNum); //传递投注积分给底部组件

        let { eliminateData, dispatch } = this.props; //更新缓存的比赛信息，添加投注信息
        let obj = {};
        obj.guessList = guessList;
        obj.type = '3';
        dispatch({
          type: 'eliminateData/save',
          payload: eliminateData,
        });
      }
    } else {
      this.betTip();
    }
  };

  betTip = () => {
    Toast.info('请先选择竞猜队伍', 3, null, false);
  };

  //设置投注
  setBet = (index, bet, betNum) => {
    // index 投注的比赛引索
    // bet下注的选项，3主胜 0客胜，淘汰赛不存在平局
    // betNum 单场下注的积分

    let { guessList, totalBetNum, baseNum } = this.state;
    const { scoreData } = this.props;

    if (guessList[index].result !== 1) {
      //如果比赛不是未开始
      return;
    }

    //已有选中跟选择的一样，则取消选中
    if (guessList[index].hasOwnProperty('bet') && guessList[index]['bet'] === bet) {
      delete guessList[index]['bet'];
      totalBetNum -= betNum;
      guessList[index]['betNum'] = baseNum;
    } else {
      if (!guessList[index].hasOwnProperty('bet')) {
        //如果没有进行过投注，则叠加积分
        totalBetNum += betNum;
      }

      if (totalBetNum <= scoreData) {
        //如果投注积分小于总积分，则进行投注

        guessList[index]['bet'] = bet;
        guessList[index]['betNum'] = betNum;
      } else {
        //否则弹出提示
        this.props.modal('modal');
        return;
      }
    }
    this.setState({
      gameData: guessList,
      totalBetNum: totalBetNum,
    });

    this.props.bet(totalBetNum); //传递投注积分给底部组件

    let { eliminateData, dispatch } = this.props; //更新缓存的比赛信息，添加投注信息
    let obj = {};
    obj.guessList = guessList;
    obj.type = '3';
    dispatch({
      type: 'eliminateData/save',
      payload: eliminateData,
    });
  };

  render() {
    const { guessList } = this.state;
    return (
      <div className="betContent">
        <div className="betTip">可竞猜近两日比赛，我们会每日更新比赛场次</div>
        <div className="betBody outlet">
          {Object.keys(guessList).length > 0 &&
            guessList.map((item, index) => {
              return (
                <EliminateItem
                  item={item}
                  index={index}
                  key={index}
                  setBet={this.setBet.bind(this)}
                  reduce={this.reduce.bind(this)}
                  plus={this.plus.bind(this)}
                  maxBet={this.maxBet.bind(this)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
