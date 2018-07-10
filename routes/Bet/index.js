/**
 * Created by yangke on 2018/5/22.
 */
import { Component } from 'react';
import { Banner, TabBar, BetFooter, Group, Outlet, Eliminate } from '../../components';
import './bet.less';
import { Modal, Button } from 'antd-mobile';
//import qs from 'qs';

import { connect } from 'dva';
import appFun from '../../utils/appFun';
import classnames from 'classnames';
import count from '../../utils/count';

//let ticking = false; // rAF 触发锁
//let setTabScroll=false;//是否是由切换tab触发的滚动

@connect(({ urlInfo }) => ({ urlInfo }))
export default class Bet extends Component {
  // 构造
  constructor(props) {
    super(props);
    const arr = window.location.pathname.split('/');
    let routerName = arr[arr.length - 1];
    if (routerName === 'bet') {
      routerName = 'group';
    }

    // 初始状态
    this.state = {
      modal: false,
      scroll: false, //是否滚动
      betTabs: {
        group: 0, //小组赛投注量
        outlet: 0, //小组一二名投注量
        eliminate: 0, //淘汰赛投注量
        betDisabled: true, // 小组一二名 底部投注按钮是否可点击 默认true
      },
      tabs: {
        defaultPath: routerName,
        className: 'betTabs',
        tabArr: [
          {
            name: '小组单场',
            thisClass: 'betTab',
            label: '未开始',
            toPath: 'group',
            disabled: false,
            clickFunc: () => {
              this.setTab('group');
              count('zzw_sjb_jc_xzdc');
            },
          },
          {
            name: '小组一二名',
            thisClass: 'betTab',
            label: '未开始',
            toPath: 'outlet',
            disabled: false,
            clickFunc: () => {
              this.setTab('outlet');
              count('zzw_sjb_jc_xzyem');
            },
          },
          {
            name: '淘汰赛',
            thisClass: 'betTab',
            label: '未开始',
            toPath: 'eliminate',
            disabled: false,
            clickFunc: () => {
              this.setTab('eliminate');
              count('zzw_sjb_jc_tts');
            },
          },
        ],
      },
    };
  }

  setTab = tabName => {
    //const { scroll } = this.state;
    const tabs = Object.assign({}, this.state.tabs, { defaultPath: tabName });

    //setTabScroll=true;
    this.setState({
      tabs: tabs,
      //scroll: scroll,
    });
  };

  //设置tab标签页状态
  setTabStatus = guessStatus => {
    let { tabs } = this.state;
    let { tabArr } = tabs;

    guessStatus.map((item, index) => {
      switch (item) {
        case '1': //未开始
          tabArr[index].label = '未开始';
          tabArr[index].disabled = false; //可点击
          tabArr[index].thisClass = 'betTab notBeginning';
          if (index === 2) {
            tabArr[index].disabled = true; //如果是淘汰赛未开始不可点击
          }
          break;
        case '2': //进行中
          tabArr[index].label = '竞猜中';
          tabArr[index].disabled = false; //可点击
          tabArr[index].thisClass = 'betTab processing';
          break;
        case '3': //已结束
          tabArr[index].label = '已结束';
          tabArr[index].disabled = false; //可点击
          tabArr[index].thisClass = 'betTab end';
          break;
        default:
          break;
      }
      return null;
    });

    tabs.tabArr = tabArr;
    this.setState({
      tabs: tabs,
    });
  };

  getTab = () => {
    const {
      tabs: { defaultPath },
    } = this.state;

    switch (defaultPath) {
      case 'group':
        return (
          <Group
            modal={this.showModal.bind(this, 'modal')}
            bet={this.setBet.bind(this)}
            tabStatus={this.setTabStatus.bind(this)}
          />
        );
      case 'outlet':
        return (
          <Outlet
            modal={this.showModal.bind(this, 'modal')}
            bet={this.setBet.bind(this)}
            tabStatus={this.setTabStatus.bind(this)}
          />
        );
      case 'eliminate':
        return (
          <Eliminate
            modal={this.showModal.bind(this, 'modal')}
            bet={this.setBet.bind(this)}
            tabStatus={this.setTabStatus.bind(this)}
          />
        );
      default:
        return (
          <Group
            modal={this.showModal.bind(this, 'modal')}
            bet={this.setBet.bind(this)}
            tabStatus={this.setTabStatus.bind(this)}
          />
        );
    }
  };

  //显示积分不足弹出层
  showModal = (key = 'modal') => {
    //积分不足 百度统计事件埋点
    const {
      tabs: { defaultPath },
    } = this.state;
    let id = null;
    switch (defaultPath) {
      case 'group':
        id = 'zzw_sjb_jc_xzdc_xz_jfbz';
        break;
      case 'outlet':
        id = 'zzw_sjb_xzyem_xz_jfbz';
        break;
      case 'eliminate':
        id = 'zzw_sjb_tts_xz_jfbz';
        break;
      default:
        id = 'zzw_sjb_jc_xzdc_xz_jfbz';
    }
    count(id);

    //显示弹出层
    this.setState({
      [key]: true,
    });
  };

  //关闭积分不足弹出层
  onClose = (key = 'modal') => {
    this.setState({
      [key]: false,
    });
  };

  setBet = (value, betDisabled = true) => {
    let {
      betTabs,
      tabs: { defaultPath },
    } = this.state;
    betTabs[defaultPath] = value;
    betTabs.betDisabled = betDisabled;
    this.setState({
      betTabs: betTabs,
    });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scroll);
  }

  //滚动防抖动 触发频率1000/60ms
  // onScroll = ()=>{
  //   if(setTabScroll){
  //     this.scroll();
  //   }else if(!ticking) {
  //     window.requestAnimationFrame(this.scroll);
  //     ticking = true;
  //   }

  // }

  scroll = () => {
    let tabs = null,
      scroll = false;

    if (window.scrollY > 136) {
      tabs = Object.assign({}, this.state.tabs, { className: 'betTabs scroll' });
      scroll = true;
    } else {
      tabs = Object.assign({}, this.state.tabs, { className: 'betTabs' });
    }

    //ticking = false;
    //setTabScroll=false;
    this.setState({
      tabs: tabs,
      scroll: scroll,
    });
  };

  // 积分不足相关 百度统计事件埋点
  amountCount = name => {
    const {
      tabs: { defaultPath },
    } = this.state;
    let id = null;
    switch (defaultPath) {
      case 'group':
        id = '_jc_xzdc_xz_';
        break;
      case 'outlet':
        id = '_xzyem_xz_';
        break;
      case 'eliminate':
        id = '_tts_xz_';
        break;
      default:
        id = '_jc_xzdc_xz_';
    }
    count(`zzw_sjb${id}jfbz_${name}`);
  };

  render() {
    const { tabs, betTabs, modal, scroll } = this.state;

    return (
      <div>
        <Banner />

        <main className={classnames('betMain', { betMainScroll: scroll })}>
          <TabBar {...tabs} />

          {this.getTab()}
        </main>
        <Modal
          visible={modal}
          transparent
          maskClosable={false}
          className="amountModal"
          onClose={this.onClose.bind(this, 'modal')}
        >
          <section className="amountLimit">
            <header>
              <i
                className="iconfont icon-cross"
                onClick={() => {
                  this.amountCount('gb');
                  this.onClose('modal');
                }}
              />
              积分不足
            </header>
            <section className="amountBody">
              <p className="amountWord">您可通过以下方式赚取积分再来竞猜</p>
              <Button
                type="primary"
                onClick={() => {
                  this.amountCount('sqjk');
                  appFun('jumpToLoan');
                }}
              >
                贷贷有积分，助力拿 iPhone
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  this.amountCount('yqhy');
                  this.props.history.push('/myInvite');
                }}
              >
                壕友联盟 友奖一起赚
              </Button>
            </section>
          </section>
        </Modal>

        <BetFooter {...betTabs} modal={this.showModal.bind(this, 'modal')} />
      </div>
    );
  }
}
