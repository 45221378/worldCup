import { Component } from 'react';
import './myInvite.less';
import { Link } from 'dva/router';
import ajax from '../../utils/ajax';
import appFun from '../../utils/appFun';
import count from '../../utils/count';
export default class MyInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }
  componentDidMount() {
    ajax.get(`/fifa/invitation`).then(res => {
      this.setState({
        userInfo: res,
      });
    });
  }
  render() {
    const { userInfo } = this.state;
    return (
      <section className="myInvite">
        <section className="myInvite-body">
          <p className="myInvite-total">
            •&nbsp;&nbsp;总共参与 {userInfo.participationNum || 0} 人，共发放{' '}
            {userInfo.totalReward || 0} 元奖励&nbsp;&nbsp;•
          </p>
          <ul>
            <li className="myInvite-process">
              <p>发起邀请</p>
              <p>好友注册</p>
              <p>获得奖励</p>
            </li>
            <li className="myInvite-item">
              <p>我的奖励</p>
              <p
                onClick={() => {
                  appFun('jumpToMyCard');
                }}
              >
                <strong>{userInfo.reward || 0}</strong>元
              </p>
            </li>
            <li className="myInvite-item">
              <p>已邀请人数</p>
              <p>
                <strong>{userInfo.invitationNum || 0}</strong>人
              </p>
            </li>
          </ul>
          <button
            type="button"
            className="myInvite-goInvite"
            onClick={() => {
              count('zzw_yqh5_ljyq');
              appFun('share', { pageUrl: 'main' });
            }}
          >
            立即邀请
          </button>
        </section>
        <footer>
          <Link
            to="/palyRule"
            onClick={() => {
              count('zzw_yqh5_yqxz');
            }}
          >
            邀请细则
          </Link>
        </footer>
      </section>
    );
  }
}
