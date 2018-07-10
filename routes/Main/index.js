import React, { Component } from 'react';
import qs from 'qs';

import './main.less';
export default class Main extends Component {
  // constructor(props, context) {
  //     super(props, context)
  // }
  toLogin = () => {
    // console.log()
    // alert(1);
    const { history } = this.props;
    // console.log(this.props.match.params)
    // let obj = qs.parse(location.hash.split('?')[1]) || {};
    let obj = qs.parse(window.location.search.slice(1)) || {};
    // console.log(obj);
    let { invitePhone, shareChannel } = obj;
    //invitePhone 邀请手机号  shareChannel //分享渠道 后台配置
    history.push(`/extensionInner/${invitePhone}/${shareChannel}`);
  };

  tpCount(event) {
    // console.log(this);
    // console.log(event.target.id);
    try {
      window.MtaH5.clickStat(event.target.id);
    } catch (error) {
      console.log(error);
    }
    try {
      window._hmt.push(['_trackEvent', '', event.target.id, 'click']);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // const {loginshowFlag} = this.state;
    // console.log(loginshowFlag);
    return (
      <div className="main">
        <section className="main-imgBox">
          <img src={require('../../assets/images/bg1.png')} alt="" />
          <div
            id="share_btn"
            className="clickArea"
            onClick={event => {
              this.toLogin();
              this.tpCount(event);
            }}
          />
        </section>
        <section className="main-ruleBox">
          <div className="rules">
            <h1>活动规则</h1>
            <p className="color-333">
              1.用户通过“周转王”APP“我的—邀请有礼”按钮将链接分享给好友,好友通过分享的链接在“周转王”成功注册,邀请人即可获38元抵用券；
            </p>
            <p className="color-333">
              2.用户每成功邀请一位好友，即可获一张38元抵用券，多邀请多得（重复邀请同一好友只计一次）；
            </p>
            <p className="color-333">
              3.被邀请人通过好友分享的邀请链接在“周转王”成功注册，可获得一张28元抵用券；
            </p>
            <div className="description">
              <label>注：</label>
              <div className="content ">
                <p>(1）活动涉及所有抵用券需在有效期内使用,逾期作废。</p>
                <p>(2）活动期间发现严重违规及作弊行为，本平台有权取消其奖励。</p>
                <p>(3）本平台拥有在法律允许的范围内本活动的最终解释权。</p>
                <p>(4) 抵用券可在“我的—我的卡券”内查看，用户申请借款即可使用本活动所赠抵用券。</p>
              </div>
            </div>
          </div>
          <img src={require('../../assets/images/redpacket.png')} alt="" className="redPacket" />
          <img src={require('../../assets/images/bg2.png')} alt="" className="smallBg" />
        </section>
        <section className="main-footer">
          <p>北京榆钱投资管理有限公司</p>
          <p>拿钱热线400-0015-287</p>
        </section>
      </div>
    );
  }
}
