import React, { Component } from 'react';
import { Router, Route, Switch } from 'dva/router';
import ActivityIndex from './ActivityIndex';
import Bet from './Bet';
import BetSuc from './BetSuc';
import RankList from './RankList';
import Score from './Score';
import { ActivityIndicator, Toast } from 'antd-mobile';
import { connect } from 'dva';
import ShareIndex from './ShareIndex';
import ActDetail from './ActDetail';
import MyInvite from './MyInvite';
import Main from './Main';
import NewRule from './NewRule';
import PlayRule from './PlayRule';
import Usecontract from './Usecontract';
import BorrowContract from './BorrowContract';
import ReqContract from './Reqcontract';
import DelegaContract from './DelegaContract';
import RegContract from './RegContract';
import ReAgreement from './ReAgreement';
import Extension from './Extension';
import DownloadStep from './DownloadStep';
import ExtensionInner from './ExtensionInner';
import Instruction from './Instruction';
import EndRank from './EndRank';

const titleList = [
  { path: '/activityIndex', title: '玩转世界杯' },
  { path: '/shareIndex', title: '分享' },
  { path: '/actDetail', title: '活动细则' },
  { path: '/myInvite', title: '我的邀请' },
  { path: '/bet', title: '世界杯竞猜' },
  { path: '/betSuc', title: '竞猜完成' },
  { path: '/rank', title: '排行榜' },
  { path: '/score', title: '积分明细' },
  { path: '/palyRule', title: '邀请细则' },
  { path: '/usecontract', title: '注册协议' },
  { path: '/rule', title: '银行新规' },
  { path: '/borrowContract', title: '服务合同' },
  { path: '/reqContract', title: '服务协议' },
  { path: '/regContract', title: '注册协议' },
  { path: '/delegaContract', title: '委托协议' },
  { path: '/main', title: '分享' },
  { path: '/reAgreement', title: '回购协议' },
  { path: '/extension', title: '注册' },
  { path: '/downloadStep', title: 'ios下载' },
  { path: '/extensionInner', title: '注册' },
  { path: '/instruction', title: '借款秘籍' },
  { path: '/endRank', title: '世界杯竞猜排名结果' },
];
@connect(({ load }) => ({ load }))
export default class App extends Component {
  getDom = () => {
    const { history, load } = this.props;
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/main" component={Main} />
            <Route path="/activityIndex" component={ActivityIndex} />
            <Route path="/shareIndex" component={ShareIndex} />
            <Route path="/actDetail" component={ActDetail} />
            <Route path="/myInvite" component={MyInvite} />
            <Route path="/bet" component={Bet} />
            <Route path="/betSuc" component={BetSuc} />
            <Route path="/rank" component={RankList} />
            <Route path="/score" component={Score} />
            <Route path="/palyRule" component={PlayRule} />
            <Route path="/rule" component={NewRule} />
            <Route path="/usecontract" component={Usecontract} />
            <Route path="/borrowContract" component={BorrowContract} />
            <Route path="/reqContract" component={ReqContract} />
            <Route path="/regContract" component={RegContract} />
            <Route path="/delegaContract" component={DelegaContract} />
            <Route path="/reAgreement" component={ReAgreement} />
            <Route path="/extension/:channel?" component={Extension} />
            <Route path="/downloadStep" component={DownloadStep} />
            <Route path="/extensionInner/:invitePhone/:shareChannel" component={ExtensionInner} />
            <Route path="/instruction/:jumpId?" component={Instruction} />
            <Route path="/endRank" component={EndRank} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
        <ActivityIndicator animating={load} size="large" toast={true} text="加载中..." />
      </div>
    );
  };

  componentDidMount() {
    const { history } = this.props;
    history.listen(params => {
      Toast.hide();
      const { pathname } = params;
      // console.log(params);
      // console.log(titleList);
      titleList.forEach(ele => {
        if (pathname && pathname.indexOf(ele.path) === 0) {
          document.title = ele.title;
        } else if (pathname === '/') {
          document.title = '分享';
        }
        return true;
      });
    });
  }
  render() {
    return this.getDom();
  }
}
