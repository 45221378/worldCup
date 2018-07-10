import React, { Component } from 'react';
import { withRouter } from 'dva/router';
import { Button } from 'antd-mobile';
import { searchObj } from '../../utils/config';
import ajax from '../../utils/ajax';

import './score.less';

let scrollY = 0,
  timer = null;
@withRouter
export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingScore: 0,
      scoreList: null,
      currentPage: 0,
      totalPage: 1,
      loading: false,
    };
  }
  //获取头部信息展示
  getHeader = () => {
    const { remainingScore } = this.state;
    return (
      <header className="score-header">
        <p>
          <span>{remainingScore}</span>
          <i>当前积分</i>
        </p>
      </header>
    );
  };
  //获取排行
  getList = () => {
    let { scoreList, currentPage, totalPage } = this.state;
    return (
      <div className="score-content" onScroll={this.scroll}>
        {scoreList && (
          <div>
            {scoreList.length > 0 ? (
              <ul className="score-content-main-list">
                {scoreList.map((ele, index) => {
                  return (
                    <li key={index} className="score-content-main-item">
                      <content>
                        <span>{ele.matchType}</span>
                        <i>{ele.createTime}</i>
                      </content>
                      <footer className={ele.score >= 0 ? 'score-add' : 'score-reduce'}>
                        {ele.score > 0 ? `+${ele.score}` : ele.score}
                      </footer>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="score-none">
                <img src={require('../../assets/images/score-none.png')} alt="" />
                <p>您当前还没有积分明细记录</p>
                <Button
                  className="btn-yellow"
                  onClick={() => {
                    this.props.history.push('/bet');
                  }}
                >
                  参与竞猜获得积分
                </Button>
              </div>
            )}
            {currentPage * 1 === totalPage * 1 &&
              scoreList &&
              scoreList.length > 0 && <p className="score-hasnone">已经是最后一页了哦</p>}
          </div>
        )}
      </div>
    );
  };

  //滚动触发事件
  scroll = e => {
    const $h = e.target.clientHeight;
    const $scrollH = e.target.scrollHeight;
    const $scroll = e.target.scrollTop;
    if ($scrollH - $scroll - $h < 10 && $scroll > scrollY) {
      this.getScoreData();
    }
    timer = setTimeout(() => {
      scrollY = $scroll;
    }, 0);
  };

  // 获取积分明细数据
  getScoreData = () => {
    let { currentPage, totalPage, scoreList, loading } = this.state;
    scoreList = scoreList ? scoreList : [];
    const { mobile = '15902780207' } = searchObj;
    if (currentPage * 1 + 1 <= totalPage && !loading) {
      this.setState({
        loading: true,
      });
      ajax({
        method: 'get',
        url: '/fifa/score/record',
        params: {
          mobile,
          currentPage: currentPage * 1 + 1,
        },
      })
        .then(data => {
          const { reaminingScore = 500, records = [], currentPage = 0, totalPage = 0 } = data;
          scoreList = scoreList.concat(records);
          this.setState({
            remainingScore: reaminingScore,
            scoreList,
            currentPage,
            totalPage,
          });
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getScoreData();
  }
  componentWillUnmount = () => {
    clearInterval(timer);
  };

  render() {
    return (
      <section className="score">
        {this.getHeader()}
        {this.getList()}
      </section>
    );
  }
}
