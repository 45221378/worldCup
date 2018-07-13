import React, { Component } from 'react';
import { withRouter } from 'dva/router';
import { Modal, Toast } from 'antd-mobile';
import { TabBar } from '../../components';
import { connect } from 'dva';
import axios from 'axios';
import { baseURL } from '../../utils/ajax';
import count from '../../utils/count';
import './rankList.less';

function closest(el, selector) {
  const matchesSelector =
    el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

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
export default class RankList extends Component {
  constructor(props) {
    super(props);
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
      modal: false,
      isLoading: false,
      currentPage: 0,
      totalPage: 1,
    };
  }
  //切换排行
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
  //获取头部信息展示
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
      <header className="rank-header">
        <p>
          <span>{headerInfo.myAmount}</span>
          <i>我的{leftText}</i>
        </p>
        <p>
          <span>{headerInfo.myRank}</span>
          <i>我的{rightText}排名</i>
        </p>
      </header>
    );
  };
  //获取排行
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
    // console.log(thisRankList);
    return (
      <div className="rank-content rank-loan">
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
  //打开modal
  openTip = () => {
    document.body.className = 'modal-opened';
    this.setState({
      modal: true,
    });
  };
  //关闭modal
  closeTip = () => {
    document.body.className = '';
    this.setState({
      modal: false,
    });
  };
  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.rank-modal-rule-content');
    if (!pNode) {
      e.preventDefault();
    }
  };

  //获取排行类型
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
  // getRankData=(type)=>{
  //     const { phone = '15902780207' } = searchObj;
  //     ajax({
  //         method: 'get',
  //         url: `${baseURL}/fifa/rank`,
  //         params: {
  //             mobile:phone,
  //             type
  //         }
  //     }).then((data)=>{
  //         // console.log(data);
  //         const {list,myAmount,myRank} = data;
  //         this.setState({
  //             rankInfo:list,
  //             headerInfo:{myAmount,myRank}
  //         })
  //     })
  // }
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

  componentDidMount() {
    //将弹窗方法绑定到window对象  方便app调取
    window.openRule = this.openTip;
    // setTimeout(()=>{window.openRule()},0);

    //添加规则按钮
    // appFun('');

    // 获取初始展示排行榜
    this.getRankData(true);
  }
  componentDidUpdate() {
    this.checkHeight();
  }
  componentWillUnmount = () => {
    clearInterval(timer);
    this.closeTip();
  };
  render() {
    const { modal, thisRank } = this.state;
    // console.log(thisRank);
    return (
      <section className="rank">
        {this.getHeader()}
        <TabBar
          tabArr={[
            {
              name: '积分排行',
              toPath: 'score',
              label: '',
              clickFunc: () => {
                count('zzw_sjb_phb_jfph');
                this.changeRank('score');
              },
              disabled: false,
              class: '',
            },
            {
              name: '邀请排行',
              toPath: 'invite',
              label: '',
              clickFunc: () => {
                count('zzw_sjb_phb_yqph');
                this.changeRank('invite');
              },
              disabled: false,
            },
            {
              name: '借款排行',
              toPath: 'loan',
              label: '',
              clickFunc: () => {
                count('zzw_sjb_phb_jkph');
                this.changeRank('loan');
              },
              disabled: false,
            },
          ]}
          defaultPath={thisRank}
        />

        {this.getRank()}

        <Modal
          visible={modal}
          className="rank-modal-rule"
          title="排行榜规则"
          maskTransitionName="fade"
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          maskClosable={false}
        >
          <i
            onClick={() => {
              count('zzw_sjb_phb_gz_gb');
              this.closeTip();
            }}
            className="iconfont icon-cross"
          />
          <div className="rank-modal-rule-content">
            <p className="rule-title">积分排行榜规则：</p>
            <p className="rule-text">
              每个用户初始积分500分，按照赛程进行积分投注
              根据比赛结果和投注结果比对给出相应积分增减结果并排名
            </p>
            <p className="rule-title">邀请好友排名规则：</p>
            <p className="rule-text">
              用户可通过邀请好友和借款的方式增加积分，用户邀请好友即可获得额外30积分，此外被邀请的好友也可以获得额外30积分，用户邀请的好友人数和积分奖励无上限
              活动结束后根据用户邀请好友的人数进行排名奖励
            </p>
            <p className="rule-title">借款排行榜规则：</p>
            <p className="rule-text">
              1、可以通过借款的方式获得积分奖励，每借款1000元即可奖励1000积分，借款2000元可奖励2000积分以此类推，借款金额和积分奖励无上限
            </p>
            <p className="rule-text">2、活动结束后根据用户借款的金额进行排名奖励</p>
          </div>
        </Modal>
      </section>
    );
  }
}
