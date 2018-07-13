import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

@connect(state => ({ showLogin: state.showLogin }))
@withRouter
export default class LoginSuccessHint extends Component {
  iosDownload = () => {
    // console.log(this.props);
    const { history } = this.props;
    // console.log(history);
    history.push('/downloadStep');
  };
  androidDownload = () => {
    window.location.href = `http://a.app.qq.com/o/simple.jsp?pkgname=com.yuqian.zhouzhuanwang&v=${Date.now()}`;
  };

  tpCount(event) {
    // event.preventDafault();
    // const { channel } = this.props;
    // console.log(event.target);
    // console.log(event.target.id, channel);

    try {
      window.MtaH5.clickStat(event.target.id);
    } catch (error) {
      // console.log(error)
    }
    try {
      window._hmt.push(['_trackEvent', '', event.target.id, 'click']);
    } catch (error) {
      // console.log(error)
    }
  }

  render() {
    const { showLogin, word1, word2 } = this.props;
    // console.log(this.props);
    return (
      <section className="commonhint" style={{ display: showLogin }}>
        <img
          className="loginsuccess-img"
          src={require('../../assets/images/20000yuan.png')}
          alt=""
        />
        <section className="loginsuccess-content">
          <p>{word1}</p>
          <p>{word2}</p>
          <button
            className="buttonandroid "
            id="extensionInner_androidDownload"
            onClick={event => {
              this.androidDownload();
              this.tpCount.bind(this)(event);
            }}
          >
            下载安卓客户端
          </button>
          <button
            className="buttonios "
            id="extensionInner_iosDownloadStep1"
            onClick={event => {
              this.iosDownload();
              this.tpCount.bind(this)(event);
            }}
          >
            下载IOS客户端
          </button>
        </section>
      </section>
    );
  }
}
