import React, { Component } from 'react';
import { withRouter } from 'dva/router';
import { TabBar } from '../../components';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import axios from 'axios';
import { baseURL } from '../../utils/ajax';
import count from '../../utils/count';
import './endRank.less';

const ajax = axios.create({
  baseURL,
  timeout: 1000 * 120,
});

ajax.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let { head, body } = response.data;
    if (head.retCode === 'success') {
      return body;
    } else {
      const { msg } = head;
      Toast.info(msg);
      return Promise.reject(head);
    }
  },
  function(error) {
    Toast.hide();
    const { response, request } = error;
    if (response) {
      const {
        data: { head },
      } = response;
      const { status } = request;

      if (head) {
        Toast.info(head.msg);
      } else {
        Toast.offline(`${status}:网络连接失败`);
      }
      return Promise.reject(error);
    } else {
      Toast.offline(`网络连接失败`);
      return Promise.reject({});
    }
  }
);

let timer = null,
  scrollY = 0;
@withRouter
@connect(({ urlInfo }) => ({ urlInfo }))
export default class EndRank extends Component {
  constructor(props) {
    super(props);
    //获取链接的url后缀，得到url后面的参数，不同的参数，分别对应不同的table切换对应的模块进行加载。
    let {
      match: { path },
      location: { pathname },
    } = this.props;
    path = path.indexOf('/:') > -1 ? path.split('/:')[0] : path;
    pathname = pathname.split(path)[1].split('/')[1];
    let step = pathname ? pathname : '';
    if (step !== 'score' && step !== 'invite' && step !== 'loan') {
      step = 'score';
    }
    this.state = {
      headerInfo: {
        myAmount: 0,
        myRank: 0,
      },
      rankInfo: [],
      thisRank: step,
      isLoading: false,
      currentPage: 0,
      totalPage: 1,
    };
  }
  changeRank = thisRank => {
    this.setState({
      thisRank,
    });
    const type = this.getType(thisRank);
    this.getRankData(true, type);
    if (this.refs.thisScroll) {
      this.refs.thisScroll.scrollTop = 0;
    }
  };
  //头部排名的获取
  getHeader = () => {
    const { thisRank, headerInfo } = this.state;
    let leftText = '积分';
    let rightText = '积分';
    switch (thisRank) {
      case 'invite':
        leftText = '邀请人数';
        rightText = '邀请';
        break;
      case 'loan':
        leftText = '借款金额';
        rightText = '借款';
        break;
      default:
        leftText = '积分';
        rightText = '积分';
    }
    return (
      <header className="header">
        <img src={require('../../assets/images/footballman.png')} alt="" />
        <ul className="header-title">
          <li className="li-one">
            <p>
              <span>{headerInfo.myAmount}</span>
              <i>我的{leftText}</i>
            </p>
          </li>
          <li className="li-two">
            <p>
              <span>{headerInfo.myRank}</span>
              <i>我的{rightText}排名</i>
            </p>
          </li>
        </ul>
      </header>
    );
  };
  // 全局变量thisRank，表示是哪一个具体的table
  getRankGoods = () => {
    let { thisRank } = this.state;
    const domList = {
      score: (
        <div className="endRank-goods">
          <div className="endRank-goods-content">
            <header className="header">
              <b>名次</b>
              <span>奖品</span>
            </header>
            <section className="detail">
              <ul>
                <li>
                  <b>第一名</b>
                  <span>iphoneX手机一部</span>
                </li>
                <li>
                  <b>第2-10名</b>
                  <span>999元beast入耳式耳机</span>
                </li>
                <li>
                  <b>第11-50名</b>
                  <span>50-200元的随机红包</span>
                </li>
              </ul>
            </section>
          </div>
          {this.getRank()}
        </div>
      ),
      invite: (
        <div className="endRank-goods">
          <div className="endRank-goods-content">
            <header className="header">
              <b>名次</b>
              <span>奖品</span>
            </header>
            <section className="detail">
              <ul>
                <li>
                  <b>第一名</b>
                  <span>6折减息券一张</span>
                </li>
                <li>
                  <b>第2-10名</b>
                  <span>8折减息券一张</span>
                </li>
              </ul>
            </section>
          </div>
          {this.getRank()}
        </div>
      ),
      loan: (
        <div className="endRank-goods">
          <div className="endRank-goods-content">
            <header className="header">
              <b>名次</b>
              <span>奖品</span>
            </header>
            <section className="detail">
              <ul>
                <li>
                  <b>第一名</b>
                  <span>2000元提额券+8折减息券一张</span>
                </li>
                <li>
                  <b>第2-10名</b>
                  <span>1200元提额券+8折减息券一张</span>
                </li>
                <li>
                  <b>第11-20名</b>
                  <span>800元提额券+9折减息券一张</span>
                </li>
                <li>
                  <b>第21-50名</b>
                  <span>400元提额券+9折减息券一张</span>
                </li>
                <li>
                  <p>
                    阳光普照奖 <br />
                    <i>(所有参与的用户均可获奖）</i>
                  </p>
                  <em>
                    无门槛48元减息券一张<br />2500-4400获得100元减息券一张<br />4500以上的获得200元减息券一张
                  </em>
                </li>
              </ul>
            </section>
          </div>
          {this.getRank()}
        </div>
      ),
    };
    return domList[thisRank];
  };
  //获取排行的名次和奖品
  getRank = () => {
    let { thisRank, rankInfo, currentPage, totalPage } = this.state;
    // console.log(rankInfo);
    let unitText = '分';
    switch (thisRank) {
      case 'invite':
        unitText = '人';
        break;
      case 'loan':
        unitText = '元';
        break;
      default:
        unitText = '分';
    }
    const thisRankList = rankInfo;
    const theFirst = thisRankList[0];
    const theSecond = thisRankList[1];
    const theThird = thisRankList[2];
    return (
      <div className="rank-list">
        <header className="rank-content-top">
          <p>
            <img src={require('../../assets/images/rank-silver.svg')} alt="银牌" />
            <span>{theSecond ? theSecond.mobile : '虚位以待'}</span>
            <i>
              {theSecond ? theSecond.amount : '0'}
              {unitText}
            </i>
          </p>
          <p className="top-first">
            <img src={require('../../assets/images/rank-gold.svg')} alt="金牌" />
            <span>{theFirst ? theFirst.mobile : '虚位以待'}</span>
            <i>
              {theFirst ? theFirst.amount : '0'}
              {unitText}
            </i>
          </p>
          <p>
            <img src={require('../../assets/images/rank-copper.svg')} alt="铜牌" />
            <span>{theThird ? theThird.mobile : '虚位以待'}</span>
            <i>
              {theThird ? theThird.amount : '0'}
              {unitText}
            </i>
          </p>
        </header>
        <section className="rank-content-main">
          {thisRankList.length > 3 && (
            <ul className="rank-content-main-list" ref="thisScroll" onScroll={this.scroll}>
              {thisRankList.map((ele, index) => {
                // console.log(ele.amount);
                if (index > 2) {
                  return (
                    <li key={index} className="rank-content-main-item">
                      <header>{ele.rank}</header>
                      <content>{ele.mobile}</content>
                      <footer>
                        {ele.amount}
                        {unitText}
                      </footer>
                    </li>
                  );
                } else {
                  return false;
                }
              })}
              {currentPage * 1 === totalPage * 1 &&
                thisRankList &&
                thisRankList.length > 0 && <p className="rank-hasnone">已经是最后一页了哦</p>}
            </ul>
          )}
        </section>
      </div>
    );
  };
  // 获取排行的类型
  getType = rank => {
    let { thisRank } = this.state;
    if (rank) {
      thisRank = rank;
    }
    let thisType = 1;
    if (thisRank === 'invite') {
      thisType = 2;
    } else if (thisRank === 'loan') {
      thisType = 3;
    } else {
      thisType = 1;
    }
    return thisType;
  };
  // 获取排行榜数据
  getRankData = (isChange, type) => {
    let { currentPage, totalPage, rankInfo = [], isLoading } = this.state;
    type = type ? type : this.getType();
    if (isChange) {
      rankInfo = [];
      currentPage = 0;
    }

    const {
      urlInfo: { mobile },
    } = this.props;
    if ((currentPage * 1 + 1 <= totalPage || isChange) && !isLoading) {
      Toast.loading('正在加载', 0);
      this.setState({
        isLoading: true,
      });
      ajax({
        method: 'get',
        url: `fifa/rank`,
        params: {
          mobile,
          currentPage: currentPage * 1 + 1,
          type,
        },
      })
        .then(data => {
          const { list = [], currentPage = 0, totalPage = 0, myAmount, myRank } = data;
          rankInfo = rankInfo.concat(list);
          this.setState({
            rankInfo,
            currentPage,
            totalPage,
            headerInfo: { myAmount, myRank },
          });
        })
        .finally(() => {
          // setTimeout(()=>{
          //   Toast.hide();
          // },10000)
          if (!isChange) {
            Toast.hide();
          }
          this.setState({
            isLoading: false,
          });
        });
    } else {
      Toast.hide();
    }
  };
  //验证是否需要加载第二页
  checkHeight = () => {
    if (this.refs.thisScroll) {
      const thisScroll = this.refs.thisScroll;
      const liNum = thisScroll.children.length;
      const liHeight = thisScroll.children[0].offsetHeight;
      const wrapperHeight = thisScroll.offsetHeight;
      if (wrapperHeight > liNum * liHeight) {
        const thisType = this.getType();
        this.getRankData(false, thisType);
      } else {
        Toast.hide();
      }
    } else {
      Toast.hide();
    }
  };
  //滚动触发事件
  scroll = e => {
    const $h = e.target.clientHeight;
    const $scrollH = e.target.scrollHeight;
    const $scroll = e.target.scrollTop;
    if ($scrollH - $scroll - $h < 10 && $scroll > scrollY) {
      this.getRankData(false);
    }
    timer = setTimeout(() => {
      scrollY = $scroll;
    }, 0);
  };
  componentDidMount() {
    // 获取初始展示排行榜
    this.getRankData(true);
  }
  //组件加载完成后验证是否需要加在第二页的数据
  componentDidUpdate() {
    this.checkHeight();
  }
  componentWillUnmount = () => {
    clearInterval(timer);
  };

  render() {
    const { thisRank } = this.state;
    return (
      <section className="endrank activityIndex">
        {this.getHeader()}
        <TabBar
          tabArr={[
            {
              name: '积分英雄榜',
              toPath: 'score',
              label: '积分排行',
              clickFunc: () => {
                count('zzw_sjb_pmjg_jfyx');
                this.changeRank('score');
              },
              disabled: false,
              class: '',
            },
            {
              name: '桃园结义奖',
              toPath: 'invite',
              label: '邀请排行',
              clickFunc: () => {
                count('zzw_sjb_pmjg_tyjy');
                this.changeRank('invite');
              },
              disabled: false,
            },
            {
              name: '家财万贯奖',
              toPath: 'loan',
              label: '借款排行',
              clickFunc: () => {
                count('zzw_sjb_pmjg_jcwg');
                this.changeRank('loan');
              },
              disabled: false,
            },
          ]}
          defaultPath={thisRank}
        />
        {this.getRankGoods()}
        <article>
          <h3 className="actDetail-tit actDetail-score magT33">
            <span>奖品细则</span>
          </h3>
          <p className="actDetail-word">
            1，用户的优惠券为有效期90天，从到账之日起进行计算，逾期失效；
          </p>
          <p className="actDetail-word">
            2，若积分相同，则通过借款金额大小进行排名，若借款金额大小也相同，则按照注册时间进行排名；
          </p>
          <p className="actDetail-word">
            3，现金红包奖励在活动结束后需要用户添加"转转小助手"微信号统一发放；
          </p>
          <p className="actDetail-word">
            4，获得实物奖励在活动结束后15个工作日内给中奖用户发送中奖短信，需要用户回复签收地址，如无回复会有客服与您取得联系，如用户在一周内无任何反馈，视为放弃奖励；
          </p>
          <h3 className="actDetail-tit actDetail-score magT33">
            <span>注意事项</span>
          </h3>
          <p className="actDetail-word">1，用户获得的减息券，提额券可以通过"我的-我的卡券"查看；</p>
          <p className="actDetail-word">
            2，活动期间发现严重违反及作弊行为，本平台有权取消其奖励；
          </p>
          <p className="actDetail-word">3，本平台拥有法律允许范围内本活动的最终解释权；</p>
        </article>
      </section>
    );
  }
}
