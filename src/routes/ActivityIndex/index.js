import React, { Component } from 'react';
import { Link } from 'dva/router';
import './activityIndex.less';
import { IndexBtn, CountryPK } from '../../components';
import { withRouter } from 'dva/router';
import _store from '../../index';
// import { searchObj } from '../../utils/config';
import ajax from '../../utils/ajax';
import appFun from '../../utils/appFun';
import count from '../../utils/count';
@withRouter
export default class ActivityIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationNum: '0', //邀请人数
      rank: '0', //排名
      score: '0', //积分
      endTime: '0',
      teamA: { name: '暂无数据', photo: require(`../../assets/images/countryDefault.png`) },
      teamB: { name: '暂无数据', photo: require(`../../assets/images/countryDefault.png`) },
    };
  }

  componentDidMount() {
    const {
      location: { search },
    } = this.props;
    if (search.indexOf('mobile') > -1) {
      const mobile = search.split('mobile=')[1].split('&')[0];
      const { dispatch } = _store;
      // console.log(mobile);
      dispatch({
        type: 'urlInfo/save',
        payload: { mobile: mobile },
      });
    }
    this.fifaIndex();
  }

  // 01.活动index
  fifaIndex = () => {
    // const { mobile = '15902780207' } = searchObj;
    ajax({
      method: 'get',
      url: '/fifa/index',
      params: {
        // mobile
      },
    }).then(data => {
      const { invitationNum, rank, score, endTime, teamA, teamB, guessStatus } = data;
      this.setState({
        invitationNum,
        rank,
        score,
        endTime,
        teamA,
        teamB,
        guessStatus,
      });
    });
  };

  render() {
    const { invitationNum, rank, score, endTime, teamA, teamB, guessStatus } = this.state;
    return (
      <section className="activityIndex">
        <p className="rule">
          <Link
            to="/actDetail"
            onClick={() => {
              count('zzw_sjb_sy_hdxz');
            }}
          >
            活动规则<span />
          </Link>
        </p>
        <img className="banner-img" src={require('../../assets/images/footballman.png')} alt="" />
        <ul className="banner-ul">
          <li className="li-1">
            <span>
              <i>{score}</i>分
            </span>
            <p>我的积分</p>
            <Link
              to="/score"
              onClick={() => {
                count('zzw_sjb_sy_wdjf_mx');
              }}
            />
          </li>
          <li className="li-2">
            <span>
              <i>{invitationNum}</i>人
            </span>
            <p>我的邀请</p>
            <Link
              to="/myInvite"
              onClick={() => {
                count('zzw_sjb_sy_wdyq');
              }}
            />
          </li>
          <li className="li-3">
            <span>
              <i>{rank}</i>名
            </span>
            <p>我的排名</p>
            <Link
              to="/rank"
              onClick={() => {
                count('zzw_sjb_sy_wdpm');
              }}
            />
          </li>
        </ul>
        {/* <NoticeScroll /> */}
        <IndexBtn
          children="查看竞猜排名结果"
          className="check-end"
          onClick={() => {
            count('zzw_sjb_sy_ckpm');
            this.props.history.push('/endRank');
          }}
        />
        <section className="activityIndex-main">
          <div className="title-1">
            <header className="span-img" />
            {/* <p className="title-1-p1">
              <span>竞猜赚积分，积分排名最高</span>
              <span className="span-img img-iphone" />
            </p>
            <p className="title-1-p2">
              <span>还有</span>
              <span className="span-img img-beast" />
              <span>等你领取</span>
            </p> */}
            <CountryPK
              fightInfo={{ endTime, teamA, teamB }}
              onClick={() => {
                count('zzw_sjb_sy_jc');
                if (
                  guessStatus &&
                  guessStatus[0] === '3' &&
                  guessStatus[1] === '3' &&
                  guessStatus[2] === '2'
                ) {
                  this.props.history.push('/bet/eliminate');
                } else {
                  this.props.history.push('/bet');
                }
              }}
            />
          </div>
          <div className="title-2">
            <header />
            <img className="img-people" src={require('../../assets/images/people.png')} alt="" />
            <article>
              <p>
                <span className="invitation">邀友注册即送</span>
                <span className="span-img img-30" />
              </p>
              <p className="mgt4">奖励无上限</p>
              <p className="mgt4">邀请好友人数最高还可获得</p>
              <span className="span-img img-6" />
            </article>
            <IndexBtn
              children="立即邀请"
              onClick={() => {
                count('zzw_sjb_sy_yq');
                this.props.history.push('/myInvite');
              }}
            />
            <div className="share">
              <p
                className="go-endrank"
                onClick={() => {
                  count('zzw_sjb_sy_jcpmjg');
                }}
              >
                <Link to="/endRank">
                  <em className="iconfont icon-paixing" />
                  <span>竞猜排行结果</span>
                </Link>
              </p>
              <p
                onClick={() => {
                  count('zzw_sjb_sy_fx');
                  appFun('share', { pageUrl: 'shareIndex' });
                }}
              >
                <em className="iconfont icon-fenxiang1" />
                <span>分享</span>
              </p>
              <p
                onClick={() => {
                  count('zzw_sjb_sy_phb');
                }}
              >
                <Link to="/rank">
                  <em className="iconfont icon-paihangbang" />
                  <span>排行榜</span>
                </Link>
              </p>
            </div>
          </div>
          <div className="title-3">
            <header />
            <article>
              <p className="mgt5">借款审核通过</p>
              <p className="mgt5">
                <span className="highest">最高可得</span>
                <span className="span-img img-20000" />
              </p>
              <p className="mgt10">借款金额排名最高</p>
              <p>还有惊喜大奖等着您</p>
            </article>
            <img className="img-box" src={require('../../assets/images/box.png')} alt="" />
            <IndexBtn
              children="立即借款"
              onClick={() => {
                count('zzw_sjb_sy_sq');
                appFun('jumpToLoan');
              }}
            />
          </div>
        </section>
      </section>
    );
  }
}
