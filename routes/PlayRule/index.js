import React, { Component } from 'react';
import '../../assets/styles/usecontract.less';

export default class PlayRule extends Component {
  render() {
    return (
      <div className="playRule">
        <div className="contract playRule-box ">
          <p className="marginB-40">
            1.用户通过“周转王”APP“我的—邀请有礼”按钮将链接分享给好友,好友通过分享的链接在“周转王”成功注册,邀请人即可获38元抵用券；
          </p>
          <p className="marginB-40">
            2.用户每成功邀请一位好友，即可获一张38元抵用券，多邀请多得（重复邀请同一好友只计一次）；
          </p>
          <p className="marginB-40">
            3.被邀请人通过好友分享的邀请链接在“周转王”成功注册，可获得一张28元抵用券；
          </p>
          <p>注：</p>
          <p className="color-666">(1）活动涉及所有抵用券需在有效期内使用,逾期作废。</p>
          <p className="color-666">(2）活动期间发现严重违规及作弊行为，本平台有权取消其奖励。</p>
          <p className="color-666">(3）本平台拥有在法律允许的范围内本活动的最终解释权。</p>
          <p className="color-666">
            (4) 抵用券可在“我的—我的卡券”内查看，用户申请借款即可使用本活动所赠抵用券。
          </p>
        </div>
      </div>
    );
  }
}
