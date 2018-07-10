import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

@connect(state => ({ showLogin: state.showLogin }))
@withRouter
export default class LoginSuccessHint extends Component {
  // constructor(props, context) {
  //     super(props, context);
  // }

  //判断是否是微信浏览器；
  // isWeixin = () => {
  //     let ua = navigator.userAgent.toLowerCase();
  //     if (ua.match(/MicroMessenger/i) == "micromessenger") {
  //         return true;
  //     } else {
  //         return false;
  //     }
  // };

  iosDownload = () => {
    const { history } = this.props;

    history.push('/downloadStep');
  };
  androidDownload = () => {
    // alert('这里是安卓下载地址');
    // Cue.msg('暂无下载地址，敬请期待！')

    window.location.href = 'http://cdn.hfenq.cn/apk/zzwxz.apk';

    //创建一个隐藏的iframe
    // let ifr = document.createElement('iframe');
    // ifr.src = 'zzw://';
    // ifr.style.display = 'none';
    // document.body.appendChild(ifr);
    // //记录唤醒时间
    // let openDate = new Date();
    // let openTime = openDate.getTime();
    // setTimeout(function () {
    //     document.body.removeChild(ifr);
    //     //如果setTimeout 回调超过2500ms，则弹出下载
    //     let endDate = new Date();
    //     let endTime = endDate.getTime();
    //     alert(endTime,openTime);
    //     if (endTime - openTime > 2500) {
    //         alert('aaa');
    //         window.location.href = 'http://cashsrv.oss-cn-beijing.aliyuncs.com/apk/zzw.apk';
    //     }
    // }, 2000)
  };

  // openApp = (src) => {
  //     // alert(3)
  //     // let ifr = document.createElement('iframe');
  //     // ifr.src = src;
  //     // ifr.style.display = 'none';
  //     // document.body.appendChild(ifr);
  //     // location.href = src;   //兼容Safari打不开app的情况
  //     try {
  //         // alert(4);
  //         location.href = src;
  //     } catch (error) {
  //         // alert(5);
  //         window.location.href = "http://oss.hfenq.cn/apk/zzw.apk";
  //     }
  //     // window.setTimeout(function () {
  //     //     document.body.removeChild(ifr);
  //     // }, 1000);
  // };
  tpCount(event) {
    // event.preventDafault();
    const { channel } = this.props;

    try {
      window.MtaH5.clickStat(event.target.id, { promo: channel });
    } catch (error) {
      console.log(error);
    }
    try {
      window._hmt.push(['_trackEvent', channel, event.target.id, 'click']);
    } catch (error) {
      console.log(error);
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
            id="extension_androidDownload"
            onClick={event => {
              this.androidDownload();
              this.tpCount.bind(this)(event);
            }}
          >
            下载安卓客户端
          </button>
          <button
            className="buttonios "
            id="extension_iosDownloadStep1"
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
