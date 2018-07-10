import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import './noticeScroll.less';
import ajax from '../../utils/ajax';
import { searchObj } from '../../utils/config';
import { connect } from 'dva';
@connect(({ urlInfo }) => ({ urlInfo }))
export default class NoticeScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPeople: '0', //参与人数
      totalScore: '0', //奖励总积分
      totalReward: '0', //奖励优惠券张数
    };
  }

  componentDidMount() {
    this.fifaShare();
  }

  // 02.分享
  fifaShare = () => {
    let url =
      searchObj.mobile || this.props.urlInfo.mobile
        ? `/fifa/share`
        : `/fifa/share?mobile=${searchObj.invitePhone}`;
    ajax.get(url).then(data => {
      this.setState({
        ...data,
      });
    });
  };

  render() {
    const { totalPeople, totalScore, totalReward } = this.state;
    return (
      <div className="notice">
        <em className="iconfont icon-koushao" />
        <div className="notice-wrapper">
          <i>活动快报：</i>
          <Carousel
            className="notice-scroll"
            vertical
            dots={false}
            dragging={false}
            swiping={false}
            autoplay
            infinite
          >
            <span>累计活动参与人数 {totalPeople} 人</span>
            <span>累计活动奖励总积分 {totalScore} 分</span>
            <span>累计活动奖励优惠券 {totalReward} 张</span>
          </Carousel>
        </div>
      </div>
    );
  }
}
